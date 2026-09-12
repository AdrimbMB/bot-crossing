import assert from 'node:assert/strict'
import fsp from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { desktopDataDir, migrateLegacyState } from '../desktop/data-paths.mjs'

test('desktop data lives below the per-user application directory', () => {
  assert.equal(desktopDataDir('C:\\Users\\Ada\\AppData\\AgentCity'), path.join('C:\\Users\\Ada\\AppData\\AgentCity', 'data'))
})

test('legacy colony state migrates once and never overwrites desktop state', async () => {
  const root = await fsp.mkdtemp(path.join(os.tmpdir(), 'agentcity-desktop-'))
  const legacy = path.join(root, 'legacy.json')
  const dataDir = path.join(root, 'user-data')
  await fsp.writeFile(legacy, '{"version":2,"updatedAt":1}')

  const first = await migrateLegacyState(dataDir, [legacy])
  assert.equal(first.migrated, true)
  assert.equal(await fsp.readFile(first.target, 'utf8'), '{"version":2,"updatedAt":1}')

  await fsp.writeFile(legacy, '{"version":2,"updatedAt":2}')
  const second = await migrateLegacyState(dataDir, [legacy])
  assert.equal(second.migrated, false)
  assert.equal(await fsp.readFile(second.target, 'utf8'), '{"version":2,"updatedAt":1}')
})
