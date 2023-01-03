# Vite Plugin Dedale

## Table of Content

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Load Files](#load-files)
  - [`loadMdFile`](#loadmdfile)
    - [Parameters](#parameters)
    - [Returns](#returns)
  - [`loadMdFiles`](#loadmdfiles)
    - [Parameters](#parameters-1)
    - [Returns](#returns-1)
- [Utility Functions for Use in Templates](#utility-functions-for-use-in-templates)
  - [`routes`](#routes)
    - [Parameters](#parameters-2)
    - [Returns](#returns-2)
    - [Examples](#examples)
  - [`route`](#route)
    - [Parameters](#parameters-3)
    - [Returns](#returns-3)
    - [Examples](#examples-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

vite-plugin-dedale is a plugin for [Vite](https://vitejs.dev/) that helps you navigate the complexities of creating static sites, much like the mythological figure Daedalus (or "Dédale" in French).

vite-plugin-dedale offers a simple and flexible solution for managing the routes and templates of your static site. You can use JavaScript or TypeScript for your routes, and Nunjucks or Edge.js for your templates. vite-plugin-dedale also allows you to read Markdown files and retrieve their content and metadata.

When to use vite-plugin-dedale:

- If you need to generate a static site from variable data, such as a brochure website, a portfolio, a blog, or a documentation site

- If you want to use Nunjucks or Edge.js as your template engine and JavaScript or TypeScript for your routes

If vite-plugin-dedale doesn't meet your needs, you may want to consider other tools and plugins such as :

- [11ty](https://www.11ty.dev/)
- [Astro](https://astro.build/)
- [Vite-plugin-eleventy](https://github.com/Snugug/vite-plugin-eleventy) (whose code inspired the development of vite-plugin-dedale)
- [Vituum](https://vituum.dev/)
- [Vite-plugin-ssr](https://vite-plugin-ssr.com/).

## Getting Started

1. Install vite-plugin-dedale in your Vite project

   ```bash
   $ npm install --save-dev vite-plugin-dedale
   ```

2. Create a` vite.config.ts` file at the root of your project and add the following configuration:

   ```ts
   import { defineConfig } from "vite";
   import { dedale } from "vite-plugin-dedale";

   export default defineConfig({
     plugins: [
       dedale({
         templateDir: "templates",
         templateEngine: "nunjucks",
         routes: [
           {
             url: "/",
             template: "index.njk",
             data: {
               title: "Home",
             },
           },
           {
             url: "/about/",
             template: "index.njk",
             data: {
               title: "About Us",
               foo: "bar",
             },
           },
         ],
       }),
     ],
   });
   ```

3. "Create a 'templates' directory at the root of your project and add a Nunjucks template file called 'index.njk' with the following content:"
   ```nunjucks
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <title>{{ title }}</title>
     </head>
     <body>
       <h1>{{ title }}</h1>
       <p>Welcome to my site!</p>
       {% if foo %}
       <span>{{ foo }}</span>
       {% endif %}
      <div id="app"></div>
        <script type="module" src="/src/main.ts"></script>
     </body>
   </html>
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Visit http://localhost:5173/ or http://localhost:5173/about/ in your browser to see your static site in action.

## Configuration

vite-plugin-dedale accepts the following options in its configuration:

- `templateDir` (required): The path to the directory containing your templates.
- `contentDir` (optional): The path to the directory containing your content files (such as Markdown files). This option enables hot reloading of these files in development mode.
- `templateEngine` (required `nunjucks` | `edge`) defines the template engine to use for rendering routes.
- `configureTemplateEngine` (optional): A function that allows you to customize the template Engine environment . This function takes in a Nunjucks or Edgejs environment as an argument and returns a modified version of that environment. For more information on how to configure Nunjucks, refer to the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#addfilter) or the [Edge-js documentation](https://github.com/edge-js/edge).
- `routes` (required): An array of route objects, each with the following properties:
  - `url` (string): The URL for this route.
  - `template` (string): The name of the Nunjucks template to use for this route.
  - `data` (object, optional): An object containing data to be passed to the Nunjucks template for this route.

## Load Files

vite-plugin-dedale provides several utility functions for parsing and loading Markdown files:

### `loadMdFile`

Loads the content and frontmatter metadata from a single Markdown file.

```ts
import { loadMdFile } from "vite-plugin-dedale";

type Fontmatter = {
  title: string;
};

const aboutContent = loadMdFile<Frontmatter>("/content/page/about.md");

console.log(aboutContent.frontmatter.title); // "About us"
console.log(aboutContent.content); // "<p>...</p>"
```

#### Parameters

- `filePath` (string): The file path of the Markdown file.

#### Returns

An object with the following properties:

- `filepath` (string): The file path of the Markdown file.
- `filename` (string): The file name of the Markdown file.
- `frontmatter` (T): The frontmatter metadata of the file.
- `content` (string): The parsed content of the file.

### `loadMdFiles`

Loads the content and frontmatter metadata from all Markdown files in the first level of the specified directory.

```ts
import { loadAllMdFilesFrom } from "vite-plugin-dedale";

type ArticleFrontmatter = {
  title: string;
  date: string;
};

const articles = loadAllMdFilesFrom<ArticleFrontmatter>("/content/articles");

console.log(articles[0].frontmatter.title); // "My Blog Post"
console.log(articles[0].content); // "<p>This is the content of my blog post.</p>"
```

#### Parameters

- `filePath` (string): The file path of the Markdown file.

#### Returns

An array of objects, each with the following properties:

- `filepath` (string): The file path of the Markdown file.
- `filename` (string): The file name of the Markdown file.
- `frontmatter` (T): The frontmatter metadata of the file.
- `content` (string): The parsed content of the file.

## Utility Functions for Use in Templates

vite-plugin-dedale provides two utility functions that can be used in Nunjucks or Edge.js templates:

### `routes`

Returns an array of all routes that match the provided pattern.

#### Parameters

- `pattern` (string): A pattern that uses [glob syntax](https://github.com/isaacs/node-glob#glob-primer) to match the routes.

#### Returns

An array of objects, each representing a route with the following properties:

- `url` (string): The URL of the route.
- `template` (string): The path to the Nunjucks template file.
- `data` (object): An optional data object that will be passed to the template when rendering the route.

#### Examples

nunjucks :

```nunjucks
{% for route in routes('/blog/*') %}
	<a href="{{ route.url }}">{{ route.data.title }}</a>
{% endfor %}
```

edge.js :

```edge.js
@each(route in routes('/blog/*'))
	<a href="{{ route.url }}">{{ route.data.title }}</a>
@end
```

### `route`

Returns the first route that matches the provided pattern.

#### Parameters

- `pattern` (string): A pattern that uses [glob syntax](https://github.com/isaacs/node-glob#glob-primer) to match the route.

#### Returns

An object representing the route with the following properties:

- `url` (string): The URL of the route.
- `template` (string): The path to the Nunjucks template file.
- `data` (object): An optional data object that will be passed to the template when rendering the route.

#### Examples

nunjucks :

```nunjucks
{% set aboutRoute = route('/about/') %}
{% if aboutRoute %}
	<a href="{{ aboutRoute.url }}">About</a>
{% endif %}
```

edge.js :

```edge.js
@set('aboutRoute',route('/about/'))
@if(aboutRoute)
	<a href="{{ aboutRoute.url }}">About</a>
@endif
```
