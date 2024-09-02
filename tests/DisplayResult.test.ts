import { mount } from "@vue/test-utils";
import { describe, expect, vi, it } from "vitest";
import { flushPromises } from "@vue/test-utils";
import DisplayResult from "@/components/DisplayResult.vue";
import { createApp } from "vue";

describe("DisplayResult.vue", () => {
  vi.mock("@/components/DataAccessLayer", () => ({
    findTagsData: vi.fn().mockResolvedValue([
      {
        _id: "1",
        label: "test label 1",
        tags: ["test_tag", "TAG1"],
        url: "http://example1.com",
      },
      {
        _id: "2",
        label: "test label 2",
        tags: ["test_tag", "TAG2"],
        url: "http://example2.com",
      },
    ]),
  }));
  it("displays the correct result", async () => {
    const app = createApp({});

    const mockRouter = {
      push: vi.fn(),
      currentRoute: {
        value: {
          query: {
            tag: "test_tag",
            searchResult: "test_tag",
            type: "tag",
            level: 5,
          },
        },
      },
    };

    const mockRouteQuery = {
      query: {
        tag: "test_tag",
      },
    };
    const mockRouterPushFun = {
      push: vi.fn(),
    };
    app.provide("$router", mockRouter);

    const wrapper = mount(DisplayResult, {
      global: {
        provide: {
          $router: mockRouter,
        },
        mocks: {
          $route: mockRouteQuery,
          $router: mockRouterPushFun,
        },
      },
    });

    await flushPromises();

    expect(wrapper.find(".results")).to.toBeTruthy;
    expect(wrapper.findAll(".linkToResource")).to.toBeTruthy;
    expect(wrapper.findAll(".linkToResource")[0].text()).toContain("label 1");
    expect(wrapper.findAll(".linkToResource")[1].text()).toContain("label 2");
  });
});
