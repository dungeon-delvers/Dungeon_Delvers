import { Parcel } from '@parcel/core'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

dotenv.config({ path: `${__dirname}/../.env` })
const { AUTH_SERVER_URL, AUTH_SERVER_PORT } = process.env
console.log({ AUTH_SERVER_URL, AUTH_SERVER_PORT })
let bundler = new Parcel({
  entries: './public/index.html',
  defaultConfig: '@parcel/config-default',
  defaultTargetOptions: {
    engines: {
      browsers: ['last 1 Chrome version'],
    },
  },
  serveOptions: {
    port: 3000,
  },
  hmrOptions: {
    port: 3000,
  },
  env: {
    AUTH_SERVER_URL,
    AUTH_SERVER_PORT,
    NODE_ENV: 'production',
  },
})

try {
  let { bundleGraph, buildTime } = await bundler.run()
  let bundles = bundleGraph.getBundles()
  console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`)
} catch (err) {
  console.log(err.diagnostics)
}

process.argv.includes('--watch') && (await bundler.watch())
