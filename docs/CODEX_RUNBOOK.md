# COLMILLO STUDIO - CODEX RUNBOOK

## Open the Balanced Project Default

From the project root:

```powershell
codex
```

This loads the project-scoped default: GPT-5.6 Sol, high reasoning and the
standard service tier (no Fast mode).

If an already-open PowerShell window still says `codex` is not recognized,
refresh that window with:

```powershell
$env:Path = "C:\Users\Usuario\AppData\Local\OpenAI\Codex\bin\9ba750cce02d5e5c;$env:Path"
codex
```

New PowerShell windows should pick up the user PATH automatically.

Then use:

```text
Lee AGENTS.md y COLMILLO_BUILD_SPEC.md completamente. Revisa docs/EXECUTION_STATE.md, docs/DECISIONS.md y docs/CONTENT_NEEDED.md. Haz la auditoria inicial del repositorio y empieza la Fase 0/1: si el repositorio esta vacio, crea la base Astro con TypeScript estricto, estructura limpia, tokens de marca, rutas esenciales y documentacion actualizada. No hagas push ni despliegue.
```

## Audit Profile

```powershell
codex --profile colmillo-audit
```

Use for:

```text
Audita a fondo el repositorio de Colmillo. No cambies archivos. Revisa arquitectura, responsive, accesibilidad, performance, motion y fidelidad al brief. Devuelve hallazgos priorizados y rutas de archivos.
```

## Optional Profile Overrides

`colmillo-build` uses high reasoning and `colmillo-audit` uses xhigh reasoning.
Select them only when the task explicitly needs the additional reasoning.

The legacy fast profile remains available globally but is not the project
default:

```powershell
codex --profile colmillo-fast
```

Do not use it when standard GPT-5.6 Sol processing is desired.

## Subagents

Available project agents:

- `reference_researcher`
- `motion_architect`
- `qa_reviewer`

Use them for read-heavy work and reviews. Keep implementation edits in the main
thread unless a task is explicitly separated.

## Guardrails

Project rules live at:

`C:\Users\Usuario\Documents\Codex\colmillo-web\.codex\rules\safety.rules`

They block destructive git operations, push and deployment commands when rules
are active.
