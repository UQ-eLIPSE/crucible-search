import { mount } from "@vue/test-utils";
import { describe, expect, vi, it } from "vitest";
import { flushPromises } from "@vue/test-utils";

import DisplayResult from "@/components/DisplayResult.vue";

describe("DisplayResult.vue", () => {
  vi.mock("@/components/DataAccessLayer", () => ({
    findData: vi.fn().mockResolvedValue([
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
    const mockRoute = {
      query: {
        tag: "test_tag",
      },
    };
    const mockRouter = {
      push: vi.fn(),
    };

    const wrapper = mount(DisplayResult, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await flushPromises();

    expect(wrapper.find(".results")).to.toBeTruthy;
    expect(wrapper.findAll(".linkToResource")).to.toBeTruthy;
    expect(wrapper.findAll(".linkToResource")[0].text()).toContain("label 1");
    expect(wrapper.findAll(".linkToResource")[1].text()).toContain("label 2");
    expect(wrapper.findAll(".tag-badges").length).toEqual(4);
    const tags = wrapper.findAll(".tag-badges").map((tag) => tag.text());
    expect(tags).toEqual(["test_tag", "TAG1", "test_tag", "TAG2"]);
  });
});
