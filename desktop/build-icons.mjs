import fsp from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import pngToIco from 'png-to-ico'
import sharp from 'sharp'

const source = new URL('../build/icon.png', import.meta.url)
const sourcePath = fileURLToPath(source)
const destination = new URL('../build/icon.ico', import.meta.url)
await fsp.writeFile(destination, await pngToIco(source))

const appxDirectory = new URL('../build/appx/', import.meta.url)
await fsp.mkdir(appxDirectory, { recursive: true })

const squareAssets = [
  ['StoreLogo.png', 50],
  ['Square44x44Logo.png', 44],
  ['Square150x150Logo.png', 150],
]
for (const [name, size] of squareAssets) {
  await sharp(sourcePath).resize(size, size, { fit: 'contain' }).png().toFile(fileURLToPath(new URL(name, appxDirectory)))
}

await sharp(sourcePath)
  .resize(150, 150, { fit: 'contain' })
  .extend({ left: 80, right: 80, top: 0, bottom: 0, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(fileURLToPath(new URL('Wide310x150Logo.png', appxDirectory)))

console.log('Created Windows ICO and Store assets from build/icon.png')
