# COLMILLO STUDIO — CREATIVE POLISH PLAN

Plan interno para elevar la demostración actual desde una base técnica sólida a
una experiencia con dirección de arte, interacción y acabado de portfolio
premium. Este documento no autoriza contenido, claims ni activos de producción
que todavía no hayan sido aprobados.

## Resultado buscado

La web debe sentirse contemporánea y muy trabajada sin convertirse en una
colección de efectos. Todo movimiento debe pertenecer a una de estas acciones:

- morder;
- presionar;
- deformar;
- cubrir;
- tensar;
- soltar.

El salto cualitativo vendrá de la continuidad entre estados, el ritmo, el
contraste y el detalle de interacción; no de añadir ruido visual o dependencias
pesadas.

## Diagnóstico actual

- El menú lateral es funcional y accesible, pero compite visualmente con el
  control de movimiento y parece una utilidad flotante más que una pieza de
  identidad.
- El header repite navegación que ya existe en el menú. Eso resta protagonismo
  al logo y debilita la jerarquía.
- Hero, capas, carril horizontal, cursor y despedida ya tienen comportamiento,
  pero todavía se perciben como módulos separados.
- Las transiciones actuales son prudentes y robustas, aunque no generan una
  continuidad espacial clara entre rutas.
- El responsive es estable, pero adapta principalmente tamaño y disposición;
  la siguiente fase debe adaptar también la coreografía.
- La base de rendimiento permite subir el acabado: 122.123 bytes de JavaScript
  frente a un presupuesto total de 220.000 bytes. Ese margen no obliga a usarlo.

## Principio rector: intensidad controlada

| Momento | Intensidad | Gesto principal | Lo que se evita |
| --- | ---: | --- | --- |
| Hero | 100% | presión viva + revelado de marca | loops simultáneos sin jerarquía |
| Manifiesto | 65% | capas que cubren y comprimen | parallax continuo en todo el texto |
| Proyectos | 90% | materia horizontal + foco de tarjeta | carrusel genérico |
| Studio | 55% | ritmo editorial + deformación puntual | adornos permanentes |
| Goodbye | 100% | mordida, cierre y liberación | copiar la animación de referencia |
| Contacto | 40% | calma, claridad y respuesta táctil | efectos que dificulten contactar |
| Legales | 10% | microtransiciones funcionales | movimiento narrativo innecesario |

## Fase A — Navegación como gesto protagonista

### A1. Botón de menú centrado

- Mover el trigger a la parte inferior y centrarlo matemáticamente en el
  viewport con `inset-inline-start: 50%` y `translate: -50% 0`.
- Mantenerlo centrado en 1440×1000, 834×1112, 390×844 y 320×720, incluyendo
  zoom de texto y `safe-area-inset-bottom`.
- Convertirlo en una pieza horizontal compacta, no en una cápsula genérica: un
  cuerpo orgánico con dos pequeñas muescas, estado de presión y etiqueta
  `MENÚ`, más el índice de escena cuando exista.
- Área interactiva mínima de 44×44 px; contenido ópticamente centrado, foco
  visible y estado abierto inequívoco.
- El control de reducción de movimiento dejará de competir con el menú: se
  integrará dentro del panel y conservará una entrada accesible mediante
  teclado y sin JavaScript esencial.

### A2. Panel de navegación

- Transformar el panel lateral en una superficie editorial a pantalla completa
  que emerge desde el botón central como una mandíbula que se abre.
- Escritorio: composición de dos columnas, navegación numerada de gran escala a
  la izquierda y contexto/retorno a proyectos a la derecha.
- Tablet y móvil: una columna, altura dinámica (`100dvh`), scroll interno solo
  si es necesario y cierre siempre alcanzable.
- La lista entra como un único ritmo escalonado; no se animará cada letra.
- Al pasar o enfocar un enlace, el fondo se comprime suavemente y el número de
  ruta desplaza una muesca. Tacto usa `:active` y estado de foco, no hover
  simulado.
- El JavaScript gestionará Escape, retorno de foco, contención de foco e
  `inert` del contenido exterior. El `<details>` seguirá proporcionando un
  fallback navegable sin JavaScript.

### A3. Header simplificado

- Mantener logo, contraste claro/oscuro y accesos reales de contacto cuando
  existan.
- Mientras falten canales reales, eliminar la duplicación visual de navegación
  del header y dejar que el menú centrado sea la navegación principal.
- Añadir un indicador discreto de ruta/escena solo cuando aporte contexto; no
  inventar disponibilidad, ubicación ni claims.
- La aparición al salir del hero tendrá una entrada corta de presión vertical,
  no un simple slide.

Archivos principales: `SideMenu.astro`, `SiteHeader.astro`,
`MotionControls.astro`, `BaseLayout.astro`, `SideMenu.ts`, `StickyHeader.ts`,
`motion.css` y `layout.css`.

## Fase B — Sistema visual y de movimiento unificado

### B1. Variables de estado compartidas

- Publicar progreso de scroll, escena activa, velocidad normalizada y posición
  del puntero mediante variables CSS actualizadas de forma agrupada.
- Separar lectura y escritura de layout por frame.
- No crear un segundo loop permanente: reutilizar ScrollTrigger y eventos de
  puntero ya existentes.
- Activar estados solo por capacidad: puntero fino, pantalla suficiente,
  ausencia de reducción de movimiento y pestaña visible.

### B2. Gramática de superficies

- Crear tres bordes reconocibles: mordida pequeña para controles, presión para
  tarjetas y rasgado suave para transiciones de sección.
- Usar `clip-path`, máscaras SVG locales, transform y opacity. Evitar blur
  permanente, sombras SaaS y degradados decorativos.
- Hacer que el naranja aparezca como energía/acción, el ink como presión y el
  crema como liberación.
- Limitar cada componente a un gesto primario y uno de respuesta.

### B3. Cursor más refinado

- Sustituir el cambio brusco de tamaño por una interpolación con masa aparente.
- Darle tres estados claros: explorar, abrir y arrastrar/progresar.
- Convertir la velocidad en elongación con un límite menor para evitar aspecto
  gomoso.
- Sincronizar color con la superficie actual y mantener el puntero nativo como
  affordance real.
- Detener toda actualización al salir de la ventana, cambiar de pestaña o
  activar movimiento reducido.

## Fase C — Momentos de impacto

### C1. Hero

- Reemplazar la sensación de blobs independientes por un único campo de presión
  que afecte palabra, contorno y CTA de forma coordinada.
- Entrada en tres tiempos: superficie, marca, acción. Duración total visible
  inferior a 1,2 s y nunca bloqueante.
- Respuesta de puntero localizada y sutil; en móvil, una composición estática
  potente con una sola liberación al entrar.
- El CTA recibirá una mordida reversible y un feedback de presión, manteniendo
  texto y hit-area estables.
- El scroll de salida comprimirá el hero y entregará visualmente la superficie
  a Manifiesto/Contacto.

### C2. Capas editoriales

- Hacer que la sección entrante proyecte presión real sobre la anterior:
  escala mínima, desplazamiento corto, pérdida de contraste y deformación de
  borde coordinadas por un solo progreso.
- Mantener titulares nítidos hasta que salgan del área de lectura.
- En tablet usar solape reducido; en móvil, transición lineal con borde vivo y
  sin sticky prolongado.

### C3. Proyectos

- Mantener el mapping vertical-horizontal y mejorar la puesta en escena de la
  tarjeta activa: escala, profundidad 2D, marco y metadatos sincronizados.
- Añadir una máscara lateral que sugiera material entrando/saliendo, sin ocultar
  controles ni texto.
- Puntero fino: tilt máximo muy limitado y calculado sin lecturas por frame.
- Tacto: scroll-snap nativo, tarjeta central dominante y feedback de progreso.
- Teclado: el foco mueve la escena y pausa cualquier deformación secundaria.
- La transición a detalle compartirá color y encuadre mediante View Transitions
  nativas cuando estén disponibles; fallback de navegación normal intacto.

### C4. Manifiesto y Studio

- Manifiesto: cada idea cambia la tensión de la superficie, no solo el color.
- Studio: pasos conectados por un recorrido físico corto que se activa al entrar
  en viewport, sin convertir el texto en infografía animada.
- Titulares con microdeformación por palabra completa; nunca por letra para
  preservar lectura, selección y rendimiento.

### C5. Goodbye y Contacto

- Goodbye será el segundo gran clímax: cierre de mandíbula, pausa y liberación
  hacia el footer. El fallback CSS seguirá marcado como demo hasta recibir el
  activo oficial.
- Contacto reducirá intensidad y aumentará precisión. Los enlaces reales
  reaccionarán como placas bajo presión; si siguen ausentes, no se inventará
  ninguno.
- El salto desde CTA o menú aterrizará con el título completamente visible y sin
  quedar debajo del header.

## Fase D — Transiciones entre páginas

- Mantener navegación documental nativa; no reintroducir ClientRouter ni una
  capa que pueda romper atrás/adelante.
- Usar transiciones de documento progresivas cuando el navegador las soporte:
  logo/header persistente visualmente, superficie de salida comprimida y nueva
  página revelada desde una muesca.
- Fallback inmediato con la entrada CSS actual.
- Duración objetivo de 320–480 ms; nunca retrasar una navegación por esperar una
  animación.
- Desactivar por completo con `prefers-reduced-motion` o el control explícito.

## Fase E — Responsive coreografiado

No se escalará la experiencia de escritorio de forma uniforme. Cada capacidad
tendrá su propia versión:

| Capacidad | Comportamiento |
| --- | --- |
| Escritorio + puntero fino | sistema completo, cursor, capas y rail horizontal |
| Tablet/táctil | capas cortas, menú centrado, scroll horizontal nativo |
| Móvil | composición fuerte, movimiento de entrada y feedback táctil |
| Teclado | foco gobierna escena; nada depende de hover o drag |
| Movimiento reducido | estado final inmediato, sin pin, loops ni deformación |
| Sin JavaScript | navegación, contenido, proyectos y menú siguen disponibles |

Breakpoints se decidirán por capacidad y espacio real, no solo por dispositivo.
Se mantendrán como mínimo las matrices 1440×1000, 834×1112, 390×844, 320×720,
200% de texto y orientación horizontal móvil.

## Orden de implementación

1. Centrar trigger, reconstruir panel y simplificar header.
2. Resolver foco, `inert`, Escape, no-JavaScript y movimiento reducido del menú.
3. Crear tokens/variables compartidas de presión y superficie.
4. Refinar hero y entrega a la primera sección.
5. Refinar capas editoriales.
6. Elevar carril y tarjetas de proyecto.
7. Crear transiciones documentales progresivas.
8. Refinar Manifiesto, Studio, Goodbye y Contacto.
9. Ejecutar QA completa, medir y eliminar efectos que no aporten.

Cada punto debe cerrarse como un vertical slice validado antes de comenzar el
siguiente.

## Presupuesto y límites

- Mantener JavaScript total por debajo de 220 KB sin comprimir y ningún chunk
  por encima de 150 KB.
- No añadir dependencias en la primera iteración; GSAP, CSS, SVG y APIs nativas
  cubren el alcance.
- Como máximo un sistema de seguimiento continuo de puntero.
- Ningún filtro caro permanente sobre superficies grandes.
- LCP móvil < 2,5 s, CLS < 0,1 y ausencia de overflow horizontal.
- El menú debe responder en el siguiente frame y completar su entrada en menos
  de 500 ms.
- No WebGL salvo una revisión posterior con diferencia visual demostrable,
  presupuesto medido y fallback completo.

## Criterios de aceptación

- Centro del trigger a ±1 px del centro del viewport en los tres viewports
  principales.
- Trigger, panel, header y controles no cubren CTA, contacto, proyecto, footer o
  enlaces legales.
- Apertura/cierre por puntero, tacto, Enter, Space y Escape; foco contenido y
  restaurado correctamente.
- Menú y navegación esencial funcionan sin JavaScript.
- Cada ruta funciona con movimiento reducido y consola sin errores.
- Atrás/adelante funciona durante navegación rápida.
- No existe contenido demo en `dist`; `dist-demo` conserva la demostración.
- `check`, lint, formato, activos, build, integridad, enlaces, manifiesto,
  producción E2E, demo E2E y auditoría siguen en verde.
- QA visual aprobada en home, menú abierto/cerrado, proyectos, detalle,
  Manifiesto, Studio, Contacto, legales y 404.

## Primera entrega recomendada

Implementar únicamente la Fase A como primer slice. El resultado debe ser un
menú centrado, moderno y reconocible, con header simplificado y todos sus
fallbacks. Tras aprobar su peso visual y comportamiento en navegador, se usará
como patrón para el resto del sistema.

## Resultado de implementación — 2026-09-07

El plan se ha ejecutado de principio a fin sobre la demostración local:

- el menú inferior está centrado matemáticamente y abre una superficie
  editorial completa con navegación numerada, foco contenido, `inert`, Escape,
  retorno de foco y fallback nativo con `<details>`;
- el control de movimiento vive dentro del panel y el header ya no duplica la
  navegación mientras faltan canales de contacto reales;
- hero, capas, proyectos, Manifiesto, Studio, Goodbye y Contacto comparten
  estados de presión, superficie y revelado sin añadir dependencias ni un nuevo
  loop permanente;
- el cursor publica posición y velocidad normalizadas, cambia de contraste por
  superficie y conserva el puntero/foco nativos;
- el rail da profundidad 2D a la tarjeta activa, conserva scroll nativo y
  scroll-snap en tacto/sin JavaScript y reserva espacio para el control fijo;
- el responsive se verificó en 1440×1000, 834×1112, 390×844, 320×720, tacto,
  puntero fino, 200% de texto y movimiento reducido;
- se probó la transición documental nativa progresiva y se descartó tras
  reproducir `Transition was skipped` en navegación atrás/adelante táctil. La
  entrada CSS sin escala global queda como solución estable y no retrasa la
  navegación.

El acabado creativo está técnicamente cerrado. La siguiente iteración visual
depende de sustituir la demostración por copy, proyectos, fuentes y medios
oficiales aprobados.
