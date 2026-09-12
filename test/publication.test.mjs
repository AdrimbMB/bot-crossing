import assert from 'node:assert/strict'
import fsp from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

async function text(file) {
  return fsp.readFile(new URL(file, root), 'utf8')
}

test('public package metadata identifies the fork without removing upstream attribution', async () => {
  const packageJson = JSON.parse(await text('package.json'))
  assert.equal(packageJson.name, 'bot-crossing')
  assert.equal(packageJson.productName, undefined)
  assert.equal(packageJson.author.name, 'Adrian Martin')
  assert.match(packageJson.repository.url, /AdrimbMB\/bot-crossing/)
  assert.match(packageJson.copyright, /Jarren Rocks/)
  assert.match(await text('LICENSE'), /Copyright \(c\) 2026 Jarren Rocks/)
  assert.match(await text('NOTICE.md'), /independent derivative/i)
})

test('desktop allow-list carries licences, notices, and privacy into every package', async () => {
  const packageJson = JSON.parse(await text('package.json'))
  const files = new Set(packageJson.build.files)
  for (const required of [
    'LICENSE',
    'NOTICE.md',
    'PRIVACY.md',
    'THIRD_PARTY_NOTICES.md',
    'licenses/**/*',
  ]) {
    assert.ok(files.has(required), `${required} must be included in packaged releases`)
  }

  for (const requiredFile of [
    'licenses/Apache-2.0.txt',
    'licenses/Pictogrammers-LICENSE.txt',
    'licenses/three-MIT.txt',
  ]) {
    assert.ok((await fsp.stat(new URL(requiredFile, root))).isFile())
  }
})

test('privacy notice documents local transcript processing and no telemetry', async () => {
  const privacy = await text('PRIVACY.md')
  assert.match(privacy, /limited transcript content/i)
  assert.match(privacy, /no account system, advertising, analytics, telemetry/i)
  assert.match(privacy, /127\.0\.0\.1/)
})

test('Store targeting and public signing builds are explicit and fail closed', async () => {
  const storeConfig = await text('desktop/electron-builder.store.cjs')
  const signedConfig = await text('desktop/electron-builder.signed.cjs')
  assert.match(storeConfig, /minVersion: '10\.0\.17763\.0'/)
  assert.match(storeConfig, /maxVersionTested: '10\.0\.26100\.0'/)
  assert.match(storeConfig, /AGENTCITY_STORE_IDENTITY_NAME/)
  assert.match(signedConfig, /forceCodeSigning = true/)
  assert.match(signedConfig, /WIN_CSC_LINK/)
  assert.match(signedConfig, /AGENTCITY_AZURE_SIGNING_ENDPOINT/)
})
