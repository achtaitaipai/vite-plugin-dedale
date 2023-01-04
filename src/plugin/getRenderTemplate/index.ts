import { match } from "ts-pattern";
import type { Route, TemplateEngineSettings } from "../../types";
import { getRenderWithEdge } from "./edge";
import { globalTemplateVariables } from "./globalTemplateVariables";
import { getRenderWithNunjucks } from "./nunjucks";

export { getRenderWithNunjucks as getNunjucksEnv } from "./nunjucks";

export const getRenderTemplate = (
  settings: TemplateEngineSettings,
  routes: Route[],
  base: string,
  devMode: boolean
) => {
  const globals = globalTemplateVariables(base, devMode, routes);
  return match<TemplateEngineSettings>(settings)
    .with({ templateEngine: "edge" }, (settings) =>
      getRenderWithEdge(
        settings.templateDir,
        globals,
        settings.configureTemplateEngine,
        devMode
      )
    )
    .with({ templateEngine: "nunjucks" }, (settings) =>
      getRenderWithNunjucks(
        settings.templateDir,
        globals,
        settings.configureTemplateEngine,
        devMode
      )
    )
    .exhaustive();
};
