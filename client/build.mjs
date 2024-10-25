import { Parcel } from '@parcel/core'
import dotenv from 'dotenv'

dotenv.config()
const { AUTH_SERVER_URL, AUTH_SERVER_PORT } = process.env
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

await bundler.watch()
