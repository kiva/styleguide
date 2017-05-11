# Kiva's living styleguide
http://styleguide.kiva.org/

This is the "living styleguide" for the lending website of [Kiva.org](https:/www.kiva.org). It is built using [Pattern Lab](http://patternlab.io/) - a creation of Brad Frost and Dave Olsen. It also incorporates the [Foundation](http://http://foundation.zurb.com/) framework from Zurb, Inc. It follows the principles of "[atomic design](http://bradfrost.com/blog/post/atomic-web-design/)."

This styleguide was initiated in 2016 in connection with a project to 
update the design of Kiva's lending website and to make it responsive.

>“A style guide (pattern library) is almost the de facto deliverable 
of any responsive redesign.”
> -- Ethan Marcotte

## How Kiva uses this styleguide
The styleguide is both a **design and prototyping tool** for "responsive" 
content and pages and a **source for reusable content exported to the lender website**.

**Design and prototyping:** Before implementing HTML and (S)CSS on the lender 
website, pages and the elements that comprise them can be figured out, built, 
reviewed and fine-tuned on the styleguide site. The Pattern Lab tool allows 
elements and pages to be viewed and evaluated across a spectrum of screen widths.

**Export to site / copy to CMS:** Once work in the styleguide has been accepted 
by stakeholders, it is propagated to Kiva's lender website in one of two ways:
1. Mustache files, CSS, and some Javascript are exported into the lender site 
codebase via a styleguide release process for use in rendering www pages.
    - Virtually all **CSS** used on the www site is authored in styleguide 
    and exported. 
    - Virtually all **Mustache templates** rendered into HTML on the website 
    is authored in styleguide and exported in this way. 
    - Key portions of **Javascript** (notably all Javascript used by the 
    Foundation framework) used on www is packaged in the styleguide release 
    process and exported for use by www.

1. Rendered content and pages that will be served from Kiva's content management 
system (CMS) is copy-pasted to CMS pages once their design and content are accepted.

A note about two conditional attributes found in some mustache and json files - 
**"is-styleguide"** and **"is-standalone"**: These two attributes enable the viewing
within styleguide of elements that are typically not visible or not correctly formatted unless
they are contained within wrapping elements that provide their visibility and/or
formatting. The "is-styleguide" condition wraps content that should be applied / displayed
only when the content is viewed anywhere in styleguide. It is set true for the entire
 styleguide in the shared _data.json file. The "is-standalone" condition
wraps content that should be applied / displayed only when the element is viewed in
its standalone state, but not if the element is incorporated as part of a larger,
composed set of styleguide elements. It is set true by a companion .json file for
each specific file where it is applied.

More information about Kiva's adoption and use of this styleguide can be viewed in
a post on Kiva's engineering blog at https://pages.kiva.org/kivablog/2017/05/11/a-styleguide-for-kiva-now-open-source

## Pattern Lab - more informaiton
- [Pattern Lab Website](http://patternlab.io/)
- [About Pattern Lab](http://patternlab.io/about.html)
- [Documentation](http://patternlab.io/docs/index.html)
- [Demo](http://demo.patternlab.io/)
