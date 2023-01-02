import { ConfigureEdge, ConfigureNunjucks } from "./getRenderTemplate";

type ConfigureEngine = {
  nunjucks: ConfigureNunjucks;
  edge: ConfigureEdge;
};
export type TemplateEnginKey = keyof ConfigureEngine;

type TemplateEngineSettingsGeneric<T extends TemplateEnginKey> = {
  templateDir: string;
  templateEngine: T;
  configureTemplateEngine?: ConfigureEngine[T];
};

export type TemplateEngineSettings = {
  [K in TemplateEnginKey]: TemplateEngineSettingsGeneric<K>;
}[TemplateEnginKey];
