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
