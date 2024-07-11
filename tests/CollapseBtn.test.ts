import { describe, it, expect } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import CollapseBtn from "@/components/CollapseBtn.vue";
import { before } from "node:test";

describe("CollapseBtn.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(CollapseBtn, {
      props: { showDropdown: false },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("applies rotation class when showDropdown is true", () => {
    const wrapper = mount(CollapseBtn, {
      props: { showDropdown: true },
    });
    expect(wrapper.find(".collapse-btn-rotation").exists()).toBe(true);
  });

  it("does not apply rotation class when showDropdown is false", () => {
    const wrapper = mount(CollapseBtn, {
      props: { showDropdown: false },
    });
    expect(wrapper.find(".collapse-btn-rotation").exists()).toBe(false);
  });
});
