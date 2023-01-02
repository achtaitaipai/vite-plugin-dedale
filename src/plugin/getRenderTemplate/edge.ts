import { Edge } from "edge.js";
import type { Route } from "../../types";
import {
  ConfigureEdge,
  GetRenderTemplate,
} from "../../types/getRenderTemplate";

let edge: Edge;
export const getRenderWithEdge: GetRenderTemplate<ConfigureEdge> = (
  templateDir,
  configure,
  devMode
) => {
  if (edge) return getRenderMethod(edge);
  edge = new Edge({ cache: !devMode });
  edge.mount(templateDir);
  if (configure) edge = configure(edge);
  return getRenderMethod(edge);
};

const getRenderMethod = (env: Edge) => (route: Route) =>
  env.renderSync(route.template, route.data);
