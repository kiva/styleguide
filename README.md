# Kiva's living styleguide
http://styleguide.kiva.org/

This is the "living styleguide" for the lending website of [Kiva.org](https:/www.kiva.org). It is built using [Pattern Lab](http://patternlab.io/) - a creation of Brad Frost and Dave Olsen. It also incorporates the [Foundation](http://http://foundation.zurb.com/) framework from Zurb, Inc. It follows the principles of "[atomic design](http://bradfrost.com/blog/post/atomic-web-design/)."

This styleguide was initiated in 2016 in connection with a project to update the design of Kiva's lending website and to make it responsive.

>“A style guide (pattern library) is almost the de facto deliverable of any responsive redesign.”
> -- Ethan Marcotte

## How Kiva uses this styleguide
The styleguide is both a **design and prototyping tool** for "responsive" content and pages and a **source for reusable content exported to the lender website**.

**Design and prototyping:** Before implementing HTML and (S)CSS on the lender website, pages and the elements that comprise them can be figured out, built, reviewed and fine-tuned on the styleguide site. The Pattern Lab tool allows elements and pages to be viewed and evaluated across a spectrum of screen widths.

**Export to site / copy to CMS:** Once work in the styleguide has been accepted by stakeholders, it is propagated to Kiva's lender website in one of two ways:
1. Mustache files, CSS, and some Javascript are exported into the lender site codebase via a styleguide release process for use in rendering www pages.
a. Virtually all **CSS** used on the www site is authored in styleguide and exported. 
b. Virtually all **Mustache templates** rendered into HTML on the website is authored in styleguide and exported in this way. 
c. Key portions of **Javascript** (notably all Javascript used by the Foundation framework) used on www is packaged in the styleguide release process and exported for use by www.

1. Rendered content and pages that will be served from Kiva's content management system (CMS) is copy-pasted to CMS pages once their design and content are accepted.

## About Pattern Lab
- [Pattern Lab Website](http://patternlab.io/)
- [About Pattern Lab](http://patternlab.io/about.html)
- [Documentation](http://patternlab.io/docs/index.html)
- [Demo](http://demo.patternlab.io/)

The PHP version of Pattern Lab is, at its core, a static site generator. It combines platform-agnostic assets, like the [Mustache](http://mustache.github.io/)-based patterns and the JavaScript-based viewer, with a PHP-based "builder" that transforms and dynamically builds the Pattern Lab site. By making it a static site generator, Pattern Lab strongly separates patterns, data, and presentation from build logic. 

## Demo

You can play with a demo of the front-end of Pattern Lab at [demo.patternlab.io](http://demo.patternlab.io).

## Getting Started

* [Requirements](http://patternlab.io/docs/requirements.html)
* [Installing the PHP Version of Pattern Lab](http://patternlab.io/docs/installation.html)
* [Upgrading the PHP Version of Pattern Lab](http://patternlab.io/docs/upgrading.html)
* [Generating the Pattern Lab Website for the First Time](http://patternlab.io/docs/first-run.html)
* [Editing the Pattern Lab Website Source Files](http://patternlab.io/docs/editing-source-files.html)
* [Using the Command-line Options](http://patternlab.io/docs/command-line.html)
* [Command Prompt on Windows](http://patternlab.io/docs/command-prompt-windows.html)

## Working with Patterns

Patterns are the core element of Pattern Lab. Understanding how they work is the key to getting the most out of the system. Patterns use [Mustache](http://mustache.github.io/) so please read [Mustache's docs](http://mustache.github.io/mustache.5.html) as well.

* [How Patterns Are Organized](http://patternlab.io/docs/pattern-organization.html)
* [Adding New Patterns](http://patternlab.io/docs/pattern-add-new.html)
* [Reorganizing Patterns](http://patternlab.io/docs/pattern-reorganizing.html)
* [Including One Pattern Within Another via Partials](http://patternlab.io/docs/pattern-including.html)
* [Managing Assets for a Pattern: JavaScript, images, CSS, etc.](http://patternlab.io/docs/pattern-managing-assets.html)
* [Modifying the Pattern Header and Footer](http://patternlab.io/docs/pattern-header-footer.html)
* [Using Pseudo-Patterns](http://patternlab.io/docs/pattern-pseudo-patterns.html)
* [Using Pattern Parameters](http://patternlab.io/docs/pattern-parameters.html)
* [Using Pattern State](http://patternlab.io/docs/pattern-states.html)
* ["Hiding" Patterns in the Navigation](http://patternlab.io/docs/pattern-hiding.html)
* [Adding Annotations](http://patternlab.io/docs/pattern-adding-annotations.html)
* [Viewing Patterns on a Mobile Device](http://patternlab.io/docs/pattern-mobile-view.html)

## Creating & Working With Dynamic Data for a Pattern

The PHP version of Pattern Lab utilizes Mustache as the template language for patterns. In addition to allowing for the [inclusion of one pattern within another](http://patternlab.io/docs/pattern-including.html) it also gives pattern developers the ability to include variables. This means that attributes like image sources can be centralized in one file for easy modification across one or more patterns. The PHP version of Pattern Lab uses a JSON file, `source/_data/data.json`, to centralize many of these attributes.

* [Introduction to JSON & Mustache Variables](http://patternlab.io/docs/data-json-mustache.html)
* [Overriding the Central `data.json` Values with Pattern-specific Values](http://patternlab.io/docs/data-pattern-specific.html)
* [Linking to Patterns with Pattern Lab's Default `link` Variable](http://patternlab.io/docs/data-link-variable.html)
* [Creating Lists with Pattern Lab's Default `listItems` Variable](http://patternlab.io/docs/data-listitems.html)

## Using Pattern Lab's Advanced Features

By default, the Pattern Lab assets can be manually generated and the Pattern Lab site manually refreshed but who wants to waste time doing that? Here are some ways that Pattern Lab can make your development workflow a little smoother:

* [Watching for Changes and Auto-Regenerating Patterns](http://patternlab.io/docs/advanced-auto-regenerate.html)
* [Auto-Reloading the Browser Window When Changes Are Made](http://patternlab.io/docs/advanced-reload-browser.html)
* [Multi-browser & Multi-device Testing with Page Follow](http://patternlab.io/docs/advanced-page-follow.html)
* [Keyboard Shortcuts](http://patternlab.io/docs/advanced-keyboard-shortcuts.html)
* [Special Pattern Lab-specific Query String Variables ](http://patternlab.io/docs/pattern-linking.html)
* [Preventing the Cleaning of public/](http://patternlab.io/docs/advanced-clean-public.html)
* [Generating CSS](http://patternlab.io/docs/advanced-generating-css.html)
* [Modifying the Pattern Lab Nav](http://patternlab.io/docs/advanced-pattern-lab-nav.html)
* [Editing the config.ini Options](http://patternlab.io/docs/advanced-config-options.html)
* [Integration with Compass](http://patternlab.io/docs/advanced-integration-with-compass.html)
