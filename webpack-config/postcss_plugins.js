/*
* [`postcss-import`](https://github.com/postcss/postcss-import)
* [`postcss-url`](https://github.com/postcss/postcss-url)
* [`postcss-nested`](https://github.com/postcss/postcss-nested)
* [`postcss-calc`](https://github.com/postcss/postcss-calc )
* [`postcss-mixins`](https://github.com/postcss/postcss-mixins)
* [`postcss-for`](https://github.com/antyakushev/postcss-for)
* [`postcss-each`](https://github.com/outpunk/postcss-each)
* [`postcss-simple-vars`](https://github.com/postcss/postcss-simple-vars)
* [`postcss-custom-media`](https://github.com/postcss/postcss-custom-media)
* [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties)
*/

/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
const plugins = function () {
    return [
        require('postcss-import'),
        require('postcss-url')({
            url: 'rebase'
        }),
        require('postcss-mixins'),
        require('postcss-nested'),
        require('postcss-calc'),
        require('postcss-for'),
        require('postcss-each'),
        require('postcss-simple-vars')({
            silent: true
        }),
        require('postcss-custom-media'),
        require('postcss-custom-properties'),
        require('autoprefixer')({
            browsers: [
                'last 3 versions',
                'ie 10',
                'ff 24',
                'android 4.2',
                'ios >= 5'
            ]
        })
    ];
};

module.exports = plugins;
