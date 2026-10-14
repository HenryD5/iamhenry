---
workflow: faceless-explainer
flow: automation
storyboard: yes
message: "Tus tests pueden pasar y tu web estar rota; así creas un agente de QA en Chrome que lo detecta"
destination: tiktok
aspect: 1080x1920
language: es
audience: "Comunidad de desarrollo web y público curioso por la IA, sin dar por sabido MCP"
length: 30s
angle: how-to
---

## Intent

Video corto para Instagram Reels y TikTok basado en el artículo "Tu propio agente de QA en Chrome con IA". Tono: enseñar y aportar a la comunidad, no vender. Primera persona, cercano, con una experiencia real (portada con error 500 aunque los tests pasaban) y un truco aplicable.

Guion aprobado por el usuario (voz en off, palabra por palabra):

1. Gancho (0–5 s): "Mis tests pasaban… y mi portada daba error 500. Así creé un agente de QA que lo detecta."
2. Qué necesitas (5–10 s): "Necesitas tres cosas: Claude Code, un Chrome de pruebas y Chrome DevTools MCP."
3. Cómo trabaja (10–19 s): "El agente hace cuatro cosas: mira qué cambiaste, decide qué probar, lo prueba en Chrome y te da un informe."
4. El truco (19–25 s): "Un truco: pon las comprobaciones en un script. Gastas menos y solo ves lo que falla."
5. Cierre (25–30 s): "Los archivos completos están en mi blog, gratis. Guárdalo para tu próximo proyecto."

## Assets

- public/logo-on-dark.svg — logotipo de Henry para fondo oscuro; aparece en el cierre (escena 5).

## Customizations

- Subtítulos palabra a palabra con los colores de la marca.
- Escena del 500 tratada como alerta (verde → rojo), es el momento de retención.
- Música de fondo suave, atenuada bajo la voz.
- Voz: ofrecer 2–3 voces en español para elegir.

## Notes

- Marca: `src/app/theme.css` de la web — primary-500 #1F4BFF, neutral-900 #0E1022, neutral-50 #F6F5FB; títulos Manrope, texto Inter, código JetBrains Mono.
- Sin código completo en pantalla: solo fragmentos cortos (p. ej. `/qa-changes home`).
- Sin datos privados (rutas de usuario, IPs, IDs de proyecto).
- El cierre menciona el blog: publicar el video cuando el blog esté en línea.
- Contenido fuente: docs/blog/drafts/qa-agent-chrome-mcp.md.
