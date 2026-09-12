const fs = require('node:fs')
const path = require('node:path')

function isUsableSdkBin(directory) {
  return directory &&
    fs.existsSync(path.join(directory, 'makeappx.exe')) &&
    fs.existsSync(path.join(directory, 'makepri.exe')) &&
    fs.existsSync(path.join(directory, 'signtool.exe'))
}

function findWindowsSdkBin() {
  const explicit = process.env.AGENTCITY_WINDOWS_SDK_BIN
  if (explicit) return isUsableSdkBin(explicit) ? explicit : null

  const directCandidates = [
    process.env.WindowsSdkVerBinPath,
    process.env.WindowsSdkBinPath && path.join(process.env.WindowsSdkBinPath, 'x64'),
  ]
  for (const candidate of directCandidates) {
    if (isUsableSdkBin(candidate)) return candidate
  }

  const programFilesX86 = process.env['ProgramFiles(x86)']
  if (!programFilesX86) return null
  const root = path.join(programFilesX86, 'Windows Kits', '10', 'bin')
  if (!fs.existsSync(root)) return null

  const versions = fs.readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d+(\.\d+){3}$/.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))

  for (const version of versions) {
    const candidate = path.join(root, version, 'x64')
    if (isUsableSdkBin(candidate)) return candidate
  }
  return null
}

function configureWindowsSdk({ required = false } = {}) {
  const sdkBin = findWindowsSdkBin()
  if (!sdkBin) {
    if (required) {
      throw new Error(
        'A Windows 10/11 SDK with makeappx.exe, makepri.exe, and signtool.exe is required. ' +
        'Install the Windows SDK or set AGENTCITY_WINDOWS_SDK_BIN to its x64 bin directory.',
      )
    }
    return null
  }

  process.env.ELECTRON_BUILDER_WINDOWS_KITS_PATH ||= sdkBin
  process.env.SIGNTOOL_PATH ||= path.join(sdkBin, 'signtool.exe')
  return sdkBin
}

module.exports = { configureWindowsSdk, findWindowsSdkBin }
