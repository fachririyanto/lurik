# Lurik
:: A configurational framework for creating a modular static web templates.

-----

### What is Lurik?
**Lurik** is a configurational framework using JavaScript for building a modular static web templates. Lurik helped you build a modular web templates based on a components and a modules. Lurik is reusable and make it posible to load just a scripts or styles what a page need, thats make your site more faster.

Fyi, currently Lurik is used at BINUS University for building a CSS Framework called BINUS-UI.


### Lurik Elements
Lurik has four fundamental elements, its *Core*, *Helpers*, *Components*, and *Modules*.

- **Core**\
Its a basic code to help you build your templates, like Twitter Bootstrap, Bulma, Foundation or jQuery (if needed), etc.

- **Helpers**\
It's like an utilities code that you can use repeatly, it's a code like text-align, float-left, float-right, clearfix, etc.

- **Components**\
A small pieces of a templates like post-item, avatar, form element such as textbox, checkbox, etc.

- **Modules**\
It's a module of a templates like footer, header, gallery, etc.

-----

### Get Started

**00. Requirements**

Before installing Lurik, make sure you have installed the following software:
- [NodeJS](https://nodejs.org/en/)
- [Grunt](https://gruntjs.com/)
- [SASS](https://sass-lang.com/)

-----

**01. Installation**

Open terminal and point it to Lurik folder and then type:\
```npm install```

Next, type code below to installing a template:\
```grunt compile:client-name```

As an example, you can type:\
```grunt compile:lurik```

Because we already create an example template called "lurik". For the configuration, you can see file “[settings/clients/lurik.json](https://github.com/fachririyanto/lurik/blob/master/settings/clients/lurik.json)”.

After you installed, open "index.html" file to see the demo of the template.

-----

**02. Main Command**

For installign client for the first time, type:\
```grunt compile:client-name```

For downloading NPM modules which used by components, helpers or modules, type:\
```grunt compile-npm:client-name```

If you just want to compiling a client scripts or styles, type:\
```grunt compile-templates:client-name```

And if you just want to compiling an icons which used by client, type:\
```grunt compile-icons:client-name```

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
**Thank you.**
