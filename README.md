# Bones V2
A barebones theme for Lemonstand built with Foundation 6.4, this is a great starting point from which to
build your own custom theme.

## Table of Contents
1. [What's Included](#whats-included)
2. [Installation](#installation)
3. [Building](#building)
1. [Deploying](#deploying)
1. [Configuration](#configuration)
1. [Development](#development)
1. [References](#references)

## What's Included?
This theme provides a full build pipeline tailored to common web development standards as well as Lemonstand-specific 
needs. Included are:

- NPM (Node Package Manager)
- Gulp 4 (Build Pipeline)
- Webpack 3 (Javascript module bundler)
- Sass (More powerful CSS)
- Imagemin (Image optimization)
- Font Awesome (For commonly required glyphs ie. social icons)
- Lemonsync.js (Syncing between development environment and target store)

Further details for each of these pieces and guidelines for development are provided below.

## Installation
All required third-party packages are managed with NPM. If you don't already have NPM installed on your system, 
follow the instructions in the link provided in Prerequisites below to install it first. 

Please also follow the instructions for installing Lemonsync.js if you haven't previously installed it (or if you've 
previously used the old Python version of Lemonsync at any point).

### Prerequisites
Rather than duplicate the instructions here, we've provided links to the installation instructions below.

#### NPM
https://www.npmjs.com/get-npm

#### Lemonsync
http://lemonsync-js.lemonstand.com/

### Ready to Install
Have the prerequisites installed? Great! Then all you need to do is run the following command from the directory that 
you downloaded this theme into:
```bash
npm install
```

This will install the entire build pipeline and all of it's dependencies. Once you've done that, you can move on to 
running build commands.

## Building
If you're already familiar with Lemonstand but aren't used to build pipelines, you may have noticed that major files
that the theme loads (ie. resources/dist/app.min.css) aren't actually included in this theme! 

That's because we only keep the source files (which are much nicer to work with) committed to version control, and let 
the build pipeline generate the final files (that are optimized to reduce their size and load faster, and aren't very 
human-readable) for us when we need them.

To generate final files for distribution, run the following:

```bash
npm run build
```
If everything works, you'll get a couple of notifications that files were built successfully, and you'll notice a new 
'dist' folder at each of the following 4 locations:

- resources/css/dist
- resources/fonts/dist
- resources/images/dist
- resources/javascript/dist

Now you've got the final files the theme needs, and they're all in the locations the theme
expects them to be, ready to be deployed to the store!

### Other build commands

Before we move on to deploying the theme to your store, there are a couple more build commands you should
be aware of:

```bash
npm run build:watch
```

Tired of running a build every time you make a change? The above command will run a full build, and then watch for any
changes you make (editing, creating, or deleting files) and re-run the necessary build steps again automatically until 
you cancel it.

```bash
npm run build:production
```

Finished with development and want to reduce file sizes and increase loading speed even more? Running a production build
will omit sourcemaps and compress files even further for optimum performance. You won't be able to debug in the browser 
as easily anymore, but customers will be happy that the store performs faster!

## Deploying

To actually get your theme deployed to a store, you'll need to use Lemonsync.js. If you haven't installed this yet, 
refer back to the [installation section](#installation).

### lemonsync.json
Lemonsync requires a lemonsync.json file in your theme's root directory. This file tells it where your store is, and 
what files it should sync. 

We've included a sample file in this theme for you. Just rename `lemonsync.sample.json` to `lemonsync.json`, then open 
it up and adjust the `theme_code`, `store`, and `api_token` values to match the ones for your store. 

You probably won't need to make any changes to `ignore_patterns`, we've already set it up so that only the files needed
by the store are synced. 

You should only need to edit `ignore_patterns` if you change the directory structure of the theme, add new 
configuration files, or if the system you work on generates any other files that don't need to be synced. 

### 
## Configuration

### Theme Settings

### Lemonsync

### Gulp

### Sass

### Javascript

### Imagemin

## Development

### HTML / Twig

#### templates

#### pages

#### partials

#### content

### CSS

#### custom.css

#### Sass

##### Third-party libraries

#### Fonts

##### Third-party libraries

### Javascript

#### custom.js

#### ES2015

##### Third-party libraries

### Images

## References
For convenience, we've included links to documentation that you should find useful:

- [Lemonstand](https://docs.lemonstand.com/)
- [Lemonsync](http://lemonsync-js.lemonstand.com/)
- [Twig](https://twig.symfony.com/doc/2.x/)
- [Foundation](https://foundation.zurb.com/sites/docs/)
- [Gulp](https://github.com/gulpjs/gulp/tree/4.0)
- [Webpack](https://webpack.js.org/)
- [Sass](http://sass-lang.com/)
- [Imagemin](https://github.com/sindresorhus/gulp-imagemin)
- [Font Awesome](http://fontawesome.io/examples/)