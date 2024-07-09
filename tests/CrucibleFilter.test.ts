import { VueWrapper, mount } from "@vue/test-utils";
import CrucibleFilter from "../src/components/CrucibleFilter.vue";
import { beforeEach, describe, expect, it } from "vitest";

describe("CrucibleFilter", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(CrucibleFilter);
  });

  it("should be a Vue component", () => {
    expect(wrapper.vm).toBeTruthy();
  });
  it("After click the category(Taxonomy), should render a drop down with list of filter Tags", async () => {
    const label = wrapper.find(".crucible-filter-dropdown p");
    expect(wrapper.find("crucible-filter-dropdown-menu").exists()).toBe(false);
    label.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".crucible-filter-dropdown-menu").exists()).toBe(true);
  });
  it("should open the proper dropdown when click on the crosponding category", async () => {
    expect(wrapper.find("crucible-filter-dropdown-menu").exists()).toBe(false);
    const labels = wrapper.findAll(".crucible-filter-dropdown p");

    const index = 2;
    const label = labels[index];
    label.trigger("click");
    await wrapper.vm.$nextTick();
    const { showDropdown } = wrapper.vm;

    expect(showDropdown[labels[index].text()]).toBe(true);
  });
});
