import { Environment as NunjucksEnv } from "nunjucks";
import type { Edge as EdgeJsEnv } from "edge.js";
import { RenderRoute } from ".";

export type ConfigureNunjucks = (env: NunjucksEnv) => NunjucksEnv;
export type ConfigureEdge = (env: EdgeJsEnv) => EdgeJsEnv;

export type GetRenderTemplate<T extends Function> = (
  templateDir: string,
  configure?: T,
  devMode?: boolean
) => RenderRoute;
