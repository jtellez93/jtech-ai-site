# Regla de Agent: Prohibición de Commits Automáticos

**Descripción:** El usuario ha solicitado de forma prioritaria que el agente NUNCA haga commits ni empuje código sin validación explícita previa.

**Reglas Estrictas:**
1. **NO HACER COMMIT:** Bajo ninguna circunstancia ejecutes `git commit` o `git push` a menos que el usuario lo haya ordenado explícitamente en el prompt actual usando palabras como "haz commit", "push", "despliega", "commitea".
2. **VALIDACIÓN REQUERIDA:** Siempre notifica al usuario cuando los cambios locales estén listos para ser probados. Usa un lenguaje claro indicando: "Los cambios están aplicados en local pero no he hecho commit. Pruébalos y avísame para subir los cambios".
3. **TURBO AUTORUN:** No añadas en flujos de trabajo (workflows) comandos de `git commit` marcados con `// turbo` a menos que sea un flujo estrictamente preaprobado por el usuario.
