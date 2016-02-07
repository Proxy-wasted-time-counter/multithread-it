import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import task from './lib/task';
import build from './build';
import serve from './serve';
import webpackConfig from './webpack.config';

global.WATCH = !process.argv.includes('release');
const bundler = webpack(webpackConfig);

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
export default async () => {
  await build();
  await serve();

  browserSync({
    // https: true,
    proxy: {

      target: 'localhost:5000/',

      middleware: [
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: webpackConfig.output.publicPath,

          // Pretty colored output
          stats: webpackConfig.stats,

          // For other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler),
      ],
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'build/**/*.css',
      'build/**/*.html',
    ],
  });
};
