import { Edge } from "edge.js";
import type { Route, ConfigureEdge, GetRenderTemplate } from "../../types";
import { makeGlobRoute, makeGlobRoutes } from "./global";

export const getRenderWithEdge: GetRenderTemplate<ConfigureEdge> = (
  templateDir,
  routes,
  configure,
  devMode = false
) => {
  const edge = new Edge({ cache: !devMode });
  edge.mount(templateDir);
  edge.global("routes", makeGlobRoutes(routes));
  edge.global("route", makeGlobRoute(routes));
  return configure ? getRenderMethod(configure(edge)) : getRenderMethod(edge);
};

const getRenderMethod = (env: Edge) => (route: Route) =>
  env.renderSync(route.template, route.data);
