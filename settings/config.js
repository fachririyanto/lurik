module.exports = {
    about: {
        name: "Lurik",
        version: "1.0.0",
        author: {
            name: "Fachri Riyanto",
            email: "fachririyanto@gmail.com",
            url: "https://fachririyanto.com"
        }
    },
    compiler: {
        core: {
            scss: [
                'templates/_core/scss/vendor/css3-mixins.scss',
                'templates/_core/scss/variable.scss',
                'templates/_core/scss/style.scss'
            ],
            js: [
                'templates/_core/js/script.js'
            ]
        },
        path: {
            assets: "assets",
            compiled: "assets/_compiled"
        }
    },
    templates: {
        core: {
            path: "templates/_core"
        },
        helpers: {
            path: "templates/helpers"
        },
        components: {
            path: "templates/components"
        },
        modules: {
            path: "templates/modules"
        }
    }
}