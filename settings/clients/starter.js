module.exports = {
    about: {
        ID: "starter",
        name: "Starter",
        version: "1.0.0",
        author: {
            name: "Fachri Riyanto",
            url: "https://fachririyanto@gmail.com",
            email: "fachririyanto@gmail.com"
        }
    },
    templates: {
        /**
         * Default template.
         */
        home: {
            components: [
                { name: "post", type: "type-1" }
            ],
            modules: [
                { name: "header", type: "type-1" },
                { name: "footer", type: "type-1" },
                { name: "posts", type: "type-1" },
                { name: "posts", type: "type-2" }
            ]
        },

        /**
         * If you just want to get core style and script.
         * @example I set a global template as a name of style and script file.
         */
        global: {
            components: [],
            modules: []
        },

        /**
         * Overriding core.
         * You can reset one of scss of js value or both of them.
         */
        other: {
            core: {
                scss: [
                    'templates/_core/scss/vendor/css3-mixins.scss',
                    'templates/_core/scss/variable.scss'
                ],
                js: []
            },
            components: [
                { name: "post", type: "type-1" }
            ],
            modules: [
                { name: "header", type: "type-1" },
                { name: "footer", type: "type-1" },
                { name: "posts", type: "type-1" },
                { name: "posts", type: "type-2" }
            ]
        }
    }
}