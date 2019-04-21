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
            /**
             * Setup NPM - components.
             */
            const components = templates[index].components === undefined ? [] : templates[index].components

            for (let i = 0;i < components.length;i++) {
                // get component type
                let types = components[i].type

                for (let a = 0;a < types.length;a++) {
                    // define component path
                    const path = config.templates.components.path + '/' + components[i].name + '/' + types[a]

                    // get module package
                    const package = require('./' + path + '/package.js')

                    // add NPM
                    let npm = package.npm === undefined ? [] : package.npm
                    for (let j = 0;j < npm.length;j++) {
                        if (NPM_list.indexOf(npm[j]) === -1) {
                            NPM_list.push(npm[j])
                        }
                    }

                    /**
                     * Setup NPM - component helpers.
                     */
                    const helpers = package.helpers === undefined ? [] : package.helpers

                    for (let j = 0;j < helpers.length;j++) {
                        // define helper path
                        const helperPath = config.templates.helpers.path + '/' + helpers[j].name + '/' + helpers[j].type

                        // get helper package
                        const helperPackage = require('./' + helperPath + '/package.js')

                        // get helper npm
                        let helperNPM = helperPackage.npm
                        for (let k = 0;k < helperNPM.length;k++) {
                            if (NPM_list.indexOf(helperNPM[k]) === -1) {
                                NPM_list.push(helperNPM[k])
                            }
                        }
                    }
                }
            }

            /**
             * Setup NPM - modules.
             */
            const modules = templates[index].modules === undefined ? [] : templates[index].modules

            for (let i = 0;i < modules.length;i++) {
                // define module path
                const path = config.templates.modules.path + '/' + modules[i].name + '/' + modules[i].type

                // get module package
                const package = require('./' + path + '/package.js')

                // add NPM
                let npm = package.npm === undefined ? [] : package.npm
                for (let j = 0;j < npm.length;j++) {
                    if (NPM_list.indexOf(npm[j]) === -1) {
                        NPM_list.push(npm[j])
                    }
                }

                /**
                 * Setup NPM - helpers.
                 */
                const helpers = package.helpers === undefined ? [] : package.helpers

                for (let j = 0;j < helpers.length;j++) {
                    // define helper path
                    const helperPath = config.templates.helpers.path + '/' + helpers[j].name + '/' + helpers[j].type

                    // get helper package
                    const helperPackage = require('./' + helperPath + '/package.js')

                    // get helper npm
                    let helperNPM = helperPackage.npm === undefined ? [] : helperPackage.npm
                    for (let k = 0;k < helperNPM.length;k++) {
                        if (NPM_list.indexOf(helperNPM[k]) === -1) {
                            NPM_list.push(helperNPM[k])
                        }
                    }
                }

                /**
                 * Setup NPM - components.
                 */
                let subcomponents = package.components
                if (modules[i].components !== undefined) {
                    subcomponents = modules[i].components
                }
                for (let j = 0;j < subcomponents.length;j++) {
                    // define component path
                    const subpath = config.templates.components.path + '/' + subcomponents[j].name + '/' + subcomponents[j].type

                    // get component package
                    const subpackage = require('./' + subpath + '/package.js')

                    // add NPM
                    npm = subpackage.npm === undefined ? [] : subpackage.npm
                    for (let j = 0;j < npm.length;j++) {
                        if (NPM_list.indexOf(npm[j]) === -1) {
                            NPM_list.push(npm[j])
                        }
                    }

                    /**
                     * Setup NPM - component helpers.
                     */
                    const helpers = subpackage.helpers === undefined ? [] : subpackage.helpers

                    for (let k = 0;k < helpers.length;k++) {
                        // define helper path
                        const helperPath = config.templates.helpers.path + '/' + helpers[k].name + '/' + helpers[k].type

                        // get helper package
                        const helperPackage = require('./' + helperPath + '/package.js')

                        // get helper npm
                        let helperNPM = helperPackage.npm === undefined ? [] : helperPackage.npm
                        for (let l = 0;l < helperNPM.length;l++) {
                            if (NPM_list.indexOf(helperNPM[l]) === -1) {
                                NPM_list.push(helperNPM[l])
                            }
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
        let core = client.core
        if (templates[template].core !== undefined) {
            core = templates[template].core
        }

        // create SCSS object
        let SCSS = config.compiler.core.scss
        if (core !== undefined && core.scss !== undefined) {
            SCSS = core.scss
        }

        // create SCSS assets object
        let SCSS_assets = []
        let SCSS_NPM = []
        let SCSS_helpers = []

        // create JS object
        let JS = config.compiler.core.js
        if (core !== undefined && core.js !== undefined) {
            JS = core.js
        }

        // create JS assets object
        let JS_assets = []
        let JS_NPM = []
        let JS_helpers = []

        // define components
        let components = templates[template].components === undefined ? [] : templates[template].components
        for (let i = 0;i < components.length;i++) {
            // get component type
            let types = components[i].type

            for (let a = 0;a < types.length;a++) {
                // define component path
                const subpath = config.templates.components.path + '/' + components[i].name + '/' + types[a]

                // get component package
                const subpackage = require('./' + subpath + '/package.js')

                // 03.1. setup component npm - SCSS
                let npms = subpackage.styles.npm === undefined ? [] : subpackage.styles.npm
                for (let j = 0;j < npms.length;j++) {
                    if (SCSS_NPM.indexOf(npms[j]) === -1) {
                        SCSS_NPM.push(npms[j])
                    }
                }

                // 03.1. setup component npm - JS
                npms = subpackage.scripts.npm === undefined ? [] : subpackage.scripts.npm
                for (let j = 0;j < npms.length;j++) {
                    if (JS_NPM.indexOf(npms[j]) === -1) {
                        JS_NPM.push(npms[j])
                    }
                }

                // 03.2. setup component helpers
                let helpers = subpackage.helpers === undefined ? [] : subpackage.helpers
                for (let j = 0;j < helpers.length;j++) {
                    // define helper path
                    const helperPath = config.templates.helpers.path + '/' + helpers[j].name + '/' + helpers[j].type

                    // define helper package
                    const helperPackage = require('./' + helperPath + '/package.js')

                    // define helper npm - styles
                    let styles = helperPackage.styles.npm === undefined ? [] : helperPackage.styles.npm
                    for (let k = 0;k < styles.length;k++) {
                        if (SCSS_NPM.indexOf(styles[k]) === -1) {
                            SCSS_NPM.push(styles[k])
                        }
                    }

                    // define helper main - styles
                    styles = helperPackage.styles.main === undefined ? [] : helperPackage.styles.main
                    for (let k = 0;k < styles.length;k++) {
                        const helperStylePath = helperPath + '/scss/' + styles[k]
                        if (SCSS_helpers.indexOf(helperStylePath) === -1) {
                            SCSS_helpers.push(helperStylePath)
                        }
                    }

                    // define helper npm - scripts
                    let scripts = helperPackage.scripts.npm === undefined ? [] : helperPackage.scripts.npm
                    for (let k = 0;k < scripts.length;k++) {
                        if (JS_NPM.indexOf(scripts[k]) === -1) {
                            JS_NPM.push(scripts[k])
                        }
                    }

                    // define helper main - scripts
                    scripts = helperPackage.scripts.main === undefined ? [] : helperPackage.scripts.main
                    for (let k = 0;k < scripts.length;k++) {
                        const helperScriptPath = helperPath + '/js/' + scripts[k]
                        if (JS_helpers.indexOf(helperScriptPath) === -1) {
                            JS_helpers.push(helperScriptPath)
                        }
                    }
                }

                // 04. setup component assets - SCSS
                let assets = subpackage.styles.main === undefined ? [] : subpackage.styles.main
                for (let j = 0;j < assets.length;j++) {
                    // define asset path
                    const assetPath = subpath + '/scss/' + assets[j]
                    if (SCSS_assets.indexOf(assetPath) === -1) {
                        SCSS_assets.push(assetPath)
                    }
                }

                // 04. setup component assets - JS
                assets = subpackage.scripts.main === undefined ? [] : subpackage.scripts.main
                for (let j = 0;j < assets.length;j++) {
                    // define asset path
                    const assetPath = subpath + '/js/' + assets[j]
                    if (JS_assets.indexOf(assetPath) === -1) {
                        JS_assets.push(assetPath)
                    }
                }
            }
        }

        // define modules
        const modules = templates[template].modules === undefined ? [] : templates[template].modules
        for (let index = 0;index < modules.length;index++) {
            // define each module path
            const path = config.templates.modules.path + '/' + modules[index].name + '/' + modules[index].type

            // get module package
            const package = require('./' + path + '/package.js')

            // 01. setup npm - SCSS
            let npms = package.styles.npm === undefined ? [] : package.styles.npm
            for (let i = 0;i < npms.length;i++) {
                if (SCSS_NPM.indexOf(npms[i]) === -1) {
                    SCSS_NPM.push(npms[i])
                }
            }

            // 01. setup npm - JS
            npms = package.scripts.npm === undefined ? [] : package.scripts.npm
            for (let i = 0;i < npms.length;i++) {
                if (JS_NPM.indexOf(npms[i]) === -1) {
                    JS_NPM.push(npms[i])
                }
            }

            // 02. setup helpers
            let helpers = package.helpers === undefined ? [] : package.helpers
            for (let i = 0;i < helpers.length;i++) {
                // define helper path
                const helper = config.templates.helpers.path + '/' + helpers[i].name + '/' + helpers[i].type

                for (let j = 0;j < helpers.length;j++) {
                    // define helper path
                    const helperPath = config.templates.helpers.path + '/' + helpers[j].name + '/' + helpers[j].type

                    // define helper package
                    const helperPackage = require('./' + helperPath + '/package.js')

                    // define helper npm - styles
                    let styles = helperPackage.styles.npm === undefined ? [] : helperPackage.styles.npm
                    for (let k = 0;k < styles.length;k++) {
                        if (SCSS_NPM.indexOf(styles[k]) === -1) {
                            SCSS_NPM.push(styles[k])
                        }
                    }

                    // define helper main - styles
                    styles = helperPackage.styles.main === undefined ? [] : helperPackage.styles.main
                    for (let k = 0;k < styles.length;k++) {
                        const helperStylePath = helperPath + '/scss/' + styles[k]
                        if (SCSS_helpers.indexOf(helperStylePath) === -1) {
                            SCSS_helpers.push(helperStylePath)
                        }
                    }

                    // define helper npm - scripts
                    let scripts = helperPackage.scripts.npm === undefined ? [] : helperPackage.scripts.npm
                    for (let k = 0;k < scripts.length;k++) {
                        if (JS_NPM.indexOf(scripts[k]) === -1) {
                            JS_NPM.push(scripts[k])
                        }
                    }

                    // define helper main - scripts
                    scripts = helperPackage.scripts.main === undefined ? [] : helperPackage.scripts.main
                    for (let k = 0;k < scripts.length;k++) {
                        const helperScriptPath = helperPath + '/js/' + scripts[k]
                        if (JS_helpers.indexOf(helperScriptPath) === -1) {
                            JS_helpers.push(helperScriptPath)
                        }
                    }
                }
            }

            // 03. setup components
            let components = []
            if (modules[index].components !== undefined) {
                components = modules[index].components
            } else {
                components = package.components
            }
            // components = components.concat(templates[template].components)
            for (let i = 0;i < components.length;i++) {
                 // get component type
                let types = components[i].type

                for (let a = 0;a < types.length;a++) {
                    // define component path
                    const subpath = config.templates.components.path + '/' + components[i].name + '/' + types[a]

                    // get component package
                    const subpackage = require('./' + subpath + '/package.js')

                    // 03.1. setup component npm - SCSS
                    let npms = subpackage.styles.npm === undefined ? [] : subpackage.styles.npm
                    for (let j = 0;j < npms.length;j++) {
                        if (SCSS_NPM.indexOf(npms[j]) === -1) {
                            SCSS_NPM.push(npms[j])
                        }
                    }

                    // 03.1. setup component npm - JS
                    npms = subpackage.scripts.npm === undefined ? [] : subpackage.scripts.npm
                    for (let j = 0;j < npms.length;j++) {
                        if (JS_NPM.indexOf(npms[j]) === -1) {
                            JS_NPM.push(npms[j])
                        }
                    }

                    // 03.2. setup component helpers
                    let helpers = subpackage.helpers === undefined ? [] : subpackage.helpers
                    for (let j = 0;j < helpers.length;j++) {
                        // define helper path
                        const helperPath = config.templates.helpers.path + '/' + helpers[j].name + '/' + helpers[j].type
    
                        // define helper package
                        const helperPackage = require('./' + helperPath + '/package.js')
    
                        // define helper npm - styles
                        let styles = helperPackage.styles.npm === undefined ? [] : helperPackage.styles.npm
                        for (let k = 0;k < styles.length;k++) {
                            if (SCSS_NPM.indexOf(styles[k]) === -1) {
                                SCSS_NPM.push(styles[k])
                            }
                        }
    
                        // define helper main - styles
                        styles = helperPackage.styles.main === undefined ? [] : helperPackage.styles.main
                        for (let k = 0;k < styles.length;k++) {
                            const helperStylePath = helperPath + '/scss/' + styles[k]
                            if (SCSS_helpers.indexOf(helperStylePath) === -1) {
                                SCSS_helpers.push(helperStylePath)
                            }
                        }
    
                        // define helper npm - scripts
                        let scripts = helperPackage.scripts.npm === undefined ? [] : helperPackage.scripts.npm
                        for (let k = 0;k < scripts.length;k++) {
                            if (JS_NPM.indexOf(scripts[k]) === -1) {
                                JS_NPM.push(scripts[k])
                            }
                        }
    
                        // define helper main - scripts
                        scripts = helperPackage.scripts.main === undefined ? [] : helperPackage.scripts.main
                        for (let k = 0;k < scripts.length;k++) {
                            const helperScriptPath = helperPath + '/js/' + scripts[k]
                            if (JS_helpers.indexOf(helperScriptPath) === -1) {
                                JS_helpers.push(helperScriptPath)
                            }
                        }
                    }

                    // 04. setup component assets - SCSS
                    let assets = subpackage.styles.main === undefined ? [] : subpackage.styles.main
                    for (let j = 0;j < assets.length;j++) {
                        // define asset path
                        const assetPath = subpath + '/scss/' + assets[j]
                        if (SCSS_assets.indexOf(assetPath) === -1) {
                            SCSS_assets.push(assetPath)
                        }
                    }

                    // 04. setup component assets - JS
                    assets = subpackage.scripts.main === undefined ? [] : subpackage.scripts.main
                    for (let j = 0;j < assets.length;j++) {
                        // define asset path
                        const assetPath = subpath + '/js/' + assets[j]
                        if (JS_assets.indexOf(assetPath) === -1) {
                            JS_assets.push(assetPath)
                        }
                    }
                }
            }

            // 04. setup assets - SCSS
            let assets = package.styles.main === undefined ? [] : package.styles.main
            for (let i = 0;i < assets.length;i++) {
                SCSS_assets.push(path + '/scss/' + assets[i])
            }

            // 04. setup assets - JS
            assets = package.scripts.main === undefined ? [] : package.scripts.main
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
                    src: SCSS_NPM.concat(SCSS, SCSS_helpers, SCSS_assets),
                    dest: compiled + '/scss/' + template + '.scss'
                },
                js: {
                    src: JS_NPM.concat(JS, JS_helpers, JS_assets),
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