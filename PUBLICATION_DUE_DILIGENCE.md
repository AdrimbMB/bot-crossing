# AgentCity publication due diligence

Review date: 12 September 2026
Target release: 1.1.0

## Executive status

AgentCity is technically functional and has a verified Windows NSIS packaging path. Publication
controls, legal notices, privacy disclosure, fork attribution, Store packaging configuration, and
signature verification are present for version 1.1.0. Public release remains blocked on publisher
identity verification, final trademark/name checks, Store identifiers, a real signed or
Store-certified artifact, and clean-machine acceptance testing of that artifact.

## Verification completed in this review

- 39 of 39 automated tests pass, including publication metadata and release-control checks.
- The Vite production build completes on Node 22 with Vite 7.3.6.
- Full and production-only npm audits both report zero known vulnerabilities.
- The Windows x64 NSIS installer builds successfully with Electron 44.3.0.
- The packaged executable starts, remains responsive, and shuts down cleanly in a smoke test.
- Root licence, notice, privacy, and third-party licence files are present inside `app.asar`.
- A test AppX builds successfully and its manifest contains the expected x64 architecture,
  Spanish and English resources, `runFullTrust`, Windows 10 1809 minimum, and Windows 11 24H2
  maximum tested version.
- The installed Windows App Certification Kit was located. Its definitive pass remains open until
  the exact final package is rebuilt with the real Partner Center identity.

The locally generated 1.1.0 EXE and test-identity AppX are unsigned validation artifacts. They are
not approved public downloads and must not replace the currently published release.

## Upstream and provenance

- Upstream remote: `https://github.com/Station-Sciences/bot-crossing.git`
- Upstream branch checked: `origin/main`
- Upstream base: `a497242`
- No upstream `develop` branch exists as of the review date.
- AgentCity desktop commit before this review: `4a9bd98`
- `origin/main` has no commits newer than the AgentCity base.
- The original author explicitly describes forking as a first-class option in `CONTRIBUTING.md`.

## Licence and attribution

- Original code: MIT, copyright (c) 2026 Jarren Rocks.
- AgentCity modifications: attributed separately to Adrian Martin.
- Bundled KayKit artwork: CC0, provenance retained.
- Material Design Icons: upstream Pictogrammers notice and Apache 2.0 text retained.
- three.js: MIT licence retained.
- Electron/Chromium: generated licence files included by Electron packaging.
- Root `LICENSE`, `NOTICE.md`, `PRIVACY.md`, `THIRD_PARTY_NOTICES.md`, and `licenses/` are explicitly
  included in packaged application files.
- Product UI identifies AgentCity as an independent fork and disclaims third-party endorsement.

This review is a practical engineering and open-source compliance assessment, not legal advice.
The product name and planned domain still require an appropriate trademark/name clearance before
a commercial launch.

## Privacy and security

- Internal HTTP service binds to `127.0.0.1` on an OS-assigned free port.
- Host and Origin validation remain enabled.
- Electron uses context isolation, no renderer Node integration, and Chromium sandboxing.
- Navigation and new windows are restricted; ordinary web links go to the system browser.
- Agent session sources are read-only; only AgentCity state is written.
- No telemetry, analytics, cloud sync, advertising, or external application server is present.
- Packaged-file allow-list excludes local colony data, tests, transcripts, credentials, and
  machine configuration.
- `.env` variants are ignored to reduce accidental secret disclosure.
- Signed builds fail closed and verify both application and installer signatures plus timestamps.
- Electron was upgraded to 44.3.0 after the dependency audit identified high-severity issues in
  the previous 38.x runtime; the post-upgrade audit reports no known npm vulnerabilities.
- Electron Builder is on the latest stable 26.x line with modern Windows and NSIS toolsets; the
  prerelease 27.x line is intentionally not used for a public build.

## Distribution channels

### Microsoft Store

The `desktop:store` build produces an AppX package accepted by Microsoft Store tooling. It requires
the exact identity name, publisher ID, and publisher display name assigned in Partner Center. The
Store route is the recommended public channel because Microsoft certifies, re-signs, hosts, and
updates the package. The build discovers an installed Windows SDK and uses Microsoft's local
`makeappx`, `makepri`, and `signtool` tools, avoiding dependence on a legacy cross-platform archive.
The manifest supports Windows 10 version 1809 or later and records Windows 11 24H2 as the highest
public release tested.

### Direct download

The NSIS installer remains useful for GitHub and the future product website. A public direct
download must be generated with `desktop:installer:signed`, scanned, verified on a clean system,
and published with its SHA-256 digest. A valid signature reduces risk and establishes publisher
identity but does not guarantee immediate SmartScreen reputation.

## Release gates

- [x] Fork provenance and upstream state recorded.
- [x] Original MIT licence retained.
- [x] Third-party notices and artwork provenance recorded.
- [x] Privacy notice created.
- [x] Security reporting process documented.
- [x] Product metadata points to the AgentCity fork.
- [x] Local data and credentials excluded from packaging.
- [x] Fail-closed direct-download signing path prepared.
- [x] Store packaging path prepared without embedded credentials.
- [ ] Publisher chooses and verifies Individual or Company Partner Center identity.
- [ ] `AgentCity` product name reserved and Store identity values supplied to the build.
- [ ] Product/domain trademark and naming check completed.
- [ ] Final AppX package built and inspected with the assigned Store identity.
- [ ] Windows App Certification Kit passes on the exact final package.
- [ ] Fresh Windows account install, update, offline operation, harness discovery, and uninstall
  pass using the exact final artifact.
- [ ] Store listing, screenshots, age rating, support details, and privacy URL completed.
- [ ] Microsoft certification completed.
- [ ] Website download button points to the certified Store listing.
- [ ] If offered, direct installer is validly signed, timestamped, scanned, and hashed.

## User-owned actions required to finish

1. Decide whether the public publisher is Adrian Martin personally or a registered company. This
   determines the Partner Center account type and displayed publisher.
2. Open and verify the Partner Center developer account.
3. Reserve `AgentCity`; provide the three non-secret Store identity values to the build environment.
4. Choose the final domain and perform a name/trademark check appropriate to the intended markets.
5. Supply a public support route and host `PRIVACY.md` at a stable HTTPS URL.
6. Approve screenshots, description, category, age rating, countries, pricing, and publication.
7. For a GitHub/website EXE, provision trusted code-signing credentials in a secret store. Never
   send the private key or client secret through an issue, commit, website form, or chat.

The publisher-facing sequence is also available in Spanish in `PUBLISHING_HANDOFF.md`.
