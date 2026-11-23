/* =========================================================
   sof.me — interacciones
   1. Cursor espada (sólo con mouse; en celular no)
   2. Arte braille que se transforma al pasar el mouse / tocar
   3. Franjas animadas al pie de cada página
   4. Placeholders para imágenes/videos que falten
   ========================================================= */

(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- 0. SIN VIUDAS NI HUÉRFANAS ---------- */
  // La última palabra de cada párrafo va unida a la anterior con un espacio que no se corta,
  // así nunca queda una palabra sola en la última línea (en ninguna pantalla).
  document.querySelectorAll("p, figcaption").forEach((el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let last = null, n;
    while ((n = walker.nextNode())) if (n.data.trim()) last = n;
    if (!last) return;
    const t = last.data.replace(/\s+$/, "");
    const i = t.lastIndexOf(" ");
    if (i > 0 && t.length - i < 22) last.data = t.slice(0, i) + "\u00A0" + t.slice(i + 1);
  });

  /* ---------- 1. CURSOR ESPADA ---------- */
  // Inspirada en el cursor de Radelica: una imagen que gira según la dirección del
  // movimiento, con peso. Encima: brillo metálico en los links y estela braille.
  const sword = document.querySelector(".sword");

  if (sword && finePointer) {
    document.documentElement.classList.add("has-sword");

    // hoja = imagen + brillo
    const img = sword.querySelector("img");
    const blade = document.createElement("div");
    blade.className = "sword__blade";
    const shine = img.cloneNode();
    shine.className = "sword__shine";
    shine.setAttribute("aria-hidden", "true");
    img.replaceWith(blade);
    blade.append(img, shine);

    const BASE = 135;                  // punta arriba-izquierda, empuñadura abajo-derecha
    const TRAIL = "⠁⠂⠄⡀⠈⠐⠠⢀";
    let mx = -100, my = -100;          // mouse
    let x = mx, y = my;                // espada (va un poquito detrás: tiene peso)
    let tilt = 0, tiltVel = 0, swing = 0, scale = 1;
    let hovering = false, lastTrail = 0, trailCount = 0;

    window.addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY;
      sword.style.opacity = "";
      const now = performance.now();
      const speed = Math.hypot(e.movementX, e.movementY);
      if (!reduceMotion && speed > 6 && now - lastTrail > 38 && trailCount < 16) {
        lastTrail = now;
        const t = document.createElement("span");
        t.className = "sword-trail";
        t.textContent = TRAIL[(Math.random() * TRAIL.length) | 0];
        t.style.left = mx + (Math.random() * 8 - 4) + "px";
        t.style.top = my + (Math.random() * 8 - 4) + "px";
        document.body.appendChild(t);
        trailCount++;
        t.addEventListener("animationend", () => { t.remove(); trailCount--; });
      }
    });
    document.addEventListener("pointerleave", () => { sword.style.opacity = "0"; });
    document.addEventListener("pointerover", (e) => {
      hovering = !!e.target.closest("a, button, .braille");
      sword.classList.toggle("is-hover", hovering);
    });
    window.addEventListener("pointerdown", (e) => {
      swing = -60;                                   // ¡tajo!
      if (!reduceMotion) sparkle(e.clientX, e.clientY, 7);
    });

    let lastX = x;
    const tick = () => {
      // la espada sigue al mouse con un leve arrastre (la punta llega casi exacta)
      x += (mx - x) * 0.55;
      y += (my - y) * 0.55;
      const dx = x - lastX; lastX = x;
      // se inclina hacia donde vas, como un péndulo con resorte
      const target = Math.max(-38, Math.min(38, dx * 1.8)) + (hovering ? -14 : 0);
      tiltVel += (target - tilt) * 0.1;
      tiltVel *= 0.8;
      tilt += tiltVel;
      swing *= 0.84;
      scale += ((hovering ? 1.18 : 1) - scale) * 0.2;
      sword.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      blade.style.transform = `rotate(${BASE + tilt + swing}deg) scale(${scale})`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // estrellitas tipo ascii (como la ⭒ de "sof.me ⭒ concepto visual")
  const GLYPHS = ["⭒", "⭒", "⭒", "⭑", "✧", "⋆", "˚", "⊹"];
  function sparkle(px, py, count) {
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "sparkle";
      s.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      const ang = Math.random() * Math.PI * 2;
      const dist = 20 + Math.random() * (count > 1 ? 50 : 18);
      s.style.left = px + "px";
      s.style.top = py + "px";
      s.style.fontSize = 12 + Math.random() * 12 + "px";
      s.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      s.style.setProperty("--dy", Math.sin(ang) * dist + "px");
      s.style.setProperty("--rot", (Math.random() * 360 - 180) + "deg");
      document.body.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    }
  }

  /* ---------- 2. ARTE BRAILLE ---------- */
  // Dibujo inicial (A) y en lo que se convierte (B)
  const ART_A = [
    "⠀⠀⢸⡿⢦⣄⠀⢀⣠⣴⣶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠘⣷⠀⠉⠛⠛⠉⢰⡇⠀⠀⠘⣷⣦⣾⡇⠀⠀⠀⠀⠀⠀⠀",
    "⠀⢀⣰⠿⠀⠀⠀⠀⠀⢿⡁⠀⢀⣴⣿⣿⣿⣶⡄⠀⠀⠀⠀⠀⠀",
    "⣴⣿⣁⡀⠀⠀⠀⠀⠀⠀⠻⣦⡀⠀⠀⢿⠃⠀⢀⣤⡀⠀⠀⠀⠀",
    "⠀⠈⠉⠛⣿⡀⠀⣰⠟⠛⠛⠛⠛⠀⠀⠀⠀⣠⡾⢻⡇⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠈⣷⣼⠏⠀⠀⠀⢻⣟⠻⠿⢶⡾⠋⠀⢸⡇⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠘⠃⠀⣴⠀⠀⠈⢻⣆⠀⠀⠀⠀⠀⠀⠻⢶⣤⣀⠀",
    "⠀⠀⠀⠀⠀⠘⢷⣾⣿⣤⣄⠀⢈⣿⠀⠀⠀⠀⠀⠀⠀⢀⣉⣿⠿",
    "⠀⠀⠀⠀⠀⢀⣾⠿⣿⡏⠉⢠⣾⠃⠀⠀⠀⠀⠀⢀⣾⠛⠋⠁⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠙⠃⠀⣿⡷⠿⠟⠛⢿⣦⡀⢸⡇⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⠃⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀",
  ];
  const ART_B = [
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⢀⡤⠒⠢⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶⣀⡤⠀⠀⠀⠀",
    "⠀⢀⠏⠀⠀⠀⢀⡇⠀⠀⠀⠀⠠⠀⠀⠀⠀⠉⠙⡇⠀⠀⠀⠀⠀",
    "⠀⠸⡀⠀⠀⠒⠁⠀⠀⠀⠀⣠⢯⠄⠀⠀⠀⠀⠀⠀⠨⠀⠀⠀⠀",
    "⠀⠀⢣⡀⠀⠀⠀⠀⠀⠄⡜⢽⣿⣾⡵⠤⠆⠐⢀⠀⠈⡆⠀⠀⠀",
    "⠀⠀⠀⠀⠑⠒⠒⠒⠀⠀⠀⠀⢯⠆⠀⠀⠀⠀⠀⠀⠀⡃⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⢀⠀⢂⠀⡜⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣢⠶⣟⠓⠦⠂⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠀⣀⡴⠒⠘⠉⠉⠁⠀⠀⠀⠀⠇⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⡎⠀⢠⠖⠤⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠸⡄⠀⠈⠣⠂⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
    "⠀⠀⠀⠀⠀⠀⠈⠒⠢⠤⠤⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  ];
  const toGrid = (rows) => rows.map((r) => [...r]);
  const GRID_A = toGrid(ART_A), GRID_B = toGrid(ART_B);
  const NOISE = "⠁⠂⠄⠈⠐⠠⡀⢀⠃⠅⠘⠰⡄⢠⠿⣿⣤⠶";

  document.querySelectorAll(".braille").forEach((el) => {
    let current = GRID_A.map((r) => r.slice());
    let showingB = false;
    let raf = 0;
    const render = () => { el.textContent = current.map((r) => r.join("")).join("\n"); };
    render();

    // transformación "chispeante": cada caracter cambia en un momento aleatorio
    const morphTo = (target) => {
      cancelAnimationFrame(raf);
      if (reduceMotion) { current = target.map((r) => r.slice()); render(); return; }
      const start = performance.now();
      const DUR = 650;
      const delays = target.map((r) => r.map(() => Math.random() * DUR * 0.7));
      const step = (now) => {
        const t = now - start;
        let done = true;
        target.forEach((row, i) => row.forEach((ch, j) => {
          if (t >= delays[i][j] + 120) current[i][j] = ch;
          else if (t >= delays[i][j]) { current[i][j] = NOISE[(Math.random() * NOISE.length) | 0]; done = false; }
          else done = false;
        }));
        render();
        if (!done) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const show = (b) => { if (b === showingB) return; showingB = b; morphTo(b ? GRID_B : GRID_A); };
    if (finePointer) {
      el.addEventListener("pointerenter", () => show(true));
      el.addEventListener("pointerleave", () => show(false));
    } else {
      el.addEventListener("click", () => show(!showingB));   // en celular: tocar
    }
  });

  /* ---------- 2b. BOTÓN VOLVER (estrella braille) ---------- */
  // Al pasar el mouse la estrella se deshace en puntitos sueltos y se vuelve a armar.
  const LOOSE = "⠁⠂⠄⠈⠐⠠⡀⢀⠃⠘⠆⠰";
  document.querySelectorAll(".back-star").forEach((btn) => {
    const art = btn.querySelector(".back-star__art");
    const grid = art.textContent.split("\n").map((r) => [...r]);
    let raf = 0;
    const render = (g) => { art.textContent = g.map((r) => r.join("")).join("\n"); };

    const dissolve = (leaving = false) => {
      if (reduceMotion) return;
      cancelAnimationFrame(raf);
      const start = performance.now();
      const DUR = leaving ? 320 : 700;
      // cada caracter con tinta se desarma y se rearma en su propio momento
      const timing = grid.map((r) => r.map((ch) => ch === "⠀" ? null :
        { off: Math.random() * DUR * 0.35, back: DUR * 0.45 + Math.random() * DUR * 0.5 }));
      const step = (now) => {
        const t = now - start;
        let done = true;
        const frame = grid.map((r, i) => r.map((ch, j) => {
          const tm = timing[i][j];
          if (!tm) return ch;
          if (t < tm.off) { done = false; return ch; }
          if (leaving || t < tm.back) {
            done = leaving ? t >= DUR && done : false;
            return Math.random() < (leaving ? 0.35 : 0.5) ? "⠀" : LOOSE[(Math.random() * LOOSE.length) | 0];
          }
          return ch;
        }));
        render(frame);
        if (!done && t < DUR + 200) raf = requestAnimationFrame(step);
        else if (!leaving) render(grid);
      };
      raf = requestAnimationFrame(step);
    };
    btn.addEventListener("pointerenter", () => dissolve());
    btn.addEventListener("focus", () => dissolve());

    // click: la estrella se deshace del todo, suelta estrellitas y vuelve atrás
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const r = art.getBoundingClientRect();
      if (!reduceMotion) sparkle(r.left + r.width / 2, r.top + r.height / 2, 8);
      btn.classList.add("is-leaving");
      dissolve(true);
      const sameSite = document.referrer && new URL(document.referrer, location.href).origin === location.origin;
      setTimeout(() => {
        const go = () => {
          if (sameSite && history.length > 1) history.back();
          else location.href = btn.getAttribute("href");
        };
        if (window.__sofmeLeave) window.__sofmeLeave(go); else go();
      }, reduceMotion ? 0 : 200);
    });
    // al volver con el botón "atrás" del navegador, la estrella aparece entera
    window.addEventListener("pageshow", () => { btn.classList.remove("is-leaving"); render(grid); });
  });

  /* ---------- 3. FRANJAS ANIMADAS ---------- */
  document.querySelectorAll(".marquee__track").forEach((track) => {
    const text = track.dataset.text || "";
    // dos mitades iguales para que el loop sea continuo
    const half = Array.from({ length: 10 }, () => `<span>${text}</span>`).join("");
    track.innerHTML = half + half;
  });
  // velocidad constante en px por segundo (como sadti.xyz, ~60 px/s),
  // así no "acelera" en pantallas anchas ni con textos más largos
  const MARQUEE_SPEED = 60;
  const setMarqueeSpeed = () => {
    document.querySelectorAll(".marquee__track").forEach((track) => {
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) track.style.animationDuration = (halfWidth / MARQUEE_SPEED).toFixed(2) + "s";
    });
  };
  setMarqueeSpeed();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setMarqueeSpeed);
  let mt;
  window.addEventListener("resize", () => { clearTimeout(mt); mt = setTimeout(setMarqueeSpeed, 200); });

  /* ---------- 4. PLACEHOLDERS ---------- */
  document.querySelectorAll("figure img, figure video").forEach((media) => {
    const fig = media.closest("figure");
    const mark = () => fig.classList.add("is-missing");
    if (media.tagName === "IMG") {
      if (media.complete && media.naturalWidth === 0) mark();
      else media.addEventListener("error", mark);
    } else {
      // con <source>: si fallan todas, el error llega en la última
      const sources = media.querySelectorAll("source");
      const last = sources[sources.length - 1];
      (last || media).addEventListener("error", mark);
      media.addEventListener("loadeddata", () => fig.classList.remove("is-missing"));
    }
  });

  // vistas previas de la portada: si todavía no exportas la imagen del UI kit,
  // usa una imagen parecida del proyecto
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    const useFallback = () => { if (img.src.indexOf(img.dataset.fallback) === -1) img.src = img.dataset.fallback; };
    if (img.complete && img.naturalWidth === 0) useFallback();
    else img.addEventListener("error", useFallback, { once: true });
  });

  /* ---------- 5. PORTADAS QUE REBOTAN (between ends) ---------- */
  // Misma idea que en tu sitio: cada portada rebota en los bordes como el logo del DVD.
  const coverBox = document.querySelector(".be__covers");
  if (coverBox) {
    const covers = [...coverBox.querySelectorAll("img")];
    let items = [];
    const place = () => {
      const W = coverBox.clientWidth, H = coverBox.clientHeight;
      items = covers.map((el) => {
        const s = el.offsetWidth || 54;
        const ang = Math.random() * Math.PI * 2;
        const speed = 18 + Math.random() * 22;              // px por segundo: lento, tranquilo
        return { el, s, x: Math.random() * (W - s), y: Math.random() * (H - s),
                 vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed };
      });
      items.forEach((it) => { it.el.style.transform = `translate(${it.x}px, ${it.y}px)`; });
    };
    place();

    if (!reduceMotion) {
      let visible = false, last = 0, raf = 0;
      const tick = (now) => {
        const dt = Math.min(0.05, (now - last) / 1000 || 0);
        last = now;
        const W = coverBox.clientWidth, H = coverBox.clientHeight;
        items.forEach((it) => {
          it.x += it.vx * dt;
          it.y += it.vy * dt;
          if (it.x <= 0 || it.x + it.s >= W) { it.vx *= -1; it.x = Math.max(0, Math.min(it.x, W - it.s)); }
          if (it.y <= 0 || it.y + it.s >= H) { it.vy *= -1; it.y = Math.max(0, Math.min(it.y, H - it.s)); }
          it.el.style.transform = `translate(${it.x}px, ${it.y}px)`;
        });
        if (visible) raf = requestAnimationFrame(tick);
      };
      // sólo se anima mientras está en pantalla
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) { last = performance.now(); raf = requestAnimationFrame(tick); }
      }).observe(coverBox);
    }
    // si cambia el tamaño de la ventana, se reparten de nuevo
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(place, 200); });
  }

  /* ---------- 6. TRANSICIÓN BRAILLE ENTRE PÁGINAS ---------- */
  // Al ir a otra página la pantalla se llena de puntitos braille; al llegar, se deshacen.
  const DOTS = "⠁⠂⠄⡀⠈⠐⠠⢀⠃⠘⠆⠰⠉⠒⠤⣀⠿⣿";
  const veil = document.createElement("pre");
  veil.className = "braille-veil";
  veil.setAttribute("aria-hidden", "true");
  document.body.appendChild(veil);

  const runVeil = (mode, dur, done) => {
    const cols = Math.ceil(innerWidth / 9) + 1, rows = Math.ceil(innerHeight / 15) + 1;
    const when = Float32Array.from({ length: cols * rows }, () => Math.random());
    veil.classList.add("is-on");
    const start = performance.now();
    const frame = (now) => {
      const p = Math.min(1, (now - start) / dur);
      let out = "";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const k = when[r * cols + c];
          const shown = mode === "in" ? k < p : k >= p;
          out += shown ? DOTS[((k * 997 + r + c) | 0) % DOTS.length] : "⠀";
        }
        out += "\n";
      }
      veil.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
      else { if (mode === "out") veil.classList.remove("is-on"); if (done) done(); }
    };
    requestAnimationFrame(frame);
  };

  const KEY = "sofme-veil";
  let fromVeil = false;
  try { fromVeil = sessionStorage.getItem(KEY) === "1"; sessionStorage.removeItem(KEY); } catch (e) {}
  if (fromVeil && !reduceMotion) runVeil("out", 520);

  const leaveTo = (go) => {
    if (reduceMotion) return go();
    try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
    runVeil("in", 340, go);
    setTimeout(() => veil.classList.remove("is-on"), 2500);   // por si la página no cambia
  };
  window.__sofmeLeave = leaveTo;   // lo usa el botón volver

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === "_blank") return;
    const href = a.getAttribute("href");
    if (!/\.html(\?|#|$)/.test(href) || /^[a-z]+:/i.test(href)) return;   // sólo páginas de este sitio
    e.preventDefault();
    leaveTo(() => { location.href = href; });
  });
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) { veil.classList.remove("is-on"); try { sessionStorage.removeItem(KEY); } catch (err) {} }
  });
})();
