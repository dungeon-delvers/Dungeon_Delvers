import { Parcel } from '@parcel/core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

console.log(process.env);

const { AUTH_URL, AUTH_PORT } = process.env;
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
    AUTH_URL,
    AUTH_PORT,
  },
});

try {
  let { bundleGraph, buildTime } = await bundler.run();
  let bundles = bundleGraph.getBundles();
  console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
} catch (err) {
  console.log(err.diagnostics);
}

process.argv.includes('--watch') && (await bundler.watch());
