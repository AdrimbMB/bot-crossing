import { app, BrowserWindow, shell } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { desktopDataDir, migrateLegacyState } from './data-paths.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
let mainWindow = null
let localServer = null

function legacyStateCandidates() {
  return [
    path.join(process.cwd(), 'data', 'colony.json'),
    path.join(app.getAppPath(), 'data', 'colony.json'),
    path.join(path.dirname(process.execPath), 'data', 'colony.json'),
  ]
}

async function createWindow() {
  const dataDir = desktopDataDir(app.getPath('userData'))
  await migrateLegacyState(dataDir, legacyStateCandidates())
  process.env.BOT_CROSSING_DATA = dataDir

  // Import after setting the data boundary: api.mjs reads it during module initialisation.
  const { startServer } = await import('../server/serve.mjs')
  const started = await startServer({ host: '127.0.0.1', port: 0 })
  localServer = started.server

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 960,
    minHeight: 640,
    backgroundColor: '#071224',
    icon: path.join(here, '..', 'build', 'icon.png'),
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') || url.startsWith('http://')) void shell.openExternal(url)
    return { action: 'deny' }
  })
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(started.url)) event.preventDefault()
  })
  mainWindow.once('ready-to-show', () => mainWindow?.show())
  mainWindow.on('closed', () => { mainWindow = null })
  await mainWindow.loadURL(started.url)
}

app.on('window-all-closed', () => app.quit())
app.on('before-quit', () => localServer?.close())
app.whenReady().then(createWindow).catch((error) => {
  console.error(error)
  app.quit()
})
