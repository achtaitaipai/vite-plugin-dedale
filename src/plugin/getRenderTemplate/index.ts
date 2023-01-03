import { match } from "ts-pattern";
import type { Route, TemplateEngineSettings } from "../../types";
import { getRenderWithEdge } from "./edge";
import { getRenderWithNunjucks } from "./nunjucks";

export { getRenderWithNunjucks as getNunjucksEnv } from "./nunjucks";

export const getRenderTemplate = (
  settings: TemplateEngineSettings,
  routes: Route[],
  devMode: boolean
) =>
  match<TemplateEngineSettings>(settings)
    .with({ templateEngine: "edge" }, (settings) =>
      getRenderWithEdge(
        settings.templateDir,
        routes,
        settings.configureTemplateEngine,
        devMode
      )
    )
    .with({ templateEngine: "nunjucks" }, (settings) =>
      getRenderWithNunjucks(
        settings.templateDir,
        routes,
        settings.configureTemplateEngine,
        devMode
      )
    )
    .exhaustive();
