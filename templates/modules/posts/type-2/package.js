module.exports = {
    about: {
        ID: "posts",
        name: "Posts",
        description: "",
        author: {
            name: "Fachri Riyanto",
            url: "https://fachririyanto.com",
            email: "fachririyanto@gmail.com"
        },
        version: "1.0.0"
    },
    npm: [
        "owl.carousel"
    ],
    components: [
        { name: "block-header", type: [ "type-1" ] }
    ],
    scripts: {
        npm: [
            "node_modules/owl.carousel/dist/owl.carousel.min.js"
        ],
        helpers: [],
        main: [
            "script.js"
        ]
    },
    styles: {
        npm: [
            "node_modules/owl.carousel/dist/assets/owl.carousel.min.css"
        ],
        helpers: [],
        main: [
            "style.scss"
        ]
    }
}