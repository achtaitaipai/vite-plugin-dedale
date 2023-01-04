import { Edge } from "edge.js";
import type { Route, ConfigureEdge, GetRenderTemplate } from "../../types";
import { makeGlobRoute, makeGlobRoutes } from "./globalTemplateVariables";

export const getRenderWithEdge: GetRenderTemplate<ConfigureEdge> = (
  templateDir,
  globals,
  configure,
  devMode = false
) => {
  const edge = new Edge({ cache: !devMode });
  edge.mount(templateDir);
  for (const key in globals) {
    edge.global(key, globals[key]);
  }
  return configure ? getRenderMethod(configure(edge)) : getRenderMethod(edge);
};

const getRenderMethod = (env: Edge) => (route: Route) =>
  env.renderSync(route.template, route.data);
