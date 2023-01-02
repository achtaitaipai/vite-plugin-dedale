import type { Environment } from "nunjucks";
import nunjucks from "nunjucks";
import { Route } from "../../../dist";
import { RenderRoute } from "../../types";
import {
  ConfigureNunjucks,
  GetRenderTemplate,
} from "../../types/getRenderTemplate";

let nunjucksEnv: RenderRoute;

export const getRenderWithNunjucks: GetRenderTemplate<ConfigureNunjucks> = (
  templateDir,
  configure,
  devMode
) => {
  if (nunjucksEnv) return nunjucksEnv;
  else {
    const env = nunjucks.configure(templateDir, { watch: !devMode });
    if (!configure) {
      return getRenderMethod(env);
    }
    return getRenderMethod(configure(env));
  }
};

const getRenderMethod = (env: Environment) => (route: Route) =>
  env.render(route.template, route.data);
