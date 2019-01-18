# Lurik
:: A configurational framework for creating a modular static web templates.

-----

**Lurik** memungkinkan template website static dibuat secara modular (component & module based), kodenya terstruktur dengan baik (rapih), dan setiap template dapat memiliki lebih dari satu variasi layout (dengan pengelompokan tipe-tipe template).

Lurik menggunakan JavaScript sebagai corenya dengan [GruntJS](https://gruntjs.com/) untuk eksekutor konfigurasinya dan [NodeJS](https://nodejs.org/en/) untuk instalasi modul yang dibutuhkan ketika membuat sebuah template.

Lurik terdiri dari 4 bagian yaitu *Core*, *Helpers*, *Components*, dan *Modules*.

- **Core**\
Bisa dikatakan ini adalah kode-kode yang harus selalu ada di setiap halaman website. Contohnya, *Twitter Bootstrap*, *Foundation*, *jQuery*, *CSS Normalize* dan sebagainya. Kode-kode tersebut juga dapat digunakan sebagai kode dasar pembuatan template.

- **Helpers**\
Kode-kode yang sifatnya bantuan saja. Pada kode CSS sebagai contoh adalah class untuk tata letak text atau disebut *text-align*.\

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

Pada folder “templates/core” (core with underscore), terdapat folder js untuk file JavaScript (file.js), dan SCSS untuk file stylesheet atau SCSS (file.scss). Letakan script atau style Anda pada masing-masing folder sesuai tipe filenya.

![alt text](https://github.com/fachririyanto/lurik/blob/master/docs/images/example-core.png)

Anda bisa memecah menjadi beberapa script/style agar kode tidak terkumpul menjadi satu file. Hal tersebut juga agar memudahkan pencarian kode jika ada error atau dapat melakukan pembagian kode jika bekerja dalam tim.

-----

**04. Add/Update Helpers**

Pada folder “templates/helpers”, buat folder baru dengan nama helper yang ingin dibuat. Didalam folder helper yang dibuat, Anda dapat menambahkan tipe dari helper tersebut. Sebagai contoh, jika helper yang Anda buat ini adalah helper baru, Anda dapat membuat folder dengan nama “type-1”. Lurik memungkinkan Anda mempunyai helper dengan nama yang sama namun mempunyai tindakan yang berbeda (disesuaikan dengan template yang akan dibuat).

![alt text](https://github.com/fachririyanto/lurik/blob/master/docs/images/example-helpers.png)

Setelah itu buat file script.js untuk file JavaScript, dan style.scss untuk file stylesheet atau SCSS. Karena sifatnya yang hanya sebagai pembantu script lain, sehingga hanya disediakan satu file saja (tidak seperti Core, Components dan Modules).

**Catatan:**\
Jika dalam satu template memakai dua tipe helper dari nama yang sama, bagaimana cara membedakannya? Caranya adalah dengan penamaan class nya, contohnya untuk helper tipe 1 diberikan class dengan nama **.U--helper.type--1**, sedangkan tipe lainnya diberikan sesuai nama tipenya, dan seterusnya.

-----

**05. Add/Update Components**

Pada folder “templates/components”, buat folder baru dengan nama komponen yang akan dibuat. Sama seperti helper, komponen dapat memiliki bermacam-macam tipe. Perbedaan dengan helper adalah komponen dapat memiliki lebih dari satu file untuk masing-masing file JS dan SCSS.

![alt text](https://github.com/fachririyanto/lurik/blob/master/docs/images/example-components.png)

Selain itu, komponen memiliki file wajib yaitu package.js. File tersebut adalah konfigurasi dari komponen yang Anda buat. Di file tersebut anda akan me-register script atau style mana saja yang akan di-load, dan dapat diurutkan juga kode mana yang akan dijalankan duluan serta Anda juga dapat meregister modul NPM yang akan dipakai oleh komponen.

Contoh package.js:

![alt text](https://github.com/fachririyanto/lurik/blob/master/docs/images/example-components-package.png)

Penjelasan:

- **about: { Object } - optional**\
Digunakan untuk deskripsi tentang komponen yang dibuat. Saat ini, option about belum digunakan selain hanya untuk deskripsi.

- **dependencies: array**\
List modul NPM yang akan dipakai, cukup isikan dengan nama modulnya.\
Contoh: [ “jquery”, “owl.carousel”, … ]

- **scripts: { Object }**\
Scripts sendiri terbagi lagi menjadi 3 bagian, yaitu plugins, helpers dan main.

  - **plugins: array**\
Berisi list path script dari modul NPM yang dipakai.\
Contoh: [ “node_modules/jquery/dist/jquery.min.js”, … ]

  - **helpers: array of Object**\
Helper yang dipakai oleh komponen yang Anda buat.\
Contoh: [\
{ name: “hello”, type: “type-1” },\
...\
]

  - **main: array**\
Digunakan untuk me-register script yang sudah Anda buat. Cukup mengisi nama file-nya saja karena pathnya akan otomatis mengarah ke folder “js”.\
Contoh: [ “script.js”, … ]\
Urutan index array mempengaruhi urutan untuk dijalankan pertama kali.

- **styles: { Object }**\
Sama seperti scripts, styles juga memiliki 3 bagian yang sama, cara isinya pun sama hanya berbeda tipe filenya saja.

\
**Catatan:**\
Sama dengan helper, jika dalam satu template memakai dua tipe komponen dari nama yang sama, berikan penamaan seperti .C--component-name.type--1, sedangkan tipe lainnya diberikan sesuai nama tipenya, dan seterusnya.

-----

**06. Add/Update Modules**

Pada folder “templates/modules”, buat folder baru dengan nama modul yang akan dibuat. Sama seperti komponen, modul dapat memiliki beberapa tipe untuk setiap modulnya.

![alt text](https://github.com/fachririyanto/lurik/blob/master/docs/images/example-modules.png)

Perbedaan modul dan komponen terdapat pada file package.js nya.

![alt text](https://github.com/fachririyanto/lurik/blob/master/docs/images/example-modules-package.png)

Pada modul, terdapat option components. Yang digunakan untuk menentukan komponen mana saja yang akan dipakai sebagai komponen default untuk modul yang sedang dibuat.

- **components: array of Object**\
Komponen yang dipakai oleh modul yang Anda buat.\
Contoh: [ { name: “post”, type: “type-1” }, … ]

\
**Catatan:**\
Sama dengan komponen, jika dalam satu template memakai dua tipe modul dari nama yang sama, berikan penamaan seperti .M--module-name.type--1, sedangkan tipe lainnya diberikan sesuai nama tipenya, dan seterusnya.

-----

**07. Registering Scripts**

Setelah membuat core, helpers, components dan modules, hal berikutnya yang perlu dilakukan adalah melakukan register scripts. Pada folder “settings/clients”, buat file baru dengan extension .js, seperti berikut:

![alt text](https://github.com/fachririyanto/lurik/blob/master/docs/images/example-settings.png)

Dan berikut contoh konfigurasi untuk me-register script nya:

![alt text](https://github.com/fachririyanto/lurik/blob/master/docs/images/example-settings-config.png)

Pada option templates, terdapat option home, global dan other. Option tersebut kita yang menentukan sendiri penamaannya sesuai dengan template yang ingin dibuat. Sebagai contoh option home, pada halaman atau template home, Anda butuh komponen dan modul apa saja yang dibutuhkan untuk membuat layoutnya.

Option-option tersebut akan membuat masing-masing 1 file CSS dan JS, hasilnya adalah home.js, home.css, global.js, global.css, other.js, dan other.js. Sehingga memungkinkan Anda me-load komponen dan modul sesuai dengan kebutuhan template-nya saja.
