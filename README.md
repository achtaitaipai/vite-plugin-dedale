# Vite Plugin Dedale

vite-plugin-dedale is a plugin for [Vite](https://vitejs.dev/) that helps you navigate the complexities of creating static sites, much like the mythological figure Daedalus (or "Dédale" in French).

vite-plugin-dedale offers a simple and flexible solution for managing the routes and templates of your static site. You can use JavaScript or TypeScript for your routes, and Nunjucks for your templates. vite-plugin-dedale also allows you to read Markdown files and retrieve their content and metadata.

When to use vite-plugin-dedale:

- If you need to generate a static site from variable data, such as a brochure website, a portfolio, a blog, or a documentation site

- If you want to use Nunjucks as your template engine and JavaScript or TypeScript for your routes

If vite-plugin-dedale doesn't meet your needs, you may want to consider other tools and plugins such as :

- [11ty](https://www.11ty.dev/)
- [Astro](https://astro.build/)
- [Vite-plugin-eleventy](https://github.com/Snugug/vite-plugin-eleventy) (whose code inspired the development of vite-plugin-dedale)
- [Vituum](https://vituum.dev/)
- [Vite-plugin-ssr](https://vite-plugin-ssr.com/).

## Installation

```bash
$ npm install --save-dev vite-plugin-dedale
```

## Configuration

vite-plugin-dedale accepts the following options in its configuration:

- `templateDir` (required): The path to the directory containing your Nunjucks templates.
- `contentDir` (optional): The path to the directory containing your content files (such as Markdown files). This option enables hot reloading of these files in development mode.
- `configureNunjucks` (optional): A function that allows you to customize the Nunjucks environment. This function takes in a Nunjucks environment as an argument and returns a modified version of that environment. For more information on how to configure Nunjucks, refer to the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#addfilter).
- `routes` (required): An array of route objects, each with the following properties:
  - `url` (string): The URL for this route.
  - `template` (string): The name of the Nunjucks template to use for this route.
  - `data` (object, optional): An object containing data to be passed to the Nunjucks template for this route.

### Example

```ts
//vite.config.ts
import { defineConfig } from "vite";
import { dedale } from "vite-plugin-dedale";

export default defineConfig({
  plugins: [
    dedale(
		{
		templateDir: "templates",
		contentDir: "content",
		configureNunjucks: (env) => {
			env.addGlobal("siteTitle", "MySite");
			return env;
		},
		routes: [
			{
				url: "/",
				template: "index.njk",
				data: {
					title: "Home",
					foo: "bar",
				},
			},
			{
				url: "/about/",
				template: "about.njk",
				data: {
					title: "About Us",
					truc: "bidule,"
				},
			},
		],
	});,
  ],
});
```

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

### Parameters

- `filePath` (string): The file path of the Markdown file.

### Returns

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

### Parameters

- `filePath` (string): The file path of the Markdown file.

### Returns

An array of objects, each with the following properties:

- `filepath` (string): The file path of the Markdown file.
- `filename` (string): The file name of the Markdown file.
- `frontmatter` (T): The frontmatter metadata of the file.
- `content` (string): The parsed content of the file.
