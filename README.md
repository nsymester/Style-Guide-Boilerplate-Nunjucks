# Style-Guide-Boilerplate v3.5.0

This project is a fork of Brett Jankord's Style Guide Boilerplate. I've pretty much left this README as is, with a few minor changes for installation and compiling.

A starting point for crafting living style guides.

[View Demo](http://nsymester.github.io/Style-Guide-Boilerplate/demo.html)

_Note: Sample patterns have been included in the demo. Your site will have its own unique patterns._

![Screenshot](http://nsymester.github.io/Style-Guide-Boilerplate/images/screenshot.png)

## Getting Started With Style Guide Boilerplate

### Download the Style Guide Boilerplate

You can clone, fork, or download the repo from GitHub.
Once you have the files for **Style Guide Boilerplate**, you'll create a directory on your site for them.

### Set up a directory on your site for the style guide

I recommend creating a directory named `style-guide` in your site's root directory.

### Upload the Style Guide Boilerplate files

**Style Guide Boilerplate** has been updated to use Nunjucks. I've replaced the PHP files so you're not reliant on any server technology to get it up and running.

Make sure you run the following to download the plugins needed to compile the project:

```bash
$ npm i
```

When compiled its just a flat html. Upload the files from the GitHub repo to your newly created directory.

### Hook up your own CSS into the style guide

In the `<head>` of **Style Guide Boilerplate** are custom styles for the boilerplate itself. These have all been prefixed with sg- so they hopefully shouldn't cause any conflicts with your website's own styles.

Below the custom styles for the boilerplate, you will add in your own custom stylesheet(s) which you use on your live site.

```html
<!-- Style Guide Boilerplate Styles -->
<link rel="stylesheet" href="css/sg-style.css" />

<!-- Replace below stylesheet with your own stylesheet -->
<link rel="stylesheet" href="css/style.css" />
```

### Review your live site CSS

You should be able to go to `yoursite.com/style-guide/` and see how your live site's CSS affects base elements.
The last step is creating your site's custom patterns/modules.

### Create custom patterns

To create custom patterns like buttons, breadcrumbs, alert messages, etc., create a new .html file and add your HTML markup into the file.

Save the file as `pattern-name.html` into the `markup/patterns` directory inside of your `style-guide` directory.

You should now be able to see the new patterns at `yoursite.com/style-guide/`

### Create personalized documentation

You can use markdown or html to create personalized documentation for your examples. Create a new .md and .html file and name it whatever your markup snippet file is named.

Save the file as `markup-name.md` and `markup-name.html` into the `doc/base` or `doc/patterns` directory inside of your `style-guide` directory.

For example, if you want to create doc for `markup/patterns/breadcrumbs.html`, create a file called `breadcrumbs.md` or `breadcrumbs.html` and save it into `doc/patterns`.

You should now be able to see the new doc at `yoursite.com/style-guide/`

## Running the app

You can run the application with browser-sync web server. Run the following command:

```bash
$ npm run start
```

Now, browse to [http://localhost:3000](http://localhost:3000) to see the website.

## Generating static HTML style guide

This generates a static `index.html` file in the `dist` folder.

## Browser Support

I've built **Style Guide Boilerplate** with progressive enhancement in mind to work on a wide range of browsers.

Known supported browsers include:

- Chrome
- Firefox
- Safari
- Opera
- IE8+
- Safari for iOS
- Stock Android Browser (4.0+)

Tested with [BrowserStack](https://www.browserstack.com/).

[![BrowserStack](https://raw.githubusercontent.com/bjankord/Style-Guide-Boilerplate/master/browserstack-logo-600x315.png)](https://www.browserstack.com/)

If you come across any bugs, or have any other issues with the boilerplate, please open an issue here on GitHub.

## Additional Resources

[Styleguides.io](http://styleguides.io)

[Front-end Style Guides](http://24ways.org/2011/front-end-style-guides/)

[Front-end Style Guide Roundup](https://gimmebar.com/collection/4ecd439c2f0aaad734000022/front-end-styleguides)

[Future-Friendly Style Guides](https://speakerdeck.com/lukebrooker/future-friendly-style-guides)

[HTML KickStart](http://www.99lime.com/elements/)

[Oli.jp Style Guide](http://oli.jp/2011/style-guide/)

[Jeremy Keith's Pattern Primer](http://adactio.com/journal/5028/)

[Paul Robert Llyod's Style Guide](http://www.paulrobertlloyd.com/about/styleguide/)

[Pears](http://pea.rs/)

[Starbucks Style Guide](http://www.starbucks.com/static/reference/styleguide/)

## Credit

Thanks to:

Jeremy Keith for letting me build on top of [Pattern Primer](https://github.com/adactio/Pattern-Primer).

## Ports

- A nodejs port using handlebars is available at [Style-Guide-Boilerplate-nodejs](https://github.com/DeadlyBrad42/Style-Guide-Boilerplate-nodejs).
- A ruby port avaiable at [Rails_App_Style_Guide](https://github.com/JoshuaMSchultz/Rails_App_Style_Guide)

## Contributing to this project

Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

- [Bug reports](CONTRIBUTING.md#bugs)
- [Feature requests](CONTRIBUTING.md#features)
- [Pull requests](CONTRIBUTING.md#pull-requests)

## Licensing

**Style Guide Boilerplate** is licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License)
