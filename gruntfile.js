/**
 * Setup engine using Grunt.
 * @author Fachri Riyanto
 * @version 1.0.0
 */
module.exports = (grunt) => {

    /**
     * Install NPM modules.
     * @since 1.0.0
     */
    grunt.registerTask('install-npm', 'Install NPM modules.', (ID) => {
        if (ID === undefined) return

        // get client config
        const client = require('./settings/clients/' + ID)

        // get main config
        const config = require('./settings/config')

        // define templates
        const templates = client.templates

        // create NPM list object
        let NPM_list = []

        // loop templates
        for (let index in templates) {

            // setup NPM - modules
            const modules = templates[index].modules
            for (let i = 0;i < modules.length;i++) {
                // define module path
                const path = config.templates.modules.path + '/' + modules[i].name + '/' + modules[i].type

                // get module package
                const package = require('./' + path + '/package.js')

                // add dependencies
                let dependencies = package.dependencies
                for (let j = 0;j < dependencies.length;j++) {
                    if (NPM_list.indexOf(dependencies[j]) === -1) {
                        NPM_list.push(dependencies[j])
                    }
                }

                // setup components
                let components = []
                if (modules[i].components !== undefined) {
                    components = modules[i].components
                } else {
                    components = package.components
                }
                components = components.concat(templates[index].components)
                for (let j = 0;j < components.length;j++) {
                    // define component path
                    const subpath = config.templates.components.path + '/' + components[j].name + '/' + components[j].type

                    // get component package
                    const subpackage = require('./' + subpath + '/package.js')

                    // add dependencies
                    dependencies = subpackage.dependencies
                    for (let j = 0;j < dependencies.length;j++) {
                        if (NPM_list.indexOf(dependencies[j]) === -1) {
                            NPM_list.push(dependencies[j])
                        }
                    }
                }
            }
        }

        // validate NPM list
        if (NPM_list.length === 0) {
            console.log('No NPM module to install.')
            return
        }

        // load module
        grunt.loadNpmTasks('grunt-exec')

        // setup config
        grunt.initConfig({
            exec: {
                npm: {
                    cmd: 'npm i --no-save ' + NPM_list.join(' ')
                }
            }
        })

        // run task
        grunt.task.run('exec')
    })

    /**
     * Compile template scripts.
     * @param {String} ID Client ID.
     * @param {String} template Template name.
     * @since 1.0.0
     */
    grunt.registerTask('compile-template', 'Compile template scripts.', (ID, template) => {
        if (ID === undefined) return

        // get client config
        const client = require('./settings/clients/' + ID)

        // get main config
        const config = require('./settings/config')

        // define templates
        const templates = client.templates

        // get core
        const core = templates[template].core

        // create SCSS object
        let SCSS = config.compiler.core.scss
        if (core !== undefined && core.scss !== undefined) {
            SCSS = core.scss
        }

        // create SCSS assets object
        let SCSS_assets = []
        let SCSS_plugins = []
        let SCSS_helpers = []

        // create JS object
        let JS = config.compiler.core.js
        if (core !== undefined && core.js !== undefined) {
            JS = core.js
        }

        // create JS assets object
        let JS_assets = []
        let JS_plugins = []
        let JS_helpers = []

        // define modules
        const modules = templates[template].modules
        for (let index = 0;index < modules.length;index++) {
            // define each module path
            const path = config.templates.modules.path + '/' + modules[index].name + '/' + modules[index].type

            // get module package
            const package = require('./' + path + '/package.js')

            // 01. setup plugins - SCSS
            let plugins = package.styles.plugins
            for (let i = 0;i < plugins.length;i++) {
                if (SCSS_plugins.indexOf(plugins[i]) === -1) {
                    SCSS_plugins.push(plugins[i])
                }
            }

            // 01. setup plugins - JS
            plugins = package.scripts.plugins
            for (let i = 0;i < plugins.length;i++) {
                if (JS_plugins.indexOf(plugins[i]) === -1) {
                    JS_plugins.push(plugins[i])
                }
            }

            // 02. setup helpers - SCSS
            let helpers = package.styles.helpers
            for (let i = 0;i < helpers.length;i++) {
                // define helper path
                const helper = config.templates.helpers.path + '/' + helpers[i].name + '/' + helpers[i].type + '/style.scss'
                if (SCSS_helpers.indexOf(helper) === -1) {
                    SCSS_helpers.push(helper)
                }
            }

            // 02. setup helpers - JS
            helpers = package.scripts.helpers
            for (let i = 0;i < helpers.length;i++) {
                // define helper path
                const helper = config.templates.helpers.path + '/' + helpers[i].name + '/' + helpers[i].type + '/script.js'
                if (JS_helpers.indexOf(helper) === -1) {
                    JS_helpers.push(helper)
                }
            }

            // 03. setup components
            let components = []
            if (modules[index].components !== undefined) {
                components = modules[index].components
            } else {
                components = package.components
            }
            components = components.concat(templates[template].components)
            for (let i = 0;i < components.length;i++) {
                // define component path
                const subpath = config.templates.components.path + '/' + components[i].name + '/' + components[i].type

                // get component package
                const subpackage = require('./' + subpath + '/package.js')

                // 03.1. setup component plugins - SCSS
                plugins = subpackage.styles.plugins
                for (let j = 0;j < plugins.length;j++) {
                    if (SCSS_plugins.indexOf(plugins[j]) === -1) {
                        SCSS_plugins.push(plugins[j])
                    }
                }

                // 03.1. setup component plugins - JS
                plugins = subpackage.scripts.plugins
                for (let j = 0;j < plugins.length;j++) {
                    if (JS_plugins.indexOf(plugins[j]) === -1) {
                        JS_plugins.push(plugins[j])
                    }
                }

                // 03.2. setup component helpers - SCSS
                helpers = subpackage.styles.helpers
                for (let j = 0;j < helpers.length;j++) {
                    // define helper path
                    const helperPath = config.templates.helpers.path + '/' + helpers[j].name + '/' + helpers[j].type + '/style.scss'
                    if (SCSS_helpers.indexOf(helperPath) === -1) {
                        SCSS_helpers.push(helperPath)
                    }
                }

                // 03.2. setup component helpers - JS
                helpers = subpackage.scripts.helpers
                for (let j = 0;j < helpers.length;j++) {
                    // define helper path
                    const helperPath = config.templates.helpers.path + '/' + helpers[j].name + '/' + helpers[j].type + '/script.js'
                    if (JS_helpers.indexOf(helperPath) === -1) {
                        JS_helpers.push(helperPath)
                    }
                }

                // 04. setup component assets - SCSS
                let assets = subpackage.styles.main
                for (let j = 0;j < assets.length;j++) {
                    // define asset path
                    const assetPath = subpath + '/scss/' + assets[j]
                    if (SCSS_assets.indexOf(assetPath) === -1) {
                        SCSS_assets.push(assetPath)
                    }
                }

                // 04. setup component assets - JS
                assets = subpackage.scripts.main
                for (let j = 0;j < assets.length;j++) {
                    // define asset path
                    const assetPath = subpath + '/js/' + assets[j]
                    if (JS_assets.indexOf(assetPath) === -1) {
                        JS_assets.push(assetPath)
                    }
                }
            }

            // 04. setup assets - SCSS
            let assets = package.styles.main
            for (let i = 0;i < assets.length;i++) {
                SCSS_assets.push(path + '/scss/' + assets[i])
            }

            // 04. setup assets - JS
            assets = package.scripts.main
            for (let i = 0;i < assets.length;i++) {
                JS_assets.push(path + '/js/' + assets[i])
            }
        }

        // define compiled destination
        const compiled = config.compiler.path.compiled + '/' + ID

        // define destination
        const destination = config.compiler.path.assets + '/' + ID

        // load modules
        grunt.loadNpmTasks('grunt-contrib-concat')
        grunt.loadNpmTasks('grunt-contrib-uglify')
        grunt.loadNpmTasks('grunt-contrib-sass')
        grunt.loadNpmTasks('grunt-contrib-cssmin')

        // setup grunt config
        grunt.initConfig({
            concat: {
                scss: {
                    src: SCSS_plugins.concat(SCSS, SCSS_helpers, SCSS_assets),
                    dest: compiled + '/scss/' + template + '.scss'
                },
                js: {
                    src: JS_plugins.concat(JS, JS_helpers, JS_assets),
                    dest: compiled + '/js/' + template + '.js'
                }
            },
            sass: {
                main: {
                    files: [{
                        expand: true,
                        cwd: compiled + '/scss',
                        src: template + '.scss',
                        dest: destination + '/css',
                        ext: '.css'
                    }]
                }
            },
            cssmin: {
                options: {
                    level: { 1: { specialComments: 0 } }
                },
                main: {
                    files: [{
                        expand: true,
                        cwd: destination + '/css',
                        src: template + '.css',
                        dest: destination + '/css',
                        ext: '.css'
                    }]
                }
            },
            uglify: {
                main: {
                    files: [{
                        expand: true,
                        cwd: compiled + '/js',
                        src: template + '.js',
                        dest: destination + '/js'
                    }]
                }
            }
        })

        // run task
        grunt.task.run([
            'concat', 'sass', 'cssmin', 'uglify'
        ])
    })

    /**
     * Install client template.
     * @param {String} ID Client ID.
     * @since 1.0.0
     */
    grunt.registerTask('install-client', 'Install client templates.', (ID) => {
        if (ID === undefined) return

        // get client config
        const client = require('./settings/clients/' + ID)

        // define templates
        const templates = client.templates

        // loop templates
        for (let index in templates) {

            // run task
            grunt.task.run('compile-template:' + ID + ':' + index)
        }
    })

    /**
     * Install client.
     * @since 1.0.0
     */
    grunt.registerTask('install', 'Install client.', (ID) => {
        if (ID === undefined) return

        // create task list
        grunt.task.run(['install-npm:' + ID, 'install-client:' + ID])
    })
}