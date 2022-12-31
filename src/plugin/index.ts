import path from "node:path";
import { Plugin } from "vite";
import { Options } from "../types";
import { parseRoute } from "./parseRoute";
import { getNunjucksEnv } from "./getNunjucksEnv";
import { resolveSettings } from "./resolveSettings";

export const plugin = (options: Options): Plugin => {
  const { routes, templateDir, contentDir, configureNunjucks } =
    resolveSettings(options);
  return {
    name: "vite-plugin-dedale",
    enforce: "pre",
    configureServer(server) {
      const nunjucks = getNunjucksEnv(templateDir, configureNunjucks, true);
      server.middlewares.use(async (req, res, next) => {
        const url = req.url;
        if (!url) return;
        const currentRoute = routes.find((route) => route.url === url);
        if (!currentRoute) return next();
        try {
          const html = nunjucks.render(currentRoute.template, {
            url,
            ...currentRoute.data,
          });
          const content = await server.transformIndexHtml(url, html);
          return res.end(content);
        } catch (error: any) {
          return res.end(
            error.message ??
              `something failed while rendering : ${currentRoute.url}`
          );
        }
      });
    },
    config(_, { command }) {
      if (command === "build") {
        const input = routes.map(({ url }) => parseRoute(url));
        return {
          build: {
            rollupOptions: {
              input,
            },
          },
        };
      }
    },

    resolveId(id) {
      if (routes.find(({ url }) => parseRoute(url) === id)) {
        return id;
      }

      return null;
    },

    load(id) {
      const route = routes.find(({ url }) => parseRoute(url) === id);
      if (id.endsWith(".html") && route) {
        const nunjucks = getNunjucksEnv(templateDir, configureNunjucks);
        return nunjucks.render(route.template, route.data);
      }
      return null;
    },
    handleHotUpdate(context) {
      const filePath = path.join(context.file);
      if (filePath.includes(templateDir))
        context.server.ws.send({
          type: "full-reload",
        });
      else if (contentDir && filePath.includes(contentDir))
        context.server.restart();
    },
  };
};
