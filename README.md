# Lurik
:: A configurational framework for creating a modular static web templates.

-----

**Lurik** adalah sebuah framework dengan model konfigurasi berbasis JavaScript yang memungkinkan template website static dibuat secara modular (*component & module based* dan dapat dipakai berulang-ulang atau *reusable*), kodenya terstruktur dengan baik (rapih, setiap *component & module* memiliki file CSS dan JS di folder yang sama), dan setiap template dapat memiliki lebih dari satu variasi layout (dengan pengelompokan tipe-tipe template) serta kemudahan untuk berkolaborasi atau berkontribusi karena sistem *component* dan *module*-nya dibuat per folder.

Lurik menggunakan tools bantuan seperti [GruntJS](https://gruntjs.com/) untuk melakukan eksekusi konfigurasinya dan [NodeJS](https://nodejs.org/en/) untuk instalasi modul (*jQuery plugin*, dan sebagainya) yang dibutuhkan ketika membuat sebuah template.

Lurik terdiri dari 4 bagian yaitu *Core*, *Helpers*, *Components*, dan *Modules*.

- **Core**\
Bisa dikatakan ini adalah kode-kode yang harus selalu ada di setiap halaman website. Contohnya, *Twitter Bootstrap*, *Foundation*, *jQuery*, *CSS Normalize* dan sebagainya. Kode-kode tersebut juga dapat digunakan sebagai kode dasar pembuatan template.

- **Helpers**\
Kode-kode yang sifatnya bantuan saja. Pada kode CSS sebagai contoh adalah class untuk tata letak text atau disebut *text-align*.
```css
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }
```


- **Components**, Bagian yang paling kecil dari sebuah template website yang dapat digunakan berulang kali sesuai kebutuhan (*reusable*) untuk membentuk suatu *modules*. Contoh *components* yaitu *avatar*, *textbox*, *checkbox*, *post-item*, *comment-item*, dan sebagainya.

- **Modules**, Potongan-potongan layout untuk membentuk sebuah template website. Contoh *modules* yaitu *header*, *footer*, *why-us*, dan sebagainya.

-----

**00. Requirements**

Sebelum install Lurik, pastikan Anda sudah menginstall:
- [NodeJS](https://nodejs.org/en/)
- [Grunt](https://gruntjs.com/)
- [SASS](https://sass-lang.com/)

-----

**01. Installation**

Buka terminal dan arahkan ke folder Lurik dan ketik:\
*npm install*

Lalu install template dengan mengetik:\
*grunt install:client-name*

Sebagai contoh, saya ketik:\
*grunt install:starter*

Karena Lurik sudah menyiapkan satu template sebagai contoh, yaitu starter. Untuk konfigurasinya bisa dilihat pada file “settings/clients/starter.js”.

-----

**02. Main Command**

Untuk menginstall client pertama kali, ketik:\
*grunt install:client-name*

Untuk mendownload NPM module yang akan digunakan oleh components atau modules, ketik:\
*grunt install-npm:client-name*

Jika hanya ingin meng-compile script atau style klien, ketik:\
*grunt install-client:client-name*

------

**03. Add/Update Core**

Pada folder “templates/\_core”, terdapat folder "js" untuk file JS (file.js), dan folder "scss" untuk file SCSS (file.scss). Letakan script atau style Anda pada masing-masing folder sesuai tipe filenya.

![alt text](https://github.com/fachririyanto/lurik/blob/master/docs/images/example-core.png)

Anda bisa memecah menjadi beberapa file script/style agar kode tidak terkumpul menjadi satu file. Hal tersebut juga agar memudahkan pencarian kode jika ada error atau dapat melakukan pembagian kode jika bekerja dalam tim.

-----

**04. Add/Update Helpers**

Pada folder “templates/helpers”, buat folder baru dengan nama helper yang ingin dibuat. Didalam folder helper yang dibuat, Anda dapat menambahkan tipe dari helper tersebut. Sebagai contoh, jika helper yang Anda buat ini adalah helper baru, Anda dapat membuat folder dengan nama “type-1”. Lurik memungkinkan Anda mempunyai helper dengan nama yang sama namun mempunyai tindakan yang berbeda (disesuaikan dengan template yang akan dibuat).

![alt text](https://github.com/fachririyanto/lurik/blob/master/docs/images/example-helpers.png)

Setelah itu buat file script.js untuk file JS, dan style.scss untuk file SCSS. Karena sifatnya yang hanya sebagai pembantu script lain, sehingga hanya disediakan satu file saja (tidak seperti *Core*, *Components* dan *Modules*).

**Catatan:**\
Jika dalam satu template memakai dua tipe helper dari nama yang sama, bagaimana cara membedakannya? Caranya adalah dengan penamaan class nya, contohnya untuk helper tipe 1 diberikan class dengan nama **.U--helper.type--1**, sedangkan tipe lainnya diberikan sesuai nama tipenya, dan seterusnya. Intinya diberikan penamaan class yang unik untuk setiap helpernya.

-----

**05. Add/Update Components**

Pada folder “templates/components”, buat folder baru dengan nama component yang akan dibuat. Sama seperti helper, component dapat memiliki bermacam-macam tipe. Perbedaan dengan helper adalah component dapat memiliki lebih dari satu file untuk masing-masing file JS dan SCSS.

![alt text](https://github.com/fachririyanto/lurik/blob/master/docs/images/example-components.png)

Selain itu, component memiliki file wajib yaitu package.js. File tersebut adalah konfigurasi dari component yang Anda buat. Di file tersebut anda akan me-register script atau style mana saja yang akan di-load, dan dapat diurutkan juga kode mana yang akan dijalankan duluan serta Anda juga dapat meregister modul NPM yang akan dipakai oleh component.

Contoh package.js:

```js
module.exports = {
	about: {
		ID: "your-component-name",
		name: "Your Component Name",
		description: "",
		author: {
			name: "Fachri Riyanto",
			url: "https://fachririyanto.com",
			email: "fachririyanto@gmail.com"
		},
		version: "1.0.0"
	},

	// nama package pada NPM
	npm: ["owl.carousel", ...],
	
	// file scripts
	scripts: {
		// module yang dipakai component
		npm: [
			"node_modules/owl.carousel/dist/owl.carousel.js",
			...
		],
	
		// helper yang dipakai component
		// secara otomatis akan memakai file script.js pada helper
		helpers: [
			{ name: "your-helper-name", type: "type-1" },
			...
		],
		
		// script yang dipakai component
		// urutan index array mempengaruhi urutan kode
		// yang ada di index pertama, itu yang pertama kali dijalankan
		main: [
			"internal-helper.js",
			"script.js"
		]
	},
	
	// file SCSS
	styles: {
		// module yang dipakai component
		npm: [
			"node_modules/owl.carousel/dist/owl.carousel.css",
			...
		],
	
		// helper yang dipakai component
		// secara otomatis akan memakai file style.scss pada helper
		helpers: [
			{ name: "your-helper-name", type: "type-1" },
			...
		],

		// CSS yang dipakai component
		// urutan index array mempengaruhi urutan kode
		// yang ada di index pertama, itu yang pertama kali dijalankan
		main: [
			"style.scss"
		]
	}
}
```

\
**Catatan:**\
Sama dengan helper, jika dalam satu template memakai dua tipe component dari nama yang sama, berikan penamaan yang unik seperti **.C--component-name.type--1**, sedangkan tipe lainnya diberikan sesuai nama tipenya, dan seterusnya.

-----

**06. Add/Update Modules**

Pada folder “templates/modules”, buat folder baru dengan nama module yang akan dibuat. Sama seperti component, module dapat memiliki beberapa tipe untuk setiap modulenya.

![alt text](https://github.com/fachririyanto/lurik/blob/master/docs/images/example-modules.png)

Perbedaan module dan component terdapat pada file package.js nya. Pada module, terdapat option components. Yang digunakan untuk menentukan component mana saja yang akan dipakai sebagai component default untuk module yang sedang dibuat.

```js
module.exports = {
	about: {
		ID: "your-component-name",
		name: "Your Component Name",
		description: "",
		author: {
			name: "Fachri Riyanto",
			url: "https://fachririyanto.com",
			email: "fachririyanto@gmail.com"
		},
		version: "1.0.0"
	},

	// nama package pada NPM
	npm: ["owl.carousel", ...],
	
	// list components
	components: [
		{ name: "component-name", type: ["type-1"] },
		...
	],
	
	// file scripts
	scripts: {
		// module yang dipakai component
		npm: [
			"node_modules/owl.carousel/dist/owl.carousel.js",
			...
		],
	
		// helper yang dipakai component
		// secara otomatis akan memakai file script.js pada helper
		helpers: [
			{ name: "your-helper-name", type: "type-1" },
			...
		],
		
		// script yang dipakai component
		// urutan index array mempengaruhi urutan kode
		// yang ada di index pertama, itu yang pertama kali dijalankan
		main: [
			"internal-helper.js",
			"script.js"
		]
	},
	
	// file SCSS
	styles: {
		// module yang dipakai component
		npm: [
			"node_modules/owl.carousel/dist/owl.carousel.css",
			...
		],
	
		// helper yang dipakai component
		// secara otomatis akan memakai file style.scss pada helper
		helpers: [
			{ name: "your-helper-name", type: "type-1" },
			...
		],

		// CSS yang dipakai component
		// urutan index array mempengaruhi urutan kode
		// yang ada di index pertama, itu yang pertama kali dijalankan
		main: [
			"style.scss"
		]
	}
}
```

\
**Catatan:**\
Sama dengan component, jika dalam satu template memakai dua tipe module dari nama yang sama, berikan penamaan unik seperti **.M--module-name.type--1**, sedangkan tipe lainnya diberikan sesuai nama tipenya, dan seterusnya.

-----

**07. Registering Scripts**

Setelah membuat *core*, *helpers*, *components* dan *modules*, hal berikutnya yang perlu dilakukan adalah melakukan registrasi component dan module yang akan dipakai untuk membangun sebuah template. Pada folder “settings/clients”, buat file baru dengan extension .js, seperti berikut:

![alt text](https://github.com/fachririyanto/lurik/blob/master/docs/images/example-settings.png)

Dan berikut contoh konfigurasi untuk me-register script nya:

```js
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
            'templates/_core/scss/vendor/css3-mixins.scss',
            'templates/_core/scss/variable.scss',
            'templates/_core/scss/utilities.scss',
            'templates/_core/scss/style.scss'
        ],
        js: [
            'templates/_core/js/script.js'
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
         * Overriding core - for specific template.
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
```

Pada option templates, terdapat option *home*, *global* dan *other*. Option tersebut kita yang menentukan sendiri penamaannya sesuai dengan template yang ingin dibuat. Option-option tersebut akan membuat masing-masing 1 file CSS dan JS, hasilnya adalah home.js, home.css, global.js, global.css, other.js, dan other.js. Sehingga memungkinkan Anda menggunakan component dan module sesuai dengan kebutuhan template-nya saja.


**Terima kasih.**
