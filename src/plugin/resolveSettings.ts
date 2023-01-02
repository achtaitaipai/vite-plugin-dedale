import path from "path";
import { Route } from "../../dist";
import { Options, TemplateEngineSettings } from "../types";

export const resolveSettings = (config: Options) => {
  const { routes, contentDir, ...templateEngineSettings } = config;
  templateEngineSettings.templateDir = path.join(
    process.cwd(),
    templateEngineSettings.templateDir
  );
  return {
    contentDir: contentDir && path.join(process.cwd(), contentDir),
    routes,
    templateEngineSettings,
  } satisfies {
    contentDir?: string;
    routes: Route[];
    templateEngineSettings: TemplateEngineSettings;
  };
};
