import type { Route } from "./route";
import type { Environment } from "nunjucks";

type NunjcksEnvironment = Environment;

export type Options = {
  templateDir: string;
  contentDir?: string;
  configureNunjucks?: (nunjucksEnv: NunjcksEnvironment) => NunjcksEnvironment;
  routes: Route[];
};
