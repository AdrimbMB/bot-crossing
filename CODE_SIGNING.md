# Windows signing and SmartScreen

## What can and cannot be guaranteed

Authenticode signing proves who published AgentCity and that the downloaded files have not been
modified. It also lets Microsoft Defender SmartScreen accumulate publisher reputation across
releases. A new, correctly signed download can still be described as an unrecognized app while
that reputation develops. EV certificates no longer bypass this process.

For public users, Microsoft Store distribution is the only supported route that consistently
avoids SmartScreen download warnings: Store packages are signed by Microsoft. Direct GitHub
downloads should still be signed, but must not be advertised as unconditionally warning-free.
See Microsoft's current [SmartScreen reputation guidance](https://learn.microsoft.com/windows/apps/package-and-deploy/smartscreen-reputation)
and [Windows code-signing options](https://learn.microsoft.com/windows/apps/package-and-deploy/code-signing-options).

## Signed direct-download build

`npm run desktop:installer:signed` is deliberately separate from the unsigned local packaging
command. It enables executable signing, requires a trusted identity, builds the NSIS installer,
and then checks that both the packaged app and installer have a valid Authenticode signature and
trusted timestamp. The command fails rather than silently publishing an unsigned artifact.

Never commit a certificate, private key, password, Azure client secret, or their Base64 contents.
Provide credentials only through a protected local environment or CI secret store.

### Microsoft Artifact Signing

Create and validate a Public Trust signing account and certificate profile, grant the build
identity the Certificate Profile Signer role, and provide:

- `AGENTCITY_AZURE_SIGNING_ENDPOINT`
- `AGENTCITY_AZURE_SIGNING_ACCOUNT`
- `AGENTCITY_AZURE_CERTIFICATE_PROFILE`
- `AGENTCITY_WINDOWS_PUBLISHER` (exact certificate subject/CN)
- `AZURE_TENANT_ID`
- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`

The build uses SHA-256 plus an RFC 3161 timestamp. Keep the same verified publisher identity for
future releases so reputation can accumulate. Follow the Microsoft
[Artifact Signing documentation](https://learn.microsoft.com/azure/artifact-signing/).

### CA-issued certificate file

If the chosen provider supplies an exportable PKCS#12 certificate, provide:

- `WIN_CSC_LINK` (protected `.pfx`/`.p12` path or Base64 value)
- `WIN_CSC_KEY_PASSWORD`

Modern public certificates commonly keep keys in a hardware or cloud HSM. In that case, use the
provider's signing integration rather than exporting or copying the private key.

## Microsoft Store route

To offer an installation without a SmartScreen download warning, create a Partner Center account,
complete publisher identity verification, reserve the AgentCity product name, prepare the Store
package/listing and submit it for certification. Keep the signed GitHub installer as an alternate
download, not as the warning-free route.

After reserving the name, copy the exact, non-secret values shown in Partner Center into
`AGENTCITY_STORE_IDENTITY_NAME`, `AGENTCITY_STORE_PUBLISHER`, and
`AGENTCITY_STORE_PUBLISHER_DISPLAY_NAME`, then run `npm run desktop:store`. This generates the
Store AppX artifact without embedding Partner Center credentials. Microsoft Store accepts AppX
packages and re-signs the certified package for distribution.
