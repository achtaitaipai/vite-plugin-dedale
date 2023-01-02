import { match } from "ts-pattern";
import { TemplateEngineSettings, TemplateEnginKey } from "../../types";
import { getRenderWithEdge } from "./edge";
import { getRenderWithNunjucks } from "./nunjucks";

export { getRenderWithNunjucks as getNunjucksEnv } from "./nunjucks";

export const getRenderTemplate = (
  settings: TemplateEngineSettings,
  devMode = false
) =>
  match<TemplateEngineSettings>(settings)
    .with({ templateEngine: "edge" }, (settings) =>
      getRenderWithEdge(
        settings.templateDir,
        settings.configureTemplateEngine,
        devMode
      )
    )
    .with({ templateEngine: "nunjucks" }, (settings) =>
      getRenderWithNunjucks(
        settings.templateDir,
        settings.configureTemplateEngine,
        devMode
      )
    )
    .exhaustive();
