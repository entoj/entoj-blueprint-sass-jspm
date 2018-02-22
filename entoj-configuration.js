'use strict';

/**
 * Requirements
 */
const fs = require('fs');

/**
 * Local configuration
 */
let localConfiguration = {};
if (fs.existsSync(__dirname + '/entoj-configuration.local.js'))
{
    localConfiguration = require('./entoj-configuration.local.js');
}

/**
 * Application config
 */
const configuration = require('entoj-system').configure(
    {
        pathes:
        {
            root: __dirname,
            entoj: '${root}'
        },
        filters:
        {
            assetUrl: '/base/global/assets',
            svgUrl: '/base/global/assets/icons'
        },
        models:
        {
            translationsFile: '${data}/translations.json',
            settingsFile: '${data}/settings.json'
        },
        setting:
        {
            jspm:
            {
                configFilename: 'jspm-configuration.js'
        }
    }, localConfiguration);

/**
 * Add local commmands
 */
configuration.commands.add(require('./library/command/StartCommand').StartCommand);

/**
 * Add entoj- plugins
 */
const packages = JSON.parse(fs.readFileSync(__dirname + '/package.json'));
for (const pck in packages.dependencies)
{
    if (pck.startsWith('entoj-') && pck !== 'entoj-system')
    {
        configuration.register(require(pck));
    }
}

/**
 * Add environments
 */
configuration.build.environments.development =
{
    js:
    {
        bundle: false,
        sourceMaps: true,
        precompile: true,
        optimize: false,
        minify: false
    },
    sass:
    {
        sourceMaps: true,
        comments: true,
        optimize: false,
        minify: false,
        browsers:
        [
            'ie >= 11',
            'last 2 ff version',
            'last 2 chrome versions',
            'last 2 safari versions',
            'last 2 android versions',
            'last 4 ios versions',
            'last 2 explorermobile versions',
            'last 2 chromeandroid versions',
            'last 2 firefoxandroid versions'
        ]
    }
};

/**
 * Exports
 * @ignore
 */
module.exports = configuration;
