const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
 mix.webpackConfig({
    output: {
        chunkFilename: '[name].js?id=[chunkhash]',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
        '@': __dirname + '/resources'
        }
    }
});

mix
    .js('resources/js/app.js', 'public/js')
    .sourceMaps()
    .vue();

mix
    // .sass('resources/sass/app.sass', 'public/css')
    .postCss('resources/css/app.css', 'public/css')
    .options({
        processCssUrls: false,
        postCss: [tailwindcss('./tailwind.config.js')],
    });

// mix.copyDirectory('resources/images', 'public/images');
mix.version();