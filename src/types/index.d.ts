export type PluginOptions = {
  dataLink?: string;
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $dataLink: string;
  }
}
