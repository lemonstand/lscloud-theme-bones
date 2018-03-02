# Bones 2

Bones 2 is the second release of our barebones theme for Lemonstand. It's built with Foundation 6.4, Sass, and ES6/ES2015 (ES6 in all subsequent references). It's a great starting point for new LemonStand custom themes.

## What's Included?

Bones 2 has a full build pipeline tailored to standard web development tools. Included:

- NPM (Node Package Manager)
- Gulp 4 (Build Pipeline)
- Webpack 3 (Javascript module bundler)
- Sass (More powerful CSS)
- Imagemin (Image optimization)
- Font Awesome (For commonly required glyphs ie. social icons)
- Lemonsync.js configuration (Syncing between development environment and target store)

## Installation

Third-party packages are managed with NPM. If you don't already have NPM installed on your system, do that first.

### Prerequisites

#### NPM

See: https://www.npmjs.com/get-npm

#### Lemonsync

See: http://lemonsync-js.lemonstand.com/

### Ready to Install

Have the prerequisites installed? Great! Then all you need to do is run the following command from the directory that you downloaded this theme into:

```bash
npm install
```

This will install the entire build pipeline and all of it's dependencies. Once you've done that, you can move on to running build commands.

## Building the theme resources

To update the resource files for distribution, run the following:

```bash
🍋 npm run build
```

If everything works, you'll get a couple of notifications that files were built successfully, and you'll notice a new 'dist' folder at each of the following 4 locations:

- resources/css/dist
- resources/fonts/dist
- resources/images/dist
- resources/javascript/dist

Now you've got the final files the theme needs, and they're all in the locations the theme expects them to be, ready to be deployed to the store!

### Other build commands

Before we move on to deploying the theme to your store, there are a couple more build commands you should be aware of:

```bash
$ npm run build:watch
```

Tired of running a build every time you make a change? The above command will run a full build, and then watch for any changes you make (editing, creating, or deleting files) and re-run the necessary build steps again automatically until you cancel it.

```bash
$ npm run build:production
```

Finished with development and want to reduce file sizes and increase loading speed even more? Running a production build will omit sourcemaps and compress files even further for optimum performance. You won't be able to debug in the browser as easily anymore, but customers will be happy that the store performs faster!

## Deploying

To actually get your theme deployed to a store, you'll need to use Lemonsync.js. If you haven't installed this yet, refer back to the [installation section](#installation).

### LemonSync

Lemonsync (our command line theme sync tool) requires a `lemonsync.json` file in your theme's root directory. This file tells it where your store is, and what files it should sync.

We've included a sample file in this theme for you. Rename `lemonsync.sample.json` to `lemonsync.json`, open it up and adjust the `theme_code`, `store`, and `api_token` values to match the ones for your store.

You probably won't need to make any changes to `ignore_patterns`, we've already set it up so that only the files needed by the store are synced.

You should only need to edit `ignore_patterns` if you change the directory structure of the theme, add new configuration files, or if the system you work on generates any other files that don't need to be synced.

## Configuration

Sooner or later you'll need to adjust the way your theme is configured. Here's a rundown for the major areas you'll probably be interested in reconfiguring.

### Theme Settings

Lemonstand allows developers to define _theme settings_ which allow non-technical users to adjust values used throughout the theme's code via a store's /backend. These are defined in the **theme.yaml** file at the root of the theme, which should look something like:

```yaml
name: 'Bones V2'
engine: twig
404: home
customFields:
    storeTitle: { type: text, title: 'Store Name', default: 'This Shop' }
    storeLogo: { type: image, title: 'Store Logo', default: '@images/dist/bones-logo.svg' }
    footerLegalText: { type: text, title: 'Footer Legal Text', default: '© 2017 LemonStand eCommerce Inc.' }
    facebookLink: { type: text, title: 'Facebook Social Account Link', default: '' }
    twitterLink: { type: text, title: 'Twitter Social Account Link', default: '' }
    instagramLink: { type: text, title: 'Instagram Social Account Link', default: '' }
    stickyHeader: { type: checkbox, title: 'Keep header menu on the page as user scrolls', default: true }
    fillWindow: { type: checkbox, title: 'Keep footer at bottom of screen on short pages', default: true }
    enableReviews: { type: checkbox, title: 'Show reviews on the product page', default: true }
    enableRatings: { type: checkbox, title: 'Show ratings on the product page', default: true }
    enableCartUpsells: {type: checkbox, title: 'Show upsells on the cart page', default: true }
    homeNewsletterSubscribe: { type: checkbox, title: 'Show newsletter subscription form on homepage', default: true }
```

For more details, check out the [documentation](https://docs.lemonstand.com/themes/theme-customization-options#hidden-developer-features).

### Gulp

Gulp is the tool that manages the build process for this theme. We've included a `gulp-config.json` file which allows some customization of the build process. By default, it looks something like this:

```JSON
{
  "COMPATIBILITY": [
    "last 2 versions",
    "ie >= 9",
    "ios >= 7"
  ],
  "PATHS": {
    "sass": [
      "node_modules/font-awesome/scss",
      "node_modules/foundation-sites/scss",
      "node_modules/motion-ui/src"
    ]
  }
}
```

Specifically, **COMPATIBILITY** is passed in to **gulp-autoprefixer** to auto-generate browser-specific CSS, while `PATHS.sass` makes third-party Sass/CSS libraries available to be imported within `app.scss`.

The actual build pipeline is defined within `gulpfile.babel.js`. The .babel part tells gulp to run the file through an ES6 pre-processor, allowing ES6 to be used within the file itself. If you feel the need to modify the way the pipeline works, refer to Gulp 4.0's [documentation](https://github.com/gulpjs/gulp/tree/4.0).

### Sass

The build pipeline uses `gulp-sass` to combine all source SASS files into a single .css file with the following configuration (from `gulpfile.babel.js`):

```JSON
{
    style: 'expanded',
    includePaths: gulpConfig.PATHS.sass
}
```

If you'd like to adjust the configuration further than that, refer to the [documentation for gulp-sass](https://www.npmjs.com/package/gulp-sass) or the underlying [node-sass](https://github.com/sass/node-sass) which it wraps.

#### Sass Linting

Before the build pipeline converts the Sass into CSS, it runs the code through `gulp-sass-lint` with the following configuration (from `sass-lint.json`)

```JSON
{
	"rules": {
		"force-element-nesting": 0,
		"property-sort-order": 0,
		"no-important": 0,
		"nesting-depth": [ 1, {
				"max-depth": 7
		}]
	}
}
```

Note that **gulp-sass-lint** enforces many rules by default, and that the configuration above is actually relaxing some of those rules. Warnings generated during linting will be reported at the command line, while errors will be reported and also prevent the Sass code from being built.

See the [documentation for gulp-sass-lint](https://www.npmjs.com/package/gulp-sass-lint), or the underlying [sass-lint](https://github.com/sasstools/sass-lint) that it wraps if you wish to update your linting configuration.

### Javascript

Javascript bundling is handled by Webpack 3, combining all source .js files (with ES6 syntax allowed) into a single browser-friendly .js file. It uses the following configuration (from **gulpfile.babel.js**):

```javascript
const webpackConfig = {
  devtool: PRODUCTION ? false : 'source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  output: {
    filename: 'app.min.js'
  }
};
```

If you'd like to adjust it's configuration, refer to Webpack 3's [documentation](https://webpack.js.org/concepts/).

#### Javascript LINT

Before the build pipeline converts the ES6 Javacript into browser-friendly Javascript, it runs the code through `gulp-jshint` with the configuration stored in `.jshintrc` (file contents omitted due to length).

Like `gulp-sass-lint`, we've configured the pipeline to prevent Javascript from being built if `gulp-jshint` produces any errors while linting the source files.

To adjust the linting configuration, see the [documentation for gulp-jshint](https://www.npmjs.com/package/gulp-jshint) or its underlying library [jshint](http://jshint.com/docs/).

### Optimising images

Images used in this theme also go through the build pipeline. `gulp-imagemin` is used to reduce file sizes of images, using the following configuration (from `gulpfile.babel.js`):

```JSON
{
    progressive: true
}
```

To adjust it's configuration, refer to the [documentation for gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) or its underlying library [imagemin](https://github.com/imagemin/imagemin).

## Development

The entire point of Bones is to provide a starting point for you to build your own theme from! Here are some guidelines to help you do just that.

### HTML / Twig

HTML and Twig live together inside of .htm files to create the structure of your pages. These files can live within one of four folders depending on their purpose: templates, pages, partials and content.

#### Templates

Templates are used to define the broad structure of a page (ie. header, footer, sidebar placement, etc...) and to load in any resources that may be required by the pages that use it. As an example, you might end up having one for most of your store's pages, another for user account management pages, one for API pages, one for RSS feeds.

Bones only includes a **default.htm** to start with.

#### Pages

Every page is assigned a template (in Bones, every page uses the **default.htm** template) and a URL path. Each page is stored in its own sub-folder, and the .htm files within these folders folder define these properties, along with the structure of that particular page.

#### Partials

Partials are pieces of HTML and Twig that are either reused in multiple locations, or need to be dynamically reloaded without refreshing the entire page. Partials currently cannot be stored within sub-folders.

#### Content

This folder contains Widget Blocks, which are very similar to partials except that they are shown in the /backend and intended to be edited by non-technical users. Like partials, Widget Blocks currently cannot be stored within sub-folders.

Keep an eye on Lemonsync! If it tells you that the remote store has updates to files that you don't have locally, it's likely to be changes made within these files. Be sure to sync them down to your local environment and commit them version control, otherwise you may end up overwriting them and losing the changes!

### CSS

This theme uses [Sass](http://sass-lang.com/) instead of plain CSS (though plain CSS is perfectly valid Sass!). Sass is a much more powerful way of writing CSS rules.

Note: Because browsers don't understand Sass itself, it must be built into standard CSS before it will work. Which is why we've included a build pipeline in this theme that is already set up to do that for you! Just check out the instructions in the [building section](#building).

#### custom.css

Not everyone is interested in learning Sass, or in running a build pipeline every time they want to make a change. While we recommend you use Sass and take advantage of the benefits the build pipeline offers you, sometimes you'll have a client that wants to be able to make some tweaks themselves and doesn't want to be hassled jumping through hoops.

That's why we've included a `custom.css` file. This file is loaded in after the `app.min.css` file that's generated from the Sass source files, so it can override any rules it needs to!

#### Sass

`resources/css/src/app.scss` is the root file that loads in every other Sass file. It should really only contain `@import` statements. The actual styles will be in the Sass partials that are imported.

Sass partials are named like `_button.scss`, but can be imported without the underscore or the .scss parts (i.e., `@import 'button'`). All of your actual styles should be contained in Sass partials. `app.scss` and the `index.scss` files should only be used for importing Sass partials.

Most of this file is bringing in the Foundation styling, but down at the bottom you'll see where we import our first-party styles:

```scss
// The files for the theme's scss.
@import 'global/index';
@import 'component/index';
@import 'partial/index';
@import 'page/index';
```

We've broken styles into the hierarchy above, loaded in that specific order with the following in mind:

Global styles should include custom helper classes (ie. .disabled), or styling that should be used site-wide (and which isn't covered by Foundation's settings that can be adjusted in `_foundation-settings.scss`).

Component styles are for more complex custom components that you intend to reuse, but that aren't partials themselves (ie. a custom-styled checkbox that requires a few nested divs and classes applied to them).

Partial styles should be used alongside HTML/Twig partials to style elements only when used in those partials.

Page styles should be used alongside HTML/Twige pages to style elements only on that page.

##### Third-party libraries

You'll want to load in any third-party Sass or CSS libraries within `app.scss` as well. For example, at the top of the
file you can see Font Awesome's styles being imported:

```scss
// Font Awesome
$fa-font-path: '../../fonts/dist';
@import 'font-awesome';
```

You may be wondering how Sass knows where to get `font-awesome` from? The Gulp configuration (`gulp-config.json`) tells the build pipeline
about third-party libraries that need to be made available. For more details, see the [configuration section](#configuration).

#### Fonts

There are a variety of ways for fonts to be loaded. For example, the font files used by Font Awesome are extracted from their node module and placed in the `resources/fonts/dist` folder, which Font Awesome then imports itself (with a little help from us to tell it where they are using $fa-font-path, see the example just above).

Depending on where you are getting your fonts, you may have to do a few things differently.

If you're planning on hosting your own font files, place them in the `fonts/src` folder, and then reference them in Sass (in a file like `resources/css/src/global/_fonts.scss`, for example).

##### Third-party libraries

Third-party tools for purchasing and/or hosting font files -- such as Google Fonts or Adobe Typekit -- have their own way of loading in the fonts you need. Follow whatever instructions they provide, which may include placing `<script>` tags in an HTML/Twig template, and/or some CSS into a Sass file (remember, plain CSS is still valid Sass).

### Javascript

This theme's Javascript files are written in ES6 (also known as ES2015). Like Sass and CSS, browsers can't normally handle ES6 Javascript. It does, however, provide some nice benefits to be able to write ES6 code, so the build pipeline allows us to write our Javascript in ES6 and then converts it into browser-friendly Javascript for us.

#### custom.js

We recommend writing your Javascript in ES6 (you really only need to understand how `import` statements work) and letting the build pipeline take care of the rest. But if you or your client can't be bothered, we've provided a `custom.js` which is loaded after the `app.min.js`. Any Javascript included in `custom.js` will execute after `app.min.js` has executed.


##### Third-party libraries

To use a third-party library in any of your ES6 Javascript, just install that library via NPM and then include an import statement for it at the top of any file you wish to use it in. An example:

```javascript
import $ from 'jquery';

$(document).ready(() => {
  'use strict';

  $(document).foundation();
});
```

### Images

Any images required by the theme can be placed in `resources/images/src`. They will be run through `gulp-imagemin` and will end up in `resources/images/dist`. Therefore any Twig that references these images should look like:

```twig
{{ 'images/dist/example.png' | theme_resource }}
```
