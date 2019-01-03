# Lurik
:: A configurational framework for creating a modular web static templates.

-----

Pembuatan Lurik bertujuan agar kode-kode HTML dan CSS yang dibuat terstruktur dengan baik dengan pembagian nama template berdasarkan tipe template-nya yaitu komponen atau modul, dan membuat kode-kode tersebut dapat digunakan kembali dengan mudah (reusable).

Lurik terdiri dari 4 bagian yaitu Core, Helpers, Components, dan Modules.

- **Core**, Script atau/dan Stylesheet yang perlu di-load pertama kali. Misalnya CSS Normalize, jQuery, Twitter Bootstrap, Foundation, dsb.

- **Helpers**, Script atau/dan Stylesheet yang sifatnya bantuan atau bisa disebut juga dengan plugins.

- **Components**, Bagian-bagian terkecil dari sebuah templates yang dapat digunakan berulang kali sesuai kebutuhan (reusable).

- **Modules**, Kumpulan templates yang dibangun berdasarkan komponen-komponen yang sudah dibuat.

Lurik dibuat dengan bantuan GruntJS untuk eksekusi konfigurasinya dan NodeJS untuk instalasi module yang dibutuhkan untuk membuat template.

-----

**00. Requirements**

Sebelum install Lurik, pastikan Anda sudah menginstall:
- NodeJS
- Grunt
- SASS

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
