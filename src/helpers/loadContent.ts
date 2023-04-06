import frontmatter from "front-matter";
import { glob } from "glob";
import { marked } from "marked";
import fs from "node:fs";

/**
 * A file with Markdown content and frontmatter metadata.
 * @template T The type of the frontmatter metadata.
 */
type MdFile<T extends Record<string, any>> = {
  filepath: string;
  filename: string;
  frontmatter: T;
  raw: string;
  content: string;
  headings: Heading[];
};

/**
 *  A list of headings in the Markdown document.
 */
type Heading = { depth: number; text: string; slug: string };

/**
 * Parses the content and frontmatter metadata from a Markdown file.
 * @template T The type of the frontmatter metadata.
 * @param {string} url The file path of the Markdown file.
 * @returns {MdFile<T>} The parsed file.
 */
const parseFile = <T extends Record<string, any>>(url: string): MdFile<T> => {
  const filename = url.replace(/(^.*[\\\/])|(\..*)/g, "");
  const raw = fs.readFileSync(url, "utf8");
  const data = frontmatter(raw);
  return {
    filepath: url,
    filename,
    frontmatter: data.attributes as T,
    raw: data.body,
    content: marked.parse(data.body),
    headings: getHeadings(data.body),
  };
};

type HeadingToken = {
  depth: number;
  text: string;
} & marked.Token;

/**
 *
 * @param markdown markdown document
 * @returns {Heading[]} A list of headings (h1 -> h6) in the Markdown document with associated metadata.
 */

const getHeadings = (markdown: string) => {
  const slugger = new marked.Slugger();
  const tokens = marked.lexer(markdown);
  const headingTokens = tokens.filter(
    (token) => token.type === "heading"
  ) as HeadingToken[];
  return headingTokens.map(({ depth, text }) => ({
    depth,
    text,
    slug: slugger.slug(text),
  }));
};

/**
 * Loads the content and frontmatter metadata from a Markdown file.
 * @template T The type of the frontmatter metadata.
 * @param {string} filePath The file path of the Markdown file.
 * @returns {MdFile<T>} The parsed file with the following properties:
 * - `filepath`: The file path of the Markdown file.
 * - `filename`: The file name of the Markdown file.
 * - `frontmatter`: The frontmatter metadata of the file.
 * - `content`: The parsed content of the file.
 */
export const loadMdFile = <T extends Record<string, any>>(
  filePath: string
): MdFile<T> => {
  return parseFile<T>(filePath);
};

/**
 * @template T The type of the frontmatter metadata.
 * @param {string} directoryPath The file path of the directory containing the Markdown files.
 * @returns {MdFile<T>[]} An array of parsed files with the following properties:
 * - `filepath`: The file path of the Markdown file.
 * - `filename`: The file name of the Markdown file.
 * - `frontmatter`: The frontmatter metadata of the file.
 * - `content`: The parsed content of the file.
 */
export const loadAllMdFilesFrom = <T extends Record<string, any>>(
  directoryPath: string
): MdFile<T>[] => {
  const files = glob
    .sync(directoryPath + "/*.md")
    .map((file) => parseFile<T>(file));
  return files;
};
