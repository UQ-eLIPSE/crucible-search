import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CrucibleSearch from "@components/CrucibleSearch.vue";

describe("CrucibleSearch.vue", () => {
  it("renders App component", () => {
    const wrapper = mount(CrucibleSearch);
    expect(wrapper.exists()).toBe(true);
  });
});
