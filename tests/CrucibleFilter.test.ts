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
    const category = wrapper.find(".crucible-filter-dropdown h4");
    expect(wrapper.find("crucible-filter-dropdown-menu").exists()).toBe(false);
    category.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".crucible-filter-dropdown-menu").exists()).toBe(true);
  });
  it("should open the proper dropdown when click on the crosponding category", async () => {
    expect(wrapper.find("crucible-filter-dropdown-menu").exists()).toBe(false);
    const categories = wrapper.findAll(".crucible-filter-dropdown h4");

    const index = 2;
    const category = categories[index];
    category.trigger("click");
    await wrapper.vm.$nextTick();
    const { showDropdown } = wrapper.vm;

    expect(showDropdown[categories[index].text()]).toBe(true);
  });
});
