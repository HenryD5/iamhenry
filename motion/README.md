# Motion

| Pieza | Sección | Archivos | Tamaño | Duración | Bucle | Peso | Estado |
|---|---|---|---|---|---|---|---|
| stack-tres-cuerpos | 3 Stack | `public/media/stack-tres-cuerpos.webm`, `.mp4`, `.webp` (póster, fotograma de 5 s) | 1200x900 | 6 s, 30 fps | sí | webm 696 KB · mp4 770 KB · webp 21 KB | maqueta aprobada · entregada |
| hero-orbita | 1 Hero | `public/media/hero-orbita.webm`, `.mp4`, `.webp` (póster, fotograma de 4,8 s: todos los planetas en órbita, sin nave) | 1920x1080 | 8 s, 30 fps | sí | webm 1138 KB · mp4 1155 KB · webp 55 KB | maqueta aprobada · entregada |

Notas de `stack-tres-cuerpos`:

- Sin audio. WebM VP9 y MP4 H.264 (CRF 18), ambos opacos sobre tinta `#0E1022`.
- Bucle: el último fotograma es idéntico al primero (núcleo en reposo, anillos atenuados, sin objetos). Los objetos se desvanecen entre 5,3 y 5,85 s sin dejar de girar y vuelven a entrar desde fuera del cuadro.
- Decorativa: la sección ya nombra las tres disciplinas en sus tarjetas, por eso lleva `aria-hidden`.
- Fuente de la composición: `motion/stack-tres-cuerpos/index.html`. Lo aprobado: `maqueta.html` y `maqueta/`. Revisión del resultado: `final-check/`.

Notas de `hero-orbita`:

- Sin audio. WebM VP9 (CRF 20, dos pasadas) y MP4 H.264 (CRF 18, `faststart`), opacos, etiquetados BT.709. Los dos salen de la misma secuencia PNG de `hyperframes render --format png-sequence` y se codifican con `ffmpeg`: el WebM directo de HyperFrames 0.8.143 salía con pista alfa, sin etiqueta de color y con matriz BT.601 (colores saturados algo distintos en Chrome) y pesaba más.
- Bucle con entrada en cada vuelta: el fotograma 0 y los tres últimos (7,9–8 s) son idénticos en la composición (núcleo atenuado, sin anillos ni planetas). Planetas fuera en 7,5–7,8 s, anillos en 7,55–7,85 s, el núcleo se atenúa en 7,6–7,9 s y nunca desaparece.
- Fondo: resplandor del hero incluido y estático (`assets/glow.png`, generado con `tools/make-glow.mjs` a partir de los tres degradados de `HeroSection.tsx`). Se apaga antes del borde: los 32 px exteriores son fondo plano. En el video codificado el perímetro completo mide `#F6F5FC` en los 240 fotogramas (objetivo `#F6F5FB`; el +1 en azul es el redondeo de YUV 8 bits de rango limitado, `#F6F5FB` no es representable). Se mide con `node tools/edge-colors.mjs <video>`.
- Geometría para colocarlo: núcleo en el centro exacto (50 % / 50 %); anillo exterior del 9,375 % al 90,625 % del ancho (81,25 %) y del 16,2 % al 83,8 % del alto (67,6 %). El video sustituye al resplandor difuso de `HeroSection.tsx`.
- Decorativa (`aria-hidden`): los nombres de las tecnologías deben seguir en el DOM de la sección.
- Fuente de la composición: `motion/hero-orbita/index.html`. Lo aprobado: `maqueta.html` y `maqueta/`. Revisión del resultado: `final-check/contact-sheet.jpg`.

## Integración (Next.js, isla cliente)

El componente es la isla `'use client'` de la sección. Con `prefers-reduced-motion: reduce` no se monta ningún `<source>`: el video no se descarga y queda el póster. Se reproduce al entrar en pantalla y se pausa al salir.

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

const MEDIA_BASE = '/media/stack-tres-cuerpos';

export function StackOrbitVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlayMotion, setCanPlayMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setCanPlayMotion(!query.matches);
    handleChange();
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canPlayMotion) return;
    video.load();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [canPlayMotion]);

  return (
    <video
      ref={videoRef}
      className={className}
      width={1200}
      height={900}
      poster={`${MEDIA_BASE}.webp`}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    >
      {canPlayMotion ? (
        <>
          <source src={`${MEDIA_BASE}.webm`} type="video/webm" />
          <source src={`${MEDIA_BASE}.mp4`} type="video/mp4" />
        </>
      ) : null}
    </video>
  );
}
```

Sobre el snippet:

- `autoPlay` solo actúa cuando hay `<source>` (es decir, sin movimiento reducido); el `IntersectionObserver` pausa el video fuera de pantalla y lo reanuda al volver.
- No uses `next/image` para el póster ni para el video.
- Para otra pieza, cambia `MEDIA_BASE`, `width`/`height` y quita `loop` si no va en bucle. Para `hero-orbita`: `MEDIA_BASE = '/media/hero-orbita'`, `width={1920}`, `height={1080}`, con `loop`.
