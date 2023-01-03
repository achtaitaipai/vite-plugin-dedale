import type { Plugin } from "vite";
import type { Options, RenderRoute } from "../types";
import path from "node:path";
import { getRenderTemplate } from "./getRenderTemplate";
import { parseRoute } from "./parseRoute";
import { resolveSettings } from "./resolveSettings";

export const plugin = (options: Options): Plugin => {
  const { routes, contentDir, templateEngineSettings } =
    resolveSettings(options);

  let renderTemplate: RenderRoute;
  return {
    name: "vite-plugin-dedale",
    enforce: "pre",

    config(_, { command, mode }) {
      if (command === "build") {
        renderTemplate = getRenderTemplate(
          templateEngineSettings,
          routes,
          false
        );
        const input = routes.map(({ url }) => parseRoute(url));
        return {
          build: {
            rollupOptions: {
              input,
            },
          },
        };
      } else if (mode === "development") {
        renderTemplate = getRenderTemplate(
          templateEngineSettings,
          routes,
          true
        );
      }
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url as string;
        if (!url) return;
        const currentRoute = routes.find((route) => route.url === url);
        if (!currentRoute) return next();
        try {
          const html = renderTemplate(currentRoute);
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

    resolveId(id) {
      if (routes.find(({ url }) => parseRoute(url) === id)) {
        return id;
      }

      return null;
    },

    load(id) {
      const route = routes.find(({ url }) => parseRoute(url) === id);
      if (id.endsWith(".html") && route) {
        return renderTemplate(route);
      }
      return null;
    },

    handleHotUpdate(context) {
      const filePath = path.join(context.file);
      if (filePath.includes(templateEngineSettings.templateDir))
        context.server.ws.send({
          type: "full-reload",
        });
      else if (contentDir && filePath.includes(contentDir))
        context.server.restart();
    },
  };
};
