const packageJson = require('../package.json')
const { configureWindowsSdk } = require('./windows-sdk.cjs')

configureWindowsSdk()

function required(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Signed release requires the ${name} environment variable.`)
  }
  return value
}

const config = structuredClone(packageJson.build)

// The normal local build keeps using the portable resource hook. A public build
// instead lets electron-builder edit and sign every executable, and must fail
// closed if no trusted signing identity is available.
delete config.afterPack
config.forceCodeSigning = true
config.win.signAndEditExecutable = true

const usesAzureArtifactSigning = Boolean(
  process.env.AGENTCITY_AZURE_SIGNING_ENDPOINT ||
  process.env.AGENTCITY_AZURE_SIGNING_ACCOUNT ||
  process.env.AGENTCITY_AZURE_CERTIFICATE_PROFILE ||
  process.env.AGENTCITY_WINDOWS_PUBLISHER,
)

if (usesAzureArtifactSigning) {
  config.win.azureSignOptions = {
    endpoint: required('AGENTCITY_AZURE_SIGNING_ENDPOINT'),
    codeSigningAccountName: required('AGENTCITY_AZURE_SIGNING_ACCOUNT'),
    certificateProfileName: required('AGENTCITY_AZURE_CERTIFICATE_PROFILE'),
    publisherName: required('AGENTCITY_WINDOWS_PUBLISHER'),
    fileDigest: 'SHA256',
    timestampDigest: 'SHA256',
    timestampRfc3161: 'http://timestamp.acs.microsoft.com',
  }

  required('AZURE_TENANT_ID')
  required('AZURE_CLIENT_ID')
  required('AZURE_CLIENT_SECRET')
} else {
  required('WIN_CSC_LINK')
  required('WIN_CSC_KEY_PASSWORD')
  config.win.signtoolOptions = {
    signingHashAlgorithms: ['sha256'],
    rfc3161TimeStampServer: 'http://timestamp.digicert.com',
  }
}

module.exports = config
