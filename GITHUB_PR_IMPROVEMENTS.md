# PR: Installable local AgentCity desktop app for Windows

## Summary

This change turns the existing local AgentCity web experience into an installable Windows app.
Users can run one installer, launch AgentCity from the Desktop or Start Menu, and keep colony
state in their own Windows profile without installing Node or opening a terminal.

## What changed

- added a hardened Electron window that starts and stops the existing local server;
- selected a free loopback port at launch to avoid conflicts;
- moved writable colony state to per-user application data with a one-time legacy migration;
- added an original robot/astronaut application icon and Windows `.ico` set;
- added an assisted, per-user NSIS installer with shortcuts and clean uninstall;
- constrained packaged files so private colony data and development files cannot enter builds;
- documented architecture, privacy boundaries, installation, build, and release trade-offs; and
- added tests for desktop state paths and non-destructive migration.

## Architecture and privacy

Electron reuses the production UI and Node API rather than introducing a second implementation.
The server remains loopback-only with Host/Origin validation. Chromium isolation and sandboxing
stay enabled, and renderer navigation is restricted. No telemetry, cloud sync, transcripts,
credentials, or local colony state are packaged or uploaded.

See `ARCHITECTURE_DESKTOP.md` for the complete decision record.

## How to verify

1. Run `npm ci` and `npm test`.
2. Run `npm run desktop:installer` on Windows.
3. Install `release/AgentCity-Setup-1.0.0.exe` without administrator access.
4. Launch from the Desktop and Start Menu; confirm one native window opens.
5. Change colony layout/settings, restart, and confirm they persist.
6. Confirm installed harnesses are detected and their threads/folders open normally.
7. Uninstall AgentCity and confirm its shortcuts and program files are removed.

## Release notes / limitations

- The initial installer is unsigned, so Windows may display a SmartScreen warning.
- Agent harnesses are detected locally but are not bundled.
- Automatic updates are intentionally excluded from this first release.
- Windows is the first packaged target; the browser/dev workflow remains cross-platform.

## Checklist

- [x] Source tests pass
- [x] Production UI builds
- [x] Installer builds on Windows
- [x] Packaged contents exclude private local data
- [x] Architecture and installation are documented
- [ ] Authenticode signing configured for a public release
