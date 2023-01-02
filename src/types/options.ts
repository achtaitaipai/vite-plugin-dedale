import type { Route } from "./route";
import { TemplateEngineSettings } from "./templateEngineSettings";

export type Options = {
  contentDir?: string;
  routes: Route[];
} & TemplateEngineSettings;
