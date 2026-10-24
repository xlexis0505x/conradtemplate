# GitHub Copilot & Coding Agent Instructions

Please adhere strictly to the repository instructions in [AGENTS.md](../AGENTS.md).

### Quick Summary:
- **Project Domain:** Conrad Challenge pitch prototype for deep-sea mining sediment plume mitigation (DRUNKEAST / POSEIDON). Do not resurrect legacy military drone / defense models or airframes.
- **Local Dev Server:** Run `python3 conrad.prototype/server.py 8087` (supports SPA route fallback and video byte-ranges).
- **Security:** Do not use wildcard CORS `*`. Avoid raw `innerHTML` interpolation of dynamic text.
- **Cleanliness:** Never commit scratch scripts (`*.pid`, `*.patch`, `*.orig`, `fix.sh`).
- **Tests:** Verify with `bash ./scripts/test.sh` before submitting changes.
