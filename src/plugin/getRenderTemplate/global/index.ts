import minimatch from "minimatch";
import { Route } from "../../../types";

export const makeGlobRoutes = (routes: Route[]) => (pattern: string) =>
  routes.filter((r) => minimatch(r.url, pattern));

export const makeGlobRoute = (routes: Route[]) => (pattern: string) =>
  routes.find((r) => minimatch(r.url, pattern));
