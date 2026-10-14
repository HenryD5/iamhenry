---
description: Prueba en Chrome los cambios recientes con el agente qa-changes
argument-hint: "[módulo, URL, tarea o ficha]"
---

Lanza el agente `qa-changes` con `model: haiku` si el contexto es solo "revisa esta vista" o un texto o estilo puntual, y `model: sonnet` en cualquier otro caso.

Contexto del usuario: $ARGUMENTS

Antes, comprueba que `http://localhost:3000` responde; si no, dilo y no lances el agente. Pásale el contexto tal cual y, cuando vuelva, muestra su reporte sin resumirlo de nuevo.
