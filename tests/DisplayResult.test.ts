import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { nextTick } from "vue";
import DisplayResult from "@/components/DisplayResult.vue";

describe("DisplayResult.vue", () => {
  it("displays the correct result", async () => {
    const mockRoute = {
      params: {
        tag: "VET",
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

    // Set searchResults as a ref
    wrapper.vm.searchResults = [
      {
        _id: "1",
        label: "Test Result",
        tags: ["tag1", "tag2"],
        url: "http://test.com",
      },
    ];

    await wrapper.vm.$nextTick();
    await nextTick();

    console.log("", wrapper.text());
    console.log(wrapper.findAll(".badgesOfsearchData"));
    expect(wrapper.find(".results")).to.toBeTruthy;
    expect(wrapper.find(".linkToResource")).to.toBeTruthy;
    expect(wrapper.find(".linkToResource").text).toContain("Test Result");
    expect(wrapper.findAll(".badgesOfsearchData").length).toEqual(2);
  });
});
