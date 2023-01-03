import type { Environment } from "nunjucks";
import type { Route } from "../../../dist";
import type { ConfigureNunjucks, GetRenderTemplate } from "../../types";
import nunjucks from "nunjucks";
import { makeGlobRoute, makeGlobRoutes } from "./global";

export const getRenderWithNunjucks: GetRenderTemplate<ConfigureNunjucks> = (
  templateDir,
  routes,
  configure,
  devMode = false
) => {
  const env = nunjucks.configure(templateDir, { watch: devMode });
  env.addGlobal("routes", makeGlobRoutes(routes));
  env.addGlobal("route", makeGlobRoute(routes));
  return configure ? getRenderMethod(configure(env)) : getRenderMethod(env);
};

const getRenderMethod = (env: Environment) => (route: Route) =>
  env.render(route.template, route.data);
