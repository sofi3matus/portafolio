# Bitácora / Portafolio — sof.me

**Sofíe Matus**

> Este README lo ordenó **Claude (IA)** a partir de mi bitácora original: juntó lo que yo había escrito, sacó el código repetido y agregó lo más importante que fui pidiendo durante el proyecto.

Link figma: https://www.figma.com/design/ObKZKYKrlAGHDHDiv9G2FQ/portafolio?node-id=4-5&t=LHoLE5P2Awa4Iusx-1

---

## Sobre el proyecto

Mi proyecto se trata de hacer mi portafolio web, con proyectos que he hecho durante la carrera y también incluyendo (aún no lo tengo bien claro) uno o dos fuera de la universidad.
En el portafolio, fuera de los proyectos, incluyo una breve descripción acerca de mí, de lo que he hecho y lo que me gusta hacer o me llama la atención. La idea es hacerlo muy propio.

## Cómo está armado

Cada sección es una página distinta y desde el inicio te redirige:

```
index.html          ← inicio (lista de proyectos, ascii, hablemos :))
sobre-mi.html
ewu.html
between-ends.html
familiario.html
styles.css          ← estilos de todas las páginas (desktop, tablet y celular)
script.js           ← cursor, ascii, franjas, volver, portadas
img/                ← imágenes (img/covers/ son las portadas de between ends)
fonts/              ← tipografías
assets/             ← la espada del cursor
```

## Tipografías

* **Logo (sof.me) y firma** - Pretty on the inside (poti)
* **Bajadas, subtítulos, textos y ascii** - BlinkMacSystemFont
* **Textos breves y títulos de proyecto** - Jrug Punk
* **Franjas de abajo** (hablemos :), ewu ginger, etc.) - mieszkanie9
* **Botón "ver más" de between ends** - ProggyClean

## Colores

Todo en `#000000`: al 100% en títulos y franjas, y al 50% en los hover del menú, el logo y la lista (como está en mi UI kit).

## Referencias portafolio (posibilidades y el por qué)

* https://sadti.xyz/ — interactividad, jerarquías, la forma en que está dividido cada proyecto, tipografías. De aquí saqué cómo se mueven las franjas de abajo.
* https://gougoucore.com/ — simple pero atractiva, vuelve a estar dividido por proyecto y te redirige hacia aquello. Tipografías y diagramación.
* https://elimarigodesign.com/ — tipo de interactividad, texturas, modo de redirigir.
* https://thefolioarchivo.com/ — tipografía, divisiones.
* https://matthewvla.ch/ — la manera en que está todo diagramado y cómo van apareciendo los trabajos cuando uno aprieta. Tipografía mono, diseño simplista.
* https://www.radelica.com/ — el cursor: una imagen que sigue al mouse y va girando. Lo quise igual pero con mi espada.

---

# Bitácora

## 15 nov 2026

**¿Qué hice en el sitio?**

Armé todo el diseño en figma (desktop, mobile y un UI kit con colores, tipografías y componentes con sus hover). Le pedí al agente que me pasara la página de figma a código html y css.

**¿Qué dificultades tuve y cómo las resolví?**

* El código que me dio el agente no estaba ni un 50% parecido a lo mío, por lo tanto empecé a ocupar Claude.
* Intenté conectarme de figma a VS code con un figma MCP server pero tampoco se pudo.
* Quise cambiar el cursor inspirándome en radelica. Inspeccioné la página y encontré esto: `<div id="radelica-custom-cursor" style="opacity: 0; transform: translate3d(836px, 51px, 0px) rotate(0deg);"></div>`, entonces quise copiar lo mismo pero con un cursor distinto (una espada).
* Recursos: IA (claude) e inspeccionar elemento en el navegador.

**¿Qué aprendí?**

Que si solo mando el link de figma la IA no puede verlo si no tiene acceso, hay que mandarle imágenes, tipografías y textos. Y que inspeccionando otras páginas se puede entender cómo hacen sus efectos.

## 22 nov 2026

**¿Qué hice en el sitio?**

Volví a pasar todo el figma a html, css y js pero ahora con mis tipografías, imágenes y grabaciones de las animaciones, y quedó mucho más parecido. Agregué la espada de cursor, el ascii que se transforma, las franjas que se mueven abajo, los hover del UI kit y el botón de volver. Separé todo en páginas distintas y lo hice responsive con media queries.

**¿Qué dificultades tuve y cómo las resolví?**

* El figma MCP se bloqueó porque llegué al límite del plan gratis, así que exporté las imágenes de cada frame y se las mandé directo.
* El gif de las portadas de between ends pesaba 160 MB. Primero lo pasamos a video pero se veía borroso; al final ocupamos la misma animación de mi página de between ends (las portadas rebotando con js) y quedó mucho más liviano y nítido.
* Había fotos que se pisaban con el botón de volver y palabras huérfanas; se fue revisando en distintos tamaños de pantalla hasta que no quedó nada encima.
* Recursos: IA (claude), inspeccionar elemento, mi figma y mi página de between ends.

**¿Qué aprendí?**

* A poner tipografías propias con `@font-face`.
* A usar media queries para que se vea bien en celular, tablet y computador.
* Que una animación hecha con código pesa mucho menos que un gif o un video.
* Que `text-wrap: pretty` ayuda a que no queden palabras solas al final.
* Que existe `prefers-reduced-motion`, para las personas que prefieren menos movimiento.

## 23 nov 2026

**¿Qué hice en el sitio?**

* Actualicé familiario con lo nuevo de figma: el tablero más grande y abajo dos fotos de cuando lo expusimos. Saqué los escaneos del celular porque se veían muy pobres.
* Arreglé que no quedaran viudas en ningún texto.
* Hice la versión mobile como en mi figma y después la dejé centrada y un poco más grande.
* Dejé el botón de volver fijo en las páginas.

**¿Qué dificultades tuve y cómo las resolví?**

* Quedaba una palabra sola en un texto en celular ("tuve."), se arregló uniendo las dos últimas palabras de cada párrafo con un espacio que no se corta.
* Aparecieron choques en tamaños de tablet chica que no habíamos revisado, así que agregamos una media query solo para ese rango.
* Recursos: IA (claude).

**¿Qué aprendí?**

* Que hay que revisar varios tamaños de pantalla y no solo celular y computador, porque en los del medio igual se rompen cosas.
* Que existe el espacio que no se corta (`&nbsp;`) para que dos palabras siempre queden juntas.
* Que se puede medir todo en px del frame de figma (desktop y mobile) para que se vea igual en cualquier pantalla.

---

# Consultas IA — primera versión

Esta era la versión con flores, proyectos en grilla y todo en una sola página. Dejo solo lo importante de cada consulta para no repetir el archivo entero.

## Consulta IA: crear el html/css/js

**Prompt usado:**
> Puedes pasar esta página a html, css y javascript. soy estudiante de diseño y quiero que me expliques, como también quiero agregar un cursor, dime si te tengo que mandar las imágenes o así está bien.

(esto lo había mandado antes pero no sirvió debido a que había mandado sólo el link de figma y no se pudo dar acceso)

> Agregué las tipografías como también imágenes, una grabación y una captura de pantalla de los componentes, es sólo el home, la primera página.

**Código después:**
```html
<header>
  <h1><a href="#">sof.me</a></h1>
  <nav aria-label="Principal">
    <a href="#proyectos">Proyectos</a>
    <a href="#contacto">Contacto</a>
    <a href="#sobre-mi">Sobre mí</a>
  </nav>
</header>
```
```css
@font-face { font-family: "Blink";      src: url("../fonts/BlinkMacSystemFont.ttf"); }
@font-face { font-family: "JRUG";       src: url("../fonts/JRUG_PUNK.ttf"); }
@font-face { font-family: "Poti";       src: url("../fonts/poti.ttf"); }
@font-face { font-family: "Mieszkanie"; src: url("../fonts/mieszkanie9.otf"); }
```

## Consulta IA: crear cursor

**Prompt usado:**
> Quiero que el cursor sea esta imagen también y que el hablemos vaya rotando y nunca se quite de la pantalla, que esté completo siempre. Podrías mandarme el código de nuevo

**Código después:**
```js
const cursor = document.querySelector('#cursor');

document.addEventListener('mousemove', (evento) => {
  cursor.style.opacity = 1;
  cursor.style.transform = `translate3d(${evento.clientX}px, ${evento.clientY}px, 0)`;
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = 0;
});
```
```css
footer a {
  position: fixed;   /* "hablemos :)" nunca se quita de la pantalla */
  left: 0;
  right: 0;
  bottom: 0.5rem;
}
```

## Consulta IA: correcciones del código (franja y colores)

La IA me explicó que esa animación se llama **marquee** o ticker: una franja con texto repetido que se mueve sin parar. Como el texto está dos veces, al moverse la mitad (`-50%`) vuelve al inicio y no se nota el salto.

**Prompt usado:**
> la tipografía no está bien puesta como también los códigos de color, tienen que estar todos en #000000 pero de un 50%, te volví a mandar la imagen en png de las flores y el hablemos que está con la tipografía mieszkanie9

**Código después:**
```css
:root {
  --color: rgb(0 0 0 / 50%);   /* #000000 al 50% */
  --negro: #000;
}

footer a { font-family: "Mieszkanie", cursive; }

@keyframes desplazar {
  to { transform: translateX(-50%); }
}
```

## Consulta IA: flores, ascii, imágenes y jrug punk

**Prompt usado:**
> como puedo poner que las flores se vean en un 50% de opacidad? y lo otro, como puedo poner que al hacer click en la estrella de ascii art se convierta en [el segundo ascii] de modo hover? cómo puedo hacer tambien que cuando al hacer click en las imagenes se pongan un poco mas grandes de modo hover también? por ultimo, quiero que la tipografia jrug punk tenga 100% negro y sólo la parte de abajo tenga 50% (que va con la tipografía mac)

**Código después:**
```css
main > img { opacity: 0.5; }                     /* flores al 50% */

#sobre-mi pre:hover span:first-child { opacity: 0; }   /* la estrella se esconde */
#sobre-mi pre:hover span:last-child  { opacity: 1; }   /* aparece el segundo ascii */

figure img:hover { transform: scale(1.05); }     /* las imágenes crecen un poco */

figcaption      { color: var(--negro); }         /* jrug punk al 100% */
figcaption span { color: var(--color); }         /* la de mac al 50% */
```

## Consulta IA: link playlist y sombreado

**Prompt usado:**
> Puedes hacer que el link de portafolio tenga sombreado de esta manera y también lleve a este link https://open.spotify.com/playlist/3FNJq9FZgzpYKLD7PkDErb [...] acá esta flores. puedes hacer también que lo de proyectos redirija hacia abajo de manera smooth?

**Código después:**
```css
html { scroll-behavior: smooth; }

#sobre-mi p a:hover {
  text-shadow: 0 0.4em 0.4em rgb(0 0 0 / 35%);
}
```

## Consulta IA: correcciones (between ends, pixel art y franja)

**Prompt usado:**
> Puedes hacer que between ends no choque con el texto cuando se haga el efecto hover? y lo otro, puedes hacer que el pixel art esté con la tipografia blinkmacsystemfont? y que esté en un tamaño de 24, como también puedes igualar la parte de abajo tal cual como está en figma? la animación está bien, pero el texto de abajo está en 50% y yo lo quiero en 100% de negro, lo otro es que el escucha mientras ves mi portafolio quiero que ese sombreado sea solo al pasar el cursor

**Código después:**
```css
figure img { transform-origin: bottom; }   /* crece hacia abajo y no choca con el texto */

#sobre-mi pre { font-size: 1.389vw; }      /* 24px en un frame de 1728px */

footer a { color: var(--negro); }          /* franja al 100% */
```

---

# Consultas IA — versión actual

## Consulta IA: pasar el figma a código

**Prompt usado:**
> puedes pasar este figma a código html/css/js, eso sí, sólo la versión desktop y que sea responsive, con las versiones para celular también en los códigos (media queries) y puedes poner esto de cursor.

> no quedó igual la página html/css/js a lo que está hecho en figma

(le mandé las imágenes de cada frame, las tipografías y grabaciones de las animaciones)

**Código después:**
```css
:root {
  /* 1 px de figma: todo escala igual que mi frame de 1728px */
  --u: calc(min(100vw, 1728px) / 1728);
}

.hero__list li:nth-child(1) { left: calc(220 * var(--u)); top: calc(262 * var(--u)); }
```

* **Aceptado:** medir todo en px de figma para que quede igual a mi diseño.
* **Rechazado:** la primera versión con tipografías de google y cajas grises en vez de fotos.

## Consulta IA: media queries

**Prompt usado:**
> que sea responsive, con las versiones para celular también en los códigos (media queries)

**Código después:**
```css
/* tablet */
@media (max-width: 1024px) { /* ... */ }

/* tablet chica */
@media (min-width: 641px) and (max-width: 900px) {
  .project { padding-top: 130px; }
}

/* celular */
@media (max-width: 640px) { /* ... */ }

/* pantallas sin mouse: los textos de las fotos se ven siempre */
@media (hover: none) {
  .about__img figcaption { position: static; opacity: 1; }
}

/* para quien pidió menos movimiento */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## Consulta IA: versión mobile

**Prompt usado:**
> puedes hacer que la versión mobile se corra y se centre y esté un poco más grande en versión mobile

**Código después:**
```css
@media (max-width: 640px) {
  /* 1 px del frame mobile de figma (440 px de ancho) */
  :root { --m: calc(100vw / 440); }

  /* todo centrado y más grande */
  .listen        { left: 50%; transform: translateX(-50%); font-size: calc(19 * var(--m)); }
  .braille--left { left: 50%; translate: -50% 0; font-size: calc(21 * var(--m)); }
  .hero__list    { font-size: calc(42 * var(--m)); }
  .hero__list li { left: 50% !important; translate: -50% 0; }
}
```

* **Aceptado:** el inicio en celular centrado, más grande y con menos espacio vacío.

## Consulta IA: ascii que se transforma

**Prompt usado:**
> ese se convierte a [segundo ascii] y está en tipografía blinkmacsystem en 24 en desktop

**Código después:**
```js
// cada caracter cambia en un momento distinto, pasando por puntitos braille al azar
target.forEach((row, i) => row.forEach((ch, j) => {
  if (t >= delays[i][j] + 120) current[i][j] = ch;
  else if (t >= delays[i][j]) current[i][j] = NOISE[(Math.random() * NOISE.length) | 0];
}));
```

## Consulta IA: cursor más atractivo

**Prompt usado:**
> que la espada tenga un efecto más atractivo como en radelica por ejemplo

**Código después:**
```js
x += (mx - x) * 0.55;   // sigue al mouse con un poco de peso
y += (my - y) * 0.55;
const target = Math.max(-38, Math.min(38, dx * 1.8)) + (hovering ? -14 : 0);
blade.style.transform = `rotate(${BASE + tilt + swing}deg) scale(${scale})`;
```

* **Aceptado:** que se incline según hacia dónde la muevo, un brillo en la hoja al pasar por los links y una estela de puntitos braille.
* **Rechazado:** la estela de estrellitas de colores, no iba con mi blanco y negro.

## Consulta IA: franjas como sadti

**Prompt usado:**
> https://sadti.xyz/ que sean como esta página las animaciones de abajo, en el sentido del movimiento y que no se acelere tanto

**Código después:**
```css
/* de izquierda a derecha, sin acelerar */
@keyframes marquee { from { transform: translateX(-50%); } to { transform: translateX(0); } }
```
```js
const MARQUEE_SPEED = 60;   // misma velocidad en cualquier pantalla
track.style.animationDuration = (track.scrollWidth / 2 / MARQUEE_SPEED) + "s";
```

* **Aceptado:** hablemos solo en el inicio, en mieszkanie9 a 24.

## Consulta IA: páginas separadas y volver

**Prompt usado:**
> quiero que esté todo en distintas páginas (sobre mí, familiario, between ends, etc) refiriendome a que redirija

> puedes hacer que el volver atrás este en todas las páginas, obviamente que menos en la primera

> puedes hacer que el volver se mantenga fijo en las páginas

**Código después:**
```html
<a class="back-star" href="index.html" aria-label="Volver atrás">
  <pre class="back-star__art" aria-hidden="true">⠀⠀⠀⣆⠀⠀⠀
⠀⠀⢀⣿⡀⠀⠀
⠤⠶⣿⣿⣿⠶⠤
⠀⠀⠈⣿⠁⠀⠀
⠀⠀⠀⠏⠀⠀⠀</pre>
  <span class="back-star__label">volver</span>
</a>
```
```css
.back-star { position: fixed; }   /* queda arriba a la izquierda mientras bajo */
```

* **Aceptado:** la estrella en ascii que se deshace en puntitos, va con lo que ya tenía.
* **Rechazado:** la estampilla negra tipo radelica, no tenía mi estilo.
* **Aceptado:** la transición en braille al entrar y salir de las páginas.
* **Rechazado:** que las fotos aparecieran en puntitos al bajar, era demasiado.

## Consulta IA: hover del UI kit

**Prompt usado:**
> mira, en la página no está hover como lo que puse en figma, de los textos que tengo

**Código después:**
```css
.topbar__nav a:hover,
.hero__list a:hover { color: rgba(0, 0, 0, .5); }

.about__img figcaption { opacity: 0; transition: opacity .25s; }
.about__img:hover figcaption { opacity: 1; }
```

* **Aceptado:** la vista previa de cada proyecto al pasar por la lista y los textos bajo las fotos de sobre mí.

## Consulta IA: portadas de between ends

**Prompt usado:**
> puedes hacer tu misme que se muestre esta página o la animacion en especifico de las portadas de disco en la parte de between ends del principio y reemplazar para que no se vea el gif horrible que está

**Código después:**
```js
items.forEach((it) => {
  it.x += it.vx * dt;
  it.y += it.vy * dt;
  if (it.x <= 0 || it.x + it.s >= W) it.vx *= -1;   // rebota como el logo del dvd
  if (it.y <= 0 || it.y + it.s >= H) it.vy *= -1;
  it.el.style.transform = `translate(${it.x}px, ${it.y}px)`;
});
```

* **Aceptado:** las 22 portadas pesan 1.3 MB, nada que ver con el gif de 160 MB.

## Consulta IA: familiario, huérfanas y viudas

**Prompt usado:**
> que no queden huerfanas en ningun lado y que no se pasen a llevar las gráficas

> podrías agregar a los códigos lo nuevo agregado a figma de familiario, adjunto imágenes, procurar que no hayan viudas

**Código después:**
```css
p, figcaption, .project__desc { text-wrap: pretty; }
figcaption { text-wrap: balance; }
```
```js
// la última palabra va unida a la anterior con un espacio que no se corta
const i = t.lastIndexOf(" ");
last.data = t.slice(0, i) + " " + t.slice(i + 1);
```

* **Aceptado:** el tablero de familiario más grande y las dos fotos abajo, igual que en figma.
* **Aceptado:** sacar los escaneos del celular.
