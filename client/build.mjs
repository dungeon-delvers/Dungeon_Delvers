import { Parcel } from '@parcel/core';

const { AUTH_URL, AUTH_PORT, SERVER_URL, SERVER_PORT } = process.env;
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
    SERVER_URL,
    SERVER_PORT,
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
