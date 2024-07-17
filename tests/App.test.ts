import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { createSearchFilterPlugin } from "@/SearchFilterPlugin.ts";
import { projectRoutes } from "@/router/projectRoutes";

const mockPlugin = (app: any) => {
  createSearchFilterPlugin(app, { router: projectRoutes });
};

describe("App.vue", () => {
  it("renders App component", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [projectRoutes, mockPlugin],
      },
    });
    await projectRoutes.isReady();
    expect(wrapper.exists()).toBe(true);
  });
});
