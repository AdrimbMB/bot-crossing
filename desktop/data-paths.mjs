import fsp from 'node:fs/promises'
import path from 'node:path'

export function desktopDataDir(userDataDir) {
  return path.join(userDataDir, 'data')
}

/** Copy legacy state once; an existing desktop state always wins. */
export async function migrateLegacyState(dataDir, candidates) {
  const target = path.join(dataDir, 'colony.json')
  if (await exists(target)) return { migrated: false, target }

  for (const candidate of candidates) {
    if (!candidate || path.resolve(candidate) === path.resolve(target)) continue
    if (!(await exists(candidate))) continue
    await fsp.mkdir(dataDir, { recursive: true })
    await fsp.copyFile(candidate, target)
    return { migrated: true, source: candidate, target }
  }

  await fsp.mkdir(dataDir, { recursive: true })
  return { migrated: false, target }
}

async function exists(file) {
  return fsp.access(file).then(() => true, () => false)
}
