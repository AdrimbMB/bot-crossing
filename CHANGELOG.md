# Changelog

All notable AgentCity changes are documented here. Versioning follows Semantic Versioning.

## [1.1.0] - 2026-09-12

### Added

- Microsoft Store AppX packaging with Partner Center identity supplied at build time.
- Fail-closed Authenticode signing and timestamp verification for direct-download installers.
- Independent-fork disclosure, privacy policy, security policy, notices, and website copy.
- Store tile assets generated from the AgentCity icon.
- Automated Windows checks for tests, production build, and dependency audit.

### Changed

- Updated the desktop identity and visible product metadata to AgentCity.
- Updated Electron to 44.3.0 and Electron Builder to the current stable 26.x release.
- Restricted packaged content to the runtime and required legal material.

### Security

- Retained loopback-only serving, origin validation, renderer isolation, sandboxing, and blocked
  in-app navigation.
- Excluded local session data, credentials, tests, and machine configuration from release packages.

[1.1.0]: https://github.com/AdrimbMB/bot-crossing/compare/agentcity-desktop-v1.0.0...HEAD
