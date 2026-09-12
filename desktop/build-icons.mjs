import fsp from 'node:fs/promises'
import pngToIco from 'png-to-ico'

const source = new URL('../build/icon.png', import.meta.url)
const destination = new URL('../build/icon.ico', import.meta.url)
await fsp.writeFile(destination, await pngToIco(source))
console.log('Created build/icon.ico from build/icon.png')
