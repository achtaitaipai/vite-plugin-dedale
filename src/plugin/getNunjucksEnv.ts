import type { Environment } from "nunjucks";
import nunjucks from "nunjucks";

let nunjucksEnv: Environment;

export const getNunjucksEnv = (
  templateDir: string,
  configure?: (env: Environment) => Environment,
  watch = false
) => {
  if (nunjucksEnv) return nunjucksEnv;
  else {
    const env = nunjucks.configure(templateDir, { watch });
    if (!configure) {
      return env;
    }
    return configure(env);
  }
};
