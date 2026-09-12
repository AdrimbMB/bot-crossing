# AgentCity desktop packaging plan

This document tracks the implemented desktop version of AgentCity on the branch
`codex/agentcity-desktop-local`.

## Delivery status

Implemented on Windows x64. The Electron shell, per-user storage and migration, original icon,
NSIS installer, privacy allow-list, automated tests, and documentation are complete. The verified
installer output is `release/AgentCity-Setup-1.0.0.exe`. Code signing and automatic updates remain
explicit follow-ups rather than release blockers for this local first version.

## Objective

Turn the current local web application into an installable Windows desktop application that:

- opens in its own application window after a double-click;
- starts the local Node server automatically;
- keeps colony state and user data on the local computer;
- includes a custom AgentCity icon featuring a small robot/astronaut character; and
- keeps publishable source code separate from private local data.

## Current foundation

AgentCity already uses Vite and Three.js for the 3D client and a Node server for local scanning,
state persistence, and opening agent sessions. The server binds to `127.0.0.1` by default. Colony
state is stored in `data/colony.json`, while agent transcripts and harness data remain in their
existing local locations.

## Proposed implementation

### 1. Desktop shell

Use Electron as the first packaging target. Electron fits the existing Node-based server and lets
the application launch a borderless or standard native window without requiring a browser tab.

- Add an Electron main process.
- Start the packaged local server on an available loopback port.
- Wait for the server to become ready, then open the AgentCity window.
- Pass the selected port to the renderer safely.
- Shut down the server when the application exits.
- Keep external navigation restricted and leave agent deep links to the operating system.

### 2. Local data boundary

- Move writable state to the operating system's per-user application-data directory.
- Keep `colony.json` outside the installed application bundle.
- Migrate the existing `data/colony.json` on first launch when present.
- Keep transcripts, prompts, repository paths, and harness records local.
- Do not add telemetry, cloud sync, or remote data services.
- Keep local-only files ignored by Git.

### 3. Branding and artwork

Create an AgentCity character mark: a friendly compact robot/astronaut with a screen-like face,
visor glow, and a small city/antenna detail. Produce the required application assets:

- source vector artwork where practical;
- PNG previews and installer artwork; and
- Windows `.ico` files at the required sizes.

The visual should remain recognizable in a 16px taskbar icon as well as in the installer and
desktop shortcut.

### 4. Windows installer

Use an Electron Windows packaging tool such as `electron-builder` to produce an `.exe` installer.
The first version should provide:

- per-user installation;
- Start Menu and optional Desktop shortcuts;
- custom application name and icon;
- clean uninstall; and
- a repeatable build command for future releases.

Automatic updates are out of scope for the first release so that updates remain deliberate and
the application stays easy to audit.

### 5. Repository and GitHub workflow

- Keep this work on `codex/agentcity-desktop-local` until it is reviewed.
- Verify that no private state, transcripts, credentials, or machine-specific paths are committed.
- Add packaging documentation and an example configuration without secrets.
- Push only source code and public assets to the user's private GitHub repository.
- Create the remote repository or push to it only after GitHub authentication and the destination
  repository are available.

## Delivery phases

1. Desktop proof of concept: native window, local server startup, and clean shutdown.
2. Data migration: per-user storage, first-run behavior, backups, and privacy checks.
3. Branding: robot/astronaut logo, icon set, splash/installer artwork, and application metadata.
4. Installer: signed or clearly identified Windows installer build and uninstall path.
5. Verification: fresh install, upgrade over an existing local state, offline launch, harness
   detection, session opening, and confirmation that no data is sent remotely.

## Acceptance criteria

- Double-clicking the installed AgentCity shortcut opens one native application window.
- The application works without a browser tab and without a network connection.
- Existing local colony state can be migrated without loss.
- Agent data stays on the machine and is not included in Git commits or the installer.
- AgentCity can still detect supported local harnesses and open their sessions/folders.
- A clean Windows machine can install and launch the packaged application using the documented
  steps.

## Known constraints

The installer packages AgentCity, not the agent products themselves. Claude Code, Codex, Cursor,
or other supported harnesses must already be installed and configured on the target computer for
their local sessions to be visible.
