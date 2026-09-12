# Security policy

## Supported releases

Only the latest published AgentCity release receives security fixes. The unsigned `1.0.0`
prerelease is retained for historical testing and should not be presented as the recommended
public download.

## Reporting a vulnerability

Do not disclose a vulnerability, private path, transcript, token, or credential in a public issue.
Use the repository's private security advisory form:

https://github.com/AdrimbMB/bot-crossing/security/advisories/new

Include the affected version, Windows version, reproduction steps, impact, and any suggested fix.

## Security boundary

AgentCity binds its internal server to loopback, validates Host and Origin, uses an isolated and
sandboxed Electron renderer, blocks unexpected navigation and windows, and does not expose Node.js
to web content. It treats supported agent data as read-only. `data/colony.json` and application
preferences are the only intended writes.

Official release artifacts should be built from a reviewed commit, signed or published through
Microsoft Store, scanned, tested on a clean Windows account, and accompanied by a SHA-256 digest.
