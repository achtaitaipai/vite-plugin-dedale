import type { Environment } from "nunjucks";
import type { Route } from "../../../dist";
import type { ConfigureNunjucks, GetRenderTemplate } from "../../types";
import nunjucks from "nunjucks";
import { makeGlobRoute, makeGlobRoutes } from "./globalTemplateVariables";

export const getRenderWithNunjucks: GetRenderTemplate<ConfigureNunjucks> = (
  templateDir,
  globals,
  configure,
  devMode = false
) => {
  const env = nunjucks.configure(templateDir, { watch: devMode });
  for (const key in globals) {
    env.addGlobal(key, globals[key]);
  }
  return configure ? getRenderMethod(configure(env)) : getRenderMethod(env);
};

const getRenderMethod = (env: Environment) => (route: Route) =>
  env.render(route.template, route.data);
