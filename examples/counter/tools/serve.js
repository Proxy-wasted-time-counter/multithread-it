import path from 'path';
import task from './lib/task';
import express from 'express';

/**
 * Launches Node.js/Express web server in a separate (forked) process.
 */
export default task('serve', () => new Promise((resolve) => {
  const server = global.server = express();

  server.set('port', (process.env.PORT || 5000));
  console.log('express serve ', path.join(__dirname, '../build'));
  server.use(express.static(path.join(__dirname, '../build')));

  //
  // Launch the server
  // -----------------------------------------------------------------------------
  server.listen(server.get('port'), () => {
    /* eslint-disable no-console */
    console.log(`The server is running at http://localhost:${server.get('port')}`);
    if (process.send) {
      process.send('online');
    }

    resolve();
  });
}));
