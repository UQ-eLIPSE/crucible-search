import { VueWrapper, mount } from "@vue/test-utils";
import CrucibleFilter from "../src/components/CrucibleFilter.vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getFilterSetTags } from "../src/components/DataAccessLayer";

vi.mock("@/components/DataAccessLayer", () => ({
  getFilterSetTags: vi.fn(() =>
    Promise.resolve([
      { course: { VET2011: 0, VET2012: 0 } },
      { subject: { Physiology: 0 } },
    ]),
  ),
}));

describe("CrucibleFilter", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(CrucibleFilter);
    wrapper.find(".crucible-filter-control").trigger("click");
    wrapper.vm.$nextTick();
  });
  it("should fetch the filter tag set,when land the component", () => {
    expect(getFilterSetTags).toHaveBeenCalled();
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
    const index = 1;
    const category = categories[index];
    category.trigger("click");
    await wrapper.vm.$nextTick();
    const { showDropdown } = wrapper.vm;
    expect(showDropdown[categories[index].text()]).toBe(true);
  });
  it("should show selected Tag in the Selected Tag Section, when click on the Tag", async () => {
    const categories = wrapper.findAll(".crucible-filter-dropdown h4");
    const index = 1;
    const category = categories[index];
    category.trigger("click");
    const tag = wrapper.find(".crucible-filter-dropdown-menu input");
    tag.trigger("click");
    await wrapper.vm.$nextTick();
    const selectedTags = wrapper.find(".crucible-filter-collection span span");
    expect(wrapper.find(".crucible-filter-collection").exists()).toBe(true);
    expect(selectedTags.exists()).toBe(true);
    expect(selectedTags.text()).toContain("VET2011");
  });

  it("should remove the selected Tag from the Selected Tag Section, when click on the Tag again", async () => {
    const categories = wrapper.findAll(".crucible-filter-dropdown h4");
    const index = 1;
    const category = categories[index];
    category.trigger("click");
    const tag = wrapper.find(".crucible-filter-dropdown-menu input");
    tag.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".selected-filter-tag").exists()).toBe(true);
    tag.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".selected-filter-tag").exists()).toBe(false);
  });
});
