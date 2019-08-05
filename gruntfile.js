/**
 * Setup engine using Grunt.
 * @author Fachri Riyanto
 * @version 0.0.1
 */
module.exports = (grunt) => {

    /**
     * Get helper path.
     * @param {Object} helper { name, type }
     * @return {String} path
     * @since 0.0.1
     */
    const getHelperPath = (helper) => {
        const config = require('./settings/config')
        const path   = config.path.helpers
        return path + '/' + helper.name + '/' + helper.type
    }

    /**
     * Get component path.
     * @param {Object} component { name, type }
     * @return {String} path
     * @since 0.0.1
     */
    const getComponentPath = (component) => {
        const config = require('./settings/config')
        const path   = config.path.components
        return path + '/' + component.name + '/' + component.type
    }

    /**
     * Get module path.
     * @param {Object} module { name, type }
     * @return {String} path
     * @since 0.0.1
     */
    const getModulePath = (mod) => {
        const config = require('./settings/config')
        const path   = config.path.modules
        return path + '/' + mod.name + '/' + mod.type
    }

    /**
     * Get helper package path.
     * @param {Object} helper { name, type }
     * @return {String} path
     * @since 0.0.1
     */
    const getHelperPackagePath = (helper) => {
        return getHelperPath(helper) + '/package.json'
    }

    /**
     * Get component package path.
     * @param {Object} component { name, type }
     * @return {String} path
     * @since 0.0.1
     */
    const getComponentPackagePath = (component) => {
        return getComponentPath(component) + '/package.json'
    }

    /**
     * Get module package path.
     * @param {Object} module { name, type }
     * @return {String} path
     * @since 0.0.1
     */
    const getModulePackagePath = (mod) => {
        return getModulePath(mod) + '/package.json'
    }

    /**
     * Install client.
     * @param {String} client
     * @param {String} template
     * @since 0.0.1
     */
    grunt.registerTask('compile', 'Install client templates.', (client, template) => {
        if (client === undefined) return
        if (template === undefined) {
            /**
             * Install all templates.
             */
            grunt.task.run([
                'compile-npm:' + client,
                'compile-templates:' + client,
                'compile-icons:' + client
            ])
        } else {
            /**
             * Install specific template.
             */
            grunt.task.run([
                'compile-npm:' + client + ':' + template,
                'compile-templates:' + client + ':' + template,
                'compile-icons:' + client + ':' + template
            ])
        }
    })

    /**
     * Compile client NPM modules.
     * @param {String} client
     * @param {String} template
     * @since 0.0.1
     */
    grunt.registerTask('compile-npm', 'Installing NPM modules.', (client, template) => {
        if (client === undefined) return

        /**
         * Client config.
         */
        const clientConfig = require('./settings/clients/' + client)

        /**
         * Create NPM modules list object.
         * @var {Array}
         */
        let NPMs = []

        /**
         * Loop each template.
         */
        const templates = clientConfig.templates
        for (let index in templates) {
            /**
             * If want to install specific templates.
             */
            if (template !== undefined && template !== index) continue

            /**
             * Install from components.
             */
            const components = templates[index].components === undefined ? [] : templates[index].components
            for (let i = 0;i < components.length;i++) {
                /**
                 * Define component types.
                 */
                const componentTypes = components[i].type
                for (let type in componentTypes) {
                    /**
                     * Get component package.
                     */
                    const package = require('./' + getComponentPackagePath({
                        name: components[i].name,
                        type: componentTypes[type]
                    }))

                    /**
                     * Update NPM modules.
                     */
                    if (package.npm !== undefined) {
                        NPMs = NPMs.concat(package.npm)
                    }

                    /**
                     * Update NPM modules from component helpers.
                     */
                    const componentHelpers = package.helpers === undefined ? [] : package.helpers
                    for (let j = 0;j < componentHelpers;j++) {
                        /**
                         * Define helper type.
                         */
                        const helperTypes = componentHelpers[j].type
                        for (let type in helperTypes) {
                            /**
                             * Get helper package.
                             */
                            const helperPackage = require('./' + getHelperPackagePath({
                                name: componentHelpers[j].name,
                                type: helperTypes[type]
                            }))

                            /**
                             * Update NPM modules.
                             */
                            if (helperPackage.npm !== undefined) {
                                NPMs = NPMs.concat(helperPackage.npm)
                            }
                        }
                    }
                }
            }

            /**
             * Install from modules.
             */
            const modules = templates[index].modules === undefined ? [] : templates[index].modules
            for (let i = 0;i < modules.length;i++) {
                /**
                 * Get module package.
                 */
                const package = require('./' + getModulePackagePath(modules[i]))

                /**
                 * Update NPM modules.
                 */
                if (package.npm !== undefined) {
                    NPMs = NPMs.concat(package.npm)
                }

                /**
                 * Update NPM modules from module helpers.
                 */
                const moduleHelpers = package.helpers === undefined ? [] : package.helpers
                for (let j = 0;j < moduleHelpers;j++) {
                    /**
                     * Get helper package.
                     */
                    const helperPackage = require('./' + getHelperPackagePath(moduleHelpers[j]))

                    /**
                     * Update NPM modules.
                     */
                    if (helperPackage.npm !== undefined) {
                        NPMs = NPMs.concat(helperPackage.npm)
                    }
                }

                /**
                 * Update NPM modules from components.
                 */
                let moduleComponents = []
                if (modules[i].components === undefined) {
                    moduleComponents = package.components === undefined ? [] : package.components
                } else {
                    moduleComponents = modules[i].components
                }
                for (let j = 0;j < moduleComponents.length;j++) {
                    /**
                     * Define component type.
                     */
                    const componentTypes = moduleComponents[j].type
                    for (let type in componentTypes) {
                        /**
                         * Get component package.
                         */
                        const componentPackage = require('./' + getComponentPackagePath({
                            name: moduleComponents[j].name,
                            type: componentTypes[type]
                        }))

                        /**
                         * Update NPM modules.
                         */
                        if (componentPackage.npm !== undefined) {
                            NPMs = NPMs.concat(componentPackage.npm)
                        }

                        /**
                         * Update NPM modules from component helpers.
                         */
                        const componentHelpers = componentPackage.helpers === undefined ? [] : componentPackage.helpers
                        for (let j = 0;j < componentHelpers.length;j++) {
                            /**
                             * Define helper type.
                             */
                            const helperTypes = componentHelpers[j].type
                            for (let type in helperTypes) {
                                /**
                                 * Get helper package.
                                 */
                                const helperPackage = require('./' + getHelperPackagePath({
                                    name: componentHelpers[j].name,
                                    type: helperTypes[type]
                                }))
            
                                /**
                                 * Update NPM modules.
                                 */
                                if (helperPackage.npm !== undefined) {
                                    NPMs = NPMs.concat(helperPackage.npm)
                                }
                            }
                        }
                    }
                }
            }
        }

        /**
         * Validate NPM modules.
         */
        if (NPMs.length === 0) {
            console.log('No NPM modules to install.')
            return
        }

        /**
         * Create grunt config.
         */
        grunt.loadNpmTasks('grunt-exec')
        grunt.initConfig({
            exec: {
                npm: {
                    cmd: 'npm i --no-save ' + NPMs.join(' ')
                }
            }
        })

        /**
         * Run task.
         */
        grunt.task.run('exec')
    })

    /**
     * Compile single template icons.
     * @param {String} client
     * @param {String} template
     * @since 0.0.1
     */
    grunt.registerTask('compile-icon', 'Compiling icons using Grunticon.', (client, template) => {
        if (client === undefined || template === undefined) return

        /**
         * Define client configuration.
         */
        const config = require('./settings/config')
        const clientConfig = require('./settings/clients/' + client)

        /**
         * Get templates list.
         */
        const templates = clientConfig.templates

        /**
         * Create icons list object.
         * @var {Array}
         */
        let Icons = []

        /**
         * Define icons from components.
         */
        const components = templates[template].components === undefined ? [] : templates[template].components
        for (let i = 0;i < components.length;i++) {
            /**
             * Define component type.
             */
            const componentTypes = components[i].type
            for (let type in componentTypes) {
                /**
                 * Get component package.
                 */
                const package = require('./' + getComponentPackagePath({
                    name: components[i].name,
                    type: componentTypes[type]
                }))

                /**
                 * Update icons list.
                 */
                if (package.icons !== undefined) {
                    for (let icon in package.icons) {
                        if (Icons.indexOf(package.icons[icon]) === -1) {
                            Icons.push(package.icons[icon])
                        }
                    }
                }
            }
        }

        /**
         * Define icons from modules.
         */
        const modules = templates[template].modules === undefined ? [] : templates[template].modules
        for (let i = 0;i < modules.length;i++) {
            /**
             * Get module package.
             */
            const package = require('./' + getModulePackagePath(modules[i]))

            /**
             * Update icons list.
             */
            if (package.icons !== undefined) {
                Icons = Icons.concat(package.icons)
            }

            /**
             * Update icons list from module components.
             */
            let moduleComponents = []
            if (modules.components !== undefined) {
                moduleComponents = modules.components
            } else {
                moduleComponents = package.components === undefined ? [] : package.components
            }
            for (let j = 0;j < moduleComponents.length;j++) {
                /**
                 * Define compone type.
                 */
                const componentTypes = moduleComponents[j].type
                for (let type in componentTypes) {
                    /**
                     * Get component package.
                     */
                    const componentPackage = require('./' + getComponentPackagePath({
                        name: moduleComponents[j].name,
                        type: componentTypes[type]
                    }))

                    /**
                     * Update icons list.
                     */
                    if (componentPackage.icons !== undefined) {
                        for (let icon in componentPackage.icons) {
                            if (Icons.indexOf(componentPackage.icons[icon]) === -1) {
                                Icons.push(componentPackage.icons[icon])
                            }
                        }
                    }
                }
            }
        }

        /**
         * Append with external icons.
         */
        if (templates[template].icons !== undefined) {
            for (let icon in templates[template].icons) {
                if (Icons.indexOf(templates[template].icons[icon]) === -1) {
                    Icons.push(templates[template].icons[icon])
                }
            }
        }

        /**
         * Create grunt config for assets.
         */
        grunt.loadNpmTasks('grunt-grunticon')
        grunt.initConfig({
            grunticon: {
                icons: {
                    files: [
                        {
                            expand: true,
                            cwd: config.path.icons,
                            src: Icons,
                            dest: 'assets/' + client + '/' + template + '/icons'
                        }
                    ],
                    options: {
                        enhanceSVG: true,
                        cssprefix: '.',
                        loadersnippet: 'grunticon.loader.js'
                    }
                }
            }
        })

        /**
         * Run task.
         */
        grunt.task.run('grunticon:icons')
    })

    /**
     * Compile icons.
     * @param {String} client
     * @param {String} template
     * @since 0.0.1
     */
    grunt.registerTask('compile-icons', 'Compiling icons using Grunticon.', (client, template) => {
        if (client === undefined) return

        /**
         * Define client configuration.
         */
        const clientConfig = require('./settings/clients/' + client)

        /**
         * Loop templates.
         */
        const templates = clientConfig.templates
        for (let index in templates) {
            /**
             * If want to install specific templates.
             */
            if (template !== undefined && template !== index) continue

            /**
             * Compiling single template.
             */
            grunt.task.run('compile-icon:' + client + ':' + index)
        }
    })

    /**
     * Compile single template.
     * @param {String} client
     * @param {String} template
     * @since 0.0.1
     */
    grunt.registerTask('compile-template', 'Compiling single template.', (client, template) => {
        if (client === undefined || template === undefined) return

        /**
         * Get config.
         */
        const config = require('./settings/config')
        const clientConfig = require('./settings/clients/' + client)

        /**
         * Get templates list.
         */
        const templates = clientConfig.templates

        /**
         * Define files object.
         * @var {Object}
         */
        let Global = {
            core: {
                scss: [],
                js: []
            },
            npm: {
                scss: [],
                js: []
            },
            helpers: {
                scss: [],
                js: []
            },
            components: {
                scss: [],
                js: []
            },
            modules: {
                scss: [],
                js: []
            },
            external: {
                scss: [],
                js: []
            }
        }

        /**
         * Setup components.
         */
        const components = templates[template].components === undefined ? [] : templates[template].components
        for (let i = 0;i < components.length;i++) {
            /**
             * Get component types.
             */
            const componentTypes = components[i].type
            for (let type in componentTypes) {
                /**
                 * Get package.
                 */
                const package = require('./' + getComponentPackagePath({
                    name: components[i].name,
                    type: componentTypes[type]
                }))

                /**
                 * Setup SCSS files.
                 */
                if (package.style !== undefined) {
                    /**
                     * Update with NPM module files.
                     */
                    for (let npm in package.style.npm) {
                        if (Global.npm.scss.indexOf(package.style.npm[npm]) === -1) {
                            Global.npm.scss.push(package.style.npm[npm])
                        }
                    }

                    /**
                     * Update with main style.
                     */
                    for (let style in package.style.main) {
                        const stylePath = getComponentPath({
                            name: components[i].name,
                            type: componentTypes[type]
                        }) + '/scss/' + package.style.main[style]
                        if (Global.components.scss.indexOf(stylePath) === -1) {
                            Global.components.scss.push(stylePath)
                        }
                    }
                }

                /**
                 * Setup JS files.
                 */
                if (package.script !== undefined) {
                    /**
                     * Update with NPM module files.
                     */
                    for (let npm in package.script.npm) {
                        if (Global.npm.js.indexOf(package.script.npm[npm]) === -1) {
                            Global.npm.js.push(package.script.npm[npm])
                        }
                    }

                    /**
                     * Update with main script.
                     */
                    for (let script in package.script.main) {
                        const scriptPath = getComponentPath({
                            name: components[i].name,
                            type: componentTypes[type]
                        }) + '/js/' + package.script.main[script]
                        if (Global.components.js.indexOf(scriptPath) === -1) {
                            Global.components.js.push(scriptPath)
                        }
                    }
                }

                /**
                 * Update with helpers files.
                 */
                for (let helper in package.helpers) {
                    /**
                     * Define helper type.
                     */
                    const helperTypes = package.helpers[helper].type
                    for (let type in helperTypes) {
                        /**
                         * Get helper package.
                         */
                        const helperPackage = require('./' + getHelperPackagePath({
                            name: package.helpers[helper].name,
                            type: helperTypes[type]
                        }))

                        /**
                         * Setup SCSS files.
                         */
                        if (helperPackage.style !== undefined) {
                            /**
                             * Update with NPM module files.
                             */
                            for (let npm in helperPackage.style.npm) {
                                if (Global.npm.scss.indexOf(helperPackage.style.npm[npm]) === -1) {
                                    Global.npm.scss.push(helperPackage.style.npm[npm])
                                }
                            }

                            /**
                             * Update with main style.
                             */
                            for (let style in helperPackage.style.main) {
                                const stylePath = getHelperPath({
                                    name: package.helpers[helper].name,
                                    type: helperTypes[type]
                                }) + '/scss/' + helperPackage.style.main[style]
                                if (Global.helpers.scss.indexOf(stylePath) === -1) {
                                    Global.helpers.scss.push(stylePath)
                                }
                            }
                        }
                    

                        /**
                         * Setup JS files.
                         */
                        if (helperPackage.script !== undefined) {
                            /**
                             * Update with NPM module files.
                             */
                            for (let npm in helperPackage.script.npm) {
                                if (Global.npm.js.indexOf(helperPackage.script.npm[npm]) === -1) {
                                    Global.npm.js.push(helperPackage.script.npm[npm])
                                }
                            }

                            /**
                             * Update with main style.
                             */
                            for (let script in helperPackage.script.main) {
                                const scriptPath = getHelperPath({
                                    name: package.helpers[helper].name,
                                    type: helperTypes[type]
                                }) + '/js/' + helperPackage.script.main[script]
                                if (Global.helpers.js.indexOf(scriptPath) === -1) {
                                    Global.helpers.js.push(scriptPath)
                                }
                            }
                        }
                    }
                }
            }
        }

        /**
         * Setup modules.
         */
        const modules = templates[template].modules === undefined ? [] : templates[template].modules
        for (let x = 0;x < modules.length;x++) {
            /**
             * Get module package.
             */
            const package = require('./' + getModulePackagePath(modules[x]))

            /**
             * Setup SCSS files.
             */
            if (package.style !== undefined) {
                /**
                 * Update with NPM module files.
                 */
                if (package.style.npm !== undefined) {
                    for (let npm in package.style.npm) {
                        if (Global.npm.scss.indexOf(package.style.npm[npm]) === -1) {
                            Global.npm.scss.push(package.style.npm[npm])
                        }
                    }
                }

                /**
                 * Update with main style.
                 */
                if (package.style.main !== undefined) {
                    for (let style in package.style.main) {
                        const stylePath = getModulePath(modules[x]) + '/scss/' + package.style.main[style]
                        if (Global.modules.scss.indexOf(stylePath) === -1) {
                            Global.modules.scss.push(stylePath)
                        }
                    }
                }
            }

            /**
             * Setup JS files.
             */
            if (package.script !== undefined) {
                /**
                 * Update with NPM module files.
                 */
                if (package.script.npm !== undefined) {
                    for (let npm in package.script.npm) {
                        if (Global.npm.js.indexOf(package.script.npm[npm]) === -1) {
                            Global.npm.js.push(package.script.npm[npm])
                        }
                    }
                }

                /**
                 * Update with main script.
                 */
                if (package.script.main !== undefined) {
                    for (let script in package.script.main) {
                        const scriptPath = getModulePath(modules[x]) + '/js/' + package.script.main[script]
                        if (Global.modules.js.indexOf(scriptPath) === -1) {
                            Global.modules.js.push(scriptPath)
                        }
                    }
                }
            }

            /**
             * Setup helpers.
             */
            const helpers = package.helpers === undefined ? [] : package.helpers
            for (let i = 0;i < helpers.length;i++) {
                /**
                 * Define helper type.
                 */
                const helperTypes = helpers[i].type
                for (let type in helperTypes) {
                    /**
                     * Get helper package.
                     */
                    const helperPackage = require('./' + getHelperPackagePath({
                        name: helpers[i].name,
                        type: helperTypes[type]
                    }))

                    /**
                     * Setup SCSS files.
                     */
                    if (helperPackage.style !== undefined) {
                        /**
                         * Update with NPM module files.
                         */
                        if (helperPackage.style.npm !== undefined) {
                            for (let npm in helperPackage.style.npm) {
                                if (Global.npm.scss.indexOf(helperPackage.style.npm[npm]) === -1) {
                                    Global.npm.scss.push(helperPackage.style.npm[npm])
                                }
                            }
                        }

                        /**
                         * Update with main style.
                         */
                        if (helperPackage.style.main !== undefined) {
                            for (let style in helperPackage.style.main) {
                                const stylePath = getHelperPath({
                                    name: helpers[i].name,
                                    type: helperTypes[type]
                                }) + '/scss/' + helperPackage.style.main[style]
                                if (Global.helpers.scss.indexOf(stylePath) === -1) {
                                    Global.helpers.scss.push(stylePath)
                                }
                            }
                        }
                    }

                    /**
                     * Setup JS files.
                     */
                    if (helperPackage.script !== undefined) {
                        /**
                         * Update with NPM module files.
                         */
                        if (helperPackage.script.npm !== undefined) {
                            for (let npm in helperPackage.script.npm) {
                                if (Global.npm.js.indexOf(helperPackage.script.npm[npm]) === -1) {
                                    Global.npm.js.push(helperPackage.script.npm[npm])
                                }
                            }
                        }

                        /**
                         * Update with main script.
                         */
                        if (helperPackage.script.main !== undefined) {
                            for (let script in helperPackage.script.main) {
                                const scriptPath = getHelperPath({
                                    name: helpers[i].name,
                                    type: helperTypes[type]
                                }) + '/js/' + helperPackage.script.main[script]
                                if (Global.helpers.js.indexOf(scriptPath) === -1) {
                                    Global.helpers.js.push(scriptPath)
                                }
                            }
                        }
                    }
                }
            }

            /**
             * Setup components.
             */
            let components = package.components === undefined ? [] : package.components
            if (modules[x].components !== undefined) {
                components = modules[x].components
            }
            for (let i = 0;i < components.length;i++) {
                /**
                 * Get component types.
                 */
                const componentTypes = components[i].type
                for (let type in componentTypes) {
                    /**
                     * Get component package.
                     */
                    const componentPackage = require('./' + getComponentPackagePath({
                        name: components[i].name,
                        type: componentTypes[type]
                    }))

                    /**
                     * Setup SCSS files.
                     */
                    if (componentPackage.style !== undefined) {
                        /**
                         * Update with NPM module files.
                         */
                        if (componentPackage.style.npm !== undefined) {
                            for (let npm in componentPackage.style.npm) {
                                if (Global.npm.scss.indexOf(componentPackage.style.npm[npm]) === -1) {
                                    Global.npm.scss.push(componentPackage.style.npm[npm])
                                }
                            }
                        }

                        /**
                         * Update with main style.
                         */
                        if (componentPackage.style.main !== undefined) {
                            for (let style in componentPackage.style.main) {
                                const stylePath = getComponentPath({
                                    name: components[i].name,
                                    type: componentTypes[type]
                                }) + '/scss/' + componentPackage.style.main[style]
                                if (Global.components.scss.indexOf(stylePath) === -1) {
                                    Global.components.scss.push(stylePath)
                                }
                            }
                        }
                    }

                    /**
                     * Setup JS files.
                     */
                    if (componentPackage.script !== undefined) {
                        /**
                         * Update with NPM module files.
                         */
                        if (componentPackage.script.npm !== undefined) {
                            for (let npm in componentPackage.script.npm) {
                                if (Global.npm.js.indexOf(componentPackage.script.npm[npm]) === -1) {
                                    Global.npm.js.push(componentPackage.script.npm[npm])
                                }
                            }
                        }

                        /**
                         * Update with main script.
                         */
                        if (componentPackage.script.main !== undefined) {
                            for (let script in componentPackage.script.main) {
                                const scriptPath = getComponentPath({
                                    name: components[i].name,
                                    type: componentTypes[type]
                                }) + '/js/' + componentPackage.script.main[script]
                                if (Global.components.js.indexOf(scriptPath) === -1) {
                                    Global.components.js.push(scriptPath)
                                }
                            }
                        }
                    }

                    /**
                     * Update with helpers files.
                     */
                    if (componentPackage.helpers !== undefined) {
                        for (let helper in componentPackage.helpers) {
                            /**
                             * Define helper type.
                             */
                            const helperTypes = componentPackage.helpers[helper].type
                            for (let type in helperTypes) {
                                /**
                                 * Get helper package.
                                 */
                                const helperPackage = require('./' + getHelperPackagePath({
                                    name: componentPackage.helpers[helper].name,
                                    type: helperTypes[type]
                                }))

                                /**
                                 * Setup SCSS files.
                                 */
                                if (helperPackage.style !== undefined) {
                                    /**
                                     * Update with NPM module files.
                                     */
                                    if (helperPackage.style.npm !== undefined) {
                                        for (let npm in helperPackage.style.npm) {
                                            if (Global.npm.scss.indexOf(helperPackage.style.npm[npm]) === -1) {
                                                Global.npm.scss.push(helperPackage.style.npm[npm])
                                            }
                                        }
                                    }

                                    /**
                                     * Update with main style.
                                     */
                                    if (helperPackage.style.main !== undefined) {
                                        for (let style in helperPackage.style.main) {
                                            const stylePath = getHelperPath({
                                                name: componentPackage.helpers[helper].name,
                                                type: helperTypes[type]
                                            }) + '/scss/' + helperPackage.style.main[style]
                                            if (Global.helpers.scss.indexOf(stylePath) === -1) {
                                                Global.helpers.scss.push(stylePath)
                                            }
                                        }
                                    }
                                }

                                /**
                                 * Setup JS files.
                                 */
                                if (helperPackage.script !== undefined) {
                                    /**
                                     * Update with NPM module files.
                                     */
                                    if (helperPackage.script.npm !== undefined) {
                                        for (let npm in helperPackage.script.npm) {
                                            if (Global.npm.js.indexOf(helperPackage.script.npm[npm]) === -1) {
                                                Global.npm.js.push(helperPackage.script.npm[npm])
                                            }
                                        }
                                    }

                                    /**
                                     * Update with main style.
                                     */
                                    if (helperPackage.script.main !== undefined) {
                                        for (let script in helperPackage.script.main) {
                                            const scriptPath = getHelperPath({
                                                name: componentPackage.helpers[helper].name,
                                                type: helperTypes[type]
                                            }) + '/js/' + helperPackage.script.main[script]
                                            if (Global.helpers.js.indexOf(scriptPath) === -1) {
                                                Global.helpers.js.push(scriptPath)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        /**
         * Append external script.
         */
        if (templates[template].external !== undefined) {
            /**
             * Append scss.
             */
            if (templates[template].external.scss !== undefined) {
                for (let style in templates[template].external.scss) {
                    Global.external.scss.push('../' + client + '/' + templates[template].external.scss[style])
                }
            }

            /**
             * Append js.
             */
            if (templates[template].external.js !== undefined) {
                for (let script in templates[template].external.js) {
                    Global.external.js.push('../' + client + '/' + templates[template].external.js[script])
                }
            }
        }

        /**
         * Define core.
         * @var {Object}
         */
        let Core = clientConfig.core === undefined ? config.core : clientConfig.core
            Core = templates[template].core === undefined ? Core : templates[template].core

        /**
         * Define core.
         */
        if (JSON.stringify(Core) === '{}') {
            Global.core.scss = config.compiler.scss
            Global.core.js   = config.compiler.js
        } else {
            /**
             * Core - SCSS.
             */
            Global.core.scss = config.compiler.scss
            if (Core.scss !== undefined) {
                Global.core.scss = Global.core.scss.concat(Core.scss)
            }

            /**
             * Core - JS.
             */
            Global.core.js = config.compiler.js
            if (Core.js !== undefined) {
                Global.core.js = Global.core.js.concat(Core.js)
            }
        }

        /**
         * Concat script - SCSS.
         */
        const SCSS = [].concat(
            Global.core.scss,
            Global.npm.scss,
            Global.helpers.scss,
            Global.components.scss,
            Global.modules.scss,
            Global.external.scss
        )

        /**
         * Concat script - JS.
         */
        const JS = [].concat(
            Global.core.js,
            Global.npm.js,
            Global.helpers.js,
            Global.components.js,
            Global.modules.js,
            Global.external.js
        )

        /**
         * Create grunt config.
         */
        grunt.loadNpmTasks('grunt-contrib-concat')
        grunt.loadNpmTasks('grunt-contrib-uglify')
        grunt.loadNpmTasks('grunt-contrib-sass')
        grunt.loadNpmTasks('grunt-contrib-cssmin')
        grunt.initConfig({
            concat: {
                scss: {
                    src: SCSS,
                    dest: config.path.compiler.compiled + '/' + client + '/' + template + '/scss/' + 'style.scss'
                },
                js: {
                    src: JS,
                    dest: config.path.compiler.compiled + '/' + client + '/' + template + '/js/' + 'script.js'
                }
            },
            sass: {
                main: {
                    files: [{
                        expand: true,
                        cwd: config.path.compiler.compiled + '/' + client + '/' + template + '/scss',
                        src: 'style.scss',
                        dest: config.path.compiler.assets + '/' + client + '/' + template + '/css',
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
                        cwd: config.path.compiler.assets + '/' + client + '/' + template + '/css',
                        src: 'style.css',
                        dest: config.path.compiler.assets + '/' + client + '/' + template + '/css',
                        ext: '.css'
                    }]
                }
            },
            uglify: {
                main: {
                    files: [{
                        expand: true,
                        cwd: config.path.compiler.compiled + '/' + client + '/' + template + '/js',
                        src: 'script.js',
                        dest: config.path.compiler.assets + '/' + client + '/' + template + '/js'
                    }]
                }
            }
        })

        /**
         * Run tasks.
         */
        grunt.task.run([
            'concat', 'sass', 'cssmin', 'uglify'
        ])
    })

    /**
     * Compile templates.
     * @param {String} client
     * @param {String} template
     * @since 0.0.1
     */
    grunt.registerTask('compile-templates', 'Compiling templates.', (client, template) => {
        if (client === undefined) return

        /**
         * Get config.
         */
        const clientConfig = require('./settings/clients/' + client)

        /**
         * Setup templates.
         */
        const templates = clientConfig.templates
        for (let index in templates) {
            /**
             * If want to install specific templates.
             */
            if (template !== undefined && template !== index) continue

            /**
             * Compiling single template.
             */
            grunt.task.run('compile-template:' + client + ':' + index)
        }
    })

    /**
     * Compile code file for each component/module/helper.
     * @param {String} category -> "module" | "component" | "helper"
     * @param {String} name
     * @param {String} type
     * @since 0.0.1
     */
    grunt.registerTask('compile-code', 'Compiling component/module/helper code.', (category, name, type) => {
        /**
         * Define config.
         */
        const config = require('./settings/config')

        /**
         * Define core.
         */
        let core = {
            scss: [],
            js: []
        }
        core.scss = core.scss.concat(config.compiler.scss)

        /**
         * Determine template items
         */
        let path
        switch (category) {
            case 'helper':
                path = config.path.helpers + '/' + name + '/' + type
                break
            case 'component':
                path = config.path.components + '/' + name + '/' + type
                break
            case 'module':
                path = config.path.modules + '/' + name + '/' + type
                break
        }
        if (path === undefined || path === '') return

        /**
         * Get package.
         */
        const package = require('./' + path + '/package')

        /**
         * Get list of styles.
         */
        let styles = []
        if (package.style !== undefined) {
            const stylesarr = package.style.main === undefined ? [] : package.style.main
            for (let i = 0;i < stylesarr.length;i++) {
                styles.push(path + '/scss/' + stylesarr[i])
            }
        }

        /**
         * Get list of scripts.
         */
        let scripts = []
        if (package.script !== undefined) {
            const scriptsarr = package.script.main === undefined ? [] : package.script.main
            for (let i = 0;i < scriptsarr.length;i++) {
                scripts.push(path + '/js/' + scriptsarr[i])
            }
        }

        /**
         * Create grunt config.
         */
        grunt.loadNpmTasks('grunt-contrib-concat')
        grunt.loadNpmTasks('grunt-contrib-sass')
        grunt.loadNpmTasks('grunt-contrib-cssmin')
        grunt.loadNpmTasks('grunt-contrib-uglify')
        grunt.loadNpmTasks('grunt-contrib-clean')
        grunt.initConfig({
            concat: {
                scss: {
                    src: core.scss.concat(styles),
                    dest: path + '/_compiled/scss/style.scss'
                },
                js: {
                    src: scripts,
                    dest: path + '/_compiled/js/script.js'
                }
            },
            sass: {
                main: {
                    files: [{
                        expand: true,
                        cwd: path + '/_compiled/scss',
                        src: 'style.scss',
                        dest: path + '/_compiled/css',
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
                        cwd: path + '/_compiled/css',
                        src: 'style.css',
                        dest: path + '/_compiled/css',
                        ext: '.css'
                    }]
                }
            },
            uglify: {
                main: {
                    files: [{
                        expand: true,
                        cwd: path + '/_compiled/js',
                        src: 'script.js',
                        dest: path + '/_compiled/js'
                    }]
                }
            },
            clean: {
                main: {
                    src: [
                        path + '/_compiled/scss',
                        path + '/_compiled/css/*.map'
                    ]
                }
            }
        })

        /**
         * Define task.
         */
        let tasks = []
        if (styles.length > 0) {
            tasks.push('concat:scss', 'sass', 'cssmin', 'clean')
        }
        if (scripts.length > 0) {
            tasks.push('concat:js', 'uglify')
        }

        /**
         * Run task.
         */
        if (tasks.length > 0) {
            grunt.task.run(tasks)
        }
    })
}