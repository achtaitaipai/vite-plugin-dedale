import path from "path";
import { Options } from "../types";

export const resolveSettings = (config: Options) => {
  const { routes, templateDir, contentDir, configureNunjucks } = config;
  return {
    templateDir: path.join(process.cwd(), templateDir),
    contentDir: contentDir && path.join(process.cwd(), contentDir),
    routes,
    configureNunjucks: configureNunjucks,
  };
};
