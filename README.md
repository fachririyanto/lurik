# Lurik
:: A configurational framework for creating a modular static web templates.

-----

### What is Lurik?
**Lurik** is a configurational framework using JavaScript for building a modular static web templates. Lurik helped me build a modular web templates based on components and modules. Lurik is reusable and make it posible to load a script what page need, that make your site faster. Currently, Lurik used at BINUS for build a CSS Framework called BINUS-UI.


### Lurik Core
Lurik has four fundamental elements, its *Core*, *Helpers*, *Components*, and *Modules*.

- **Core**\
Like any other frameworks or apps, Lurik has a core. In Lurik, core is like Twitter Bootstrap, 
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

### Get Started

**00. Requirements**

Sebelum install Lurik, pastikan Anda sudah menginstall:
- [NodeJS](https://nodejs.org/en/)
- [Grunt](https://gruntjs.com/)
- [SASS](https://sass-lang.com/)

-----

**01. Installation**

Buka terminal dan arahkan ke folder Lurik dan ketik:\
*npm install*

Lalu ketik kode berikut untuk menginstall template:\
*grunt compile:client-name*

Sebagai contoh, Anda bisa ketik:\
*grunt compile:lurik*

Karena Lurik sudah menyiapkan satu template sebagai contoh dengan nama "lurik". Untuk konfigurasinya bisa dilihat pada file “settings/clients/lurik.json”.

-----

**02. Main Command**

Untuk menginstall client pertama kali, ketik:\
*grunt compile:client-name*

Untuk mendownload NPM module yang akan digunakan oleh components atau modules, ketik:\
*grunt compile-npm:client-name*

Jika hanya ingin meng-compile script atau style klien, ketik:\
*grunt compile-templates:client-name*

Jika hanya ingin meng-compile icon yang digunakan oleh klien, ketik:\
*grunt compile-icons:client-name*

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

**07. Registering Templates**

Coming soon!!

[https://github.com/fachririyanto/lurik/blob/master/settings/clients/starter.js](https://github.com/fachririyanto/lurik/blob/master/settings/clients/starter.js)

\
\
**Terima kasih.**
