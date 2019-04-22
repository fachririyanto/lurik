# Lurik
:: A configurational framework for creating a modular static web templates.

-----

### Apa itu Lurik?
**Lurik** adalah framework berbasis konfigurasi dengan bahasa JavaScript. Lurik ini adalah hasil riset saya di BINUS University yang bertujuan agar template-template yang sudah dibuat dapat digunakan kembali dengan mudah, dibuat secara modular (bongkar-pasang).

Selain itu, dengan Lurik, script yang diload/didownload pada setiap template hanya yang dibutuhkan oleh template tersebut saja. Sehingga load website akan lebih cepat.

Di BINUS University, sistem Lurik sudah dikembangkan dalam bentuk WordPress Theme untuk pengembangan website-website yang ada di BINUS. Salah satu contoh yang sudah menggunakan sistem Lurik adalah [Sokrates.id](http://sokrates.id).


### Struktur Lurik
Lurik terdiri dari 4 bagian yaitu *Core*, *Helpers*, *Components*, dan *Modules*.

- **Core**\
Bisa dikatakan ini adalah kode-kode yang (mungkin) harus selalu ada di setiap halaman website yang akan dijadikan kode dasar pembuatan website. Contohnya, *Twitter Bootstrap*, *Foundation*, *jQuery*, *CSS Normalize* dan sebagainya.

- **Helpers**\
Kode-kode yang sifatnya bantuan saja. Contohnya adalah seperti kode untuk format text atau *text-align*.
```css
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }
```
[https://github.com/fachririyanto/lurik/tree/master/templates/helpers](https://github.com/fachririyanto/lurik/tree/master/templates/helpers)

- **Components**, Bagian yang paling kecil dari sebuah template website yang dapat digunakan berulang kali sesuai kebutuhan (*reusable*) untuk membentuk suatu *modules*. Contohnya seperti *avatar*, *textbox*, *checkbox*, *post-item*, *comment-item*, dan sebagainya.

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

Coming soon!!

[https://github.com/fachririyanto/lurik/tree/master/templates/_core](https://github.com/fachririyanto/lurik/tree/master/templates/_core)

-----

**04. Add/Update Helpers**

Coming soon!!

[https://github.com/fachririyanto/lurik/tree/master/templates/helpers](https://github.com/fachririyanto/lurik/tree/master/templates/helpers)

-----

**05. Add/Update Components**

Coming soon!!

[https://github.com/fachririyanto/lurik/tree/master/templates/components](https://github.com/fachririyanto/lurik/tree/master/templates/components)

-----

**06. Add/Update Modules**

Coming soon!!

[https://github.com/fachririyanto/lurik/tree/master/templates/modules](https://github.com/fachririyanto/lurik/tree/master/templates/modules)

-----

**07. Registering Scripts**

Coming soon!!

[https://github.com/fachririyanto/lurik/blob/master/settings/clients/starter.js](https://github.com/fachririyanto/lurik/blob/master/settings/clients/starter.js)

\
\
**Terima kasih.**
