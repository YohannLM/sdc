/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your application. See https://github.com/JeffreyWay/laravel-mix.
 |
 */
const mix = require('laravel-mix');
const glob = require('glob');
const { setResourceRoot, sourceMaps } = require('laravel-mix');
require('mix-tailwindcss');
/*
 |--------------------------------------------------------------------------
 | Configuration BrowserSync
 |--------------------------------------------------------------------------
 */

// Domain of your appserver service container_name
const proxyDomain =
  process.env.MIX_BS_PROXY_DOMAIN || 'appserver.d10sandbox.internal';

// The domain of node contianer throught your proxy
const domain =
  process.env.MIX_BS_DOMAIN || 'bs.d10sandbox.lndo.site';

// The port of proxy url will serve BS for
const port =
  process.env.MIX_BS_PORT || 80;

/*
 |--------------------------------------------------------------------------
 | Configuration
 |--------------------------------------------------------------------------
 */
mix
  .webpackConfig({
    // Use the jQuery shipped with Drupal to avoid conflicts.
    externals: {
      jquery: 'jQuery',
    },
  })
  .setPublicPath('../public')
  .setResourceRoot('../../public/')
  .disableNotifications();

/*

/*
 |--------------------------------------------------------------------------
 | Browsersync
 |--------------------------------------------------------------------------
 */
mix.browserSync({
  proxy: proxyDomain,
  socket: {
    domain: domain,
    port: port
  },
  files: ['../public/js/**/*.js', '../public/css/**/*.css', '../templates/**/*.twig', '../sdc_theme.theme', '../components/**/*.twig','../components/**/*.css',],
  open: false,
  logLevel: 'debug',
  logConnections: true,
});

/*
 |--------------------------------------------------------------------------
 | SASS
 |--------------------------------------------------------------------------
 */
mix
  .sass('src/scss/style.scss', 'css')
  .tailwind();

if (!mix.inProduction()) {
  mix
    .sourceMaps(true, 'source-map');
}

/*
 |--------------------------------------------------------------------------
 | JS
 |--------------------------------------------------------------------------
 */
mix
  .js('src/js/main/app.js', 'js/main')

