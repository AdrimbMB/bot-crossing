const path = require('node:path')
const rcedit = require('rcedit')

/** Apply Windows resources without electron-builder's cross-platform signing bundle. */
module.exports = async function afterPack(context) {
  if (context.electronPlatformName !== 'win32') return
  const executable = path.join(context.appOutDir, `${context.packager.appInfo.productFilename}.exe`)
  await rcedit(executable, {
    icon: path.join(context.packager.projectDir, 'build', 'icon.ico'),
    'file-version': context.packager.appInfo.version,
    'product-version': context.packager.appInfo.version,
    'version-string': {
      CompanyName: 'AgentCity Contributors',
      FileDescription: 'AgentCity',
      ProductName: 'AgentCity',
      LegalCopyright: 'Copyright © 2026 Jarren Rocks and AgentCity contributors (MIT)',
      OriginalFilename: 'AgentCity.exe',
    },
  })
}
