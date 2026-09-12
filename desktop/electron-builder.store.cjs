const packageJson = require('../package.json')
const { configureWindowsSdk } = require('./windows-sdk.cjs')

configureWindowsSdk({ required: true })

function required(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Microsoft Store packaging requires the ${name} environment variable.`)
  }
  return value
}

const config = structuredClone(packageJson.build)
config.artifactName = 'AgentCity-Store-${version}-${arch}.${ext}'
config.win.target = 'appx'

config.appx = {
  identityName: required('AGENTCITY_STORE_IDENTITY_NAME'),
  publisher: required('AGENTCITY_STORE_PUBLISHER'),
  publisherDisplayName: required('AGENTCITY_STORE_PUBLISHER_DISPLAY_NAME'),
  applicationId: 'AgentCity',
  displayName: 'AgentCity',
  backgroundColor: '#071224',
  languages: ['es-ES', 'en-US'],
  minVersion: '10.0.17763.0',
  maxVersionTested: '10.0.26100.0',
  showNameOnTiles: true,
  artifactName: 'AgentCity-Store-${version}-${arch}.${ext}',
}

module.exports = config
