import path from 'path';
import fs from 'fs';
import Promise from 'bluebird';
import watch from './lib/watch';
import colors from 'colors/safe';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  const ncp = Promise.promisify(require('ncp'));

  if (!fs.existsSync('./build')) {
    fs.mkdirSync('./build');
  }

  const watchedPaths = new Map([
    ['src/index.html', 'build/index.html'],
    ['src/images/', 'build/images'],
  ]);
  const promises = [];
  watchedPaths.forEach((dest, source) => {
    console.log('[COPY] : Copy %s to %s', source, dest);
    promises.push(ncp(source, dest));
  });
  await Promise.all(promises);

  if (global.WATCH) {
    const watchPattern = Array.from(watchedPaths.keys());
    console.log('[COPY] : Watch',  colors.green(watchPattern));
    const watcher = await watch(watchPattern);
    watcher.on('changed', async (file) => {
      console.log('[COPY] : File %s changed', file);
      ncp(file, `build/${path.basename(file)}`);
    });
  }
}

export default copy;
