# AgentCity desktop architecture decisions

## Status

Accepted for the first Windows desktop release on `codex/agentcity-desktop-local`.

## Decisions

### Electron reuses the existing local application

The desktop app is a thin Electron main process around the existing Vite build and Node API. It
starts the HTTP server in the Electron process on an operating-system-assigned loopback port,
then opens that address in one native window. This avoids duplicating the scanner, API, or UI and
removes fixed-port conflicts. Electron was chosen because the server already depends on Node and
the result can be packaged as one familiar Windows installer.

### The local server remains the security boundary

The API still binds only to `127.0.0.1` and retains its Host and Origin checks. The renderer has
no Node integration, uses context isolation and Chromium sandboxing, cannot create new windows,
and cannot navigate away from the local application. Ordinary web links are handed to the
default browser. Agent harness links continue to be handled by the server and operating system.

### Writable state belongs to the Windows user

The desktop main process sets `BOT_CROSSING_DATA` to Electron's per-user `userData/data`
directory before the API module loads. The installed application bundle is therefore read-only;
`colony.json` survives upgrades and uninstall/reinstall cycles unless the user removes their app
data. On first launch, an existing legacy `data/colony.json` is copied when discoverable. An
already-created desktop state is never overwritten.

### The installer is per-user and auditable

`electron-builder` produces an NSIS assisted installer. It requires no administrator elevation,
offers an installation location, creates Start Menu and Desktop shortcuts, and registers a clean
uninstall entry. Automatic updates and code signing are intentionally deferred: releases are
manual and the first unsigned installer may show a Windows SmartScreen warning. A Windows-only
resource step applies the executable metadata and icon without pulling in a cross-platform signing
bundle whose macOS symlinks require Windows Developer Mode.

### Private data is excluded by construction

The package allow-list contains the built UI, desktop bootstrap, server code, and package
metadata. `data/`, tests, source-only files, transcripts, credentials, and machine-specific
configuration are excluded. The release folder and local npm cache are ignored by Git.

### Branding has one raster master

`build/icon.png` is the checked-in transparent master. `build/icon.ico` contains the common
Windows icon sizes and is used for the executable, installer, shortcuts, and uninstall entry.
The mascot is an original robot/astronaut with a city motif and no third-party brand marks.

## Consequences and follow-ups

- Windows x64 is the verified first target; macOS/Linux packages can reuse the shell later.
- A public release should add Authenticode signing before promising a warning-free install.
- Auto-update remains out of scope until a trusted release channel and signing process exist.
- Installed agent harnesses remain separate prerequisites; AgentCity does not bundle them.
