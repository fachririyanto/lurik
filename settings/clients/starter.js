module.exports = {
    about: {
        ID: "starter",
        name: "Starter",
        version: "1.0.0",
        author: {
            name: "Fachri Riyanto",
            url: "https://fachririyanto.com",
            email: "fachririyanto@gmail.com"
        }
    },

    /**
     * Core global overriding - for all templates.
     */
    core: {
        scss: [
            "templates/_core/scss/vendor/css3-mixins.scss",
            "templates/_core/scss/variable.scss",
            "templates/_core/scss/style.scss"
        ],
        js: [
            "templates/_core/js/script.js"
        ]
    },

    /**
     * Setup templates.
     */
    templates: {
        /**
         * Home template.
         */
        home: {
            components: [
                { name: "post", type: [ "type-1" ] }
            ],
            modules: [
                { name: "header", type: "type-1" },
                { name: "footer", type: "type-1" },
                { name: "posts", type: "type-1" },

                // overriding or registering new default components
                {
                    name: "posts",
                    type: "type-2",
                    components: [
                        { name: "block-header", "type": [ "type-1" ] }
                    ]
                }
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
         * Overriding core - for specific template.
         * You can reset one of scss of js value or both of them.
         */
        other: {
            core: {
                scss: [
                    "templates/_core/scss/vendor/css3-mixins.scss",
                    "templates/_core/scss/variable.scss"
                ],
                js: []
            },
            components: [
                { name: "post", type: [ "type-1" ] }
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