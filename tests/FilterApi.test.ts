import { VueWrapper, mount } from "@vue/test-utils";
import CrucibleFilter from "../src/components/CrucibleFilter.vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getFilterSetTags } from "../src/components/DataAccessLayer";
import { staticFilterSetTags } from "../src/components/DataAccessLayer";

describe("CrucibleFilter", () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    vi.mock("@/components/DataAccessLayer", () => ({
      getFilterSetTags: vi.fn(() => Promise.resolve({})),
      staticFilterSetTags: vi.fn(() =>
        Promise.resolve({ staticFilterSetTags }),
      ),
    }));
    wrapper = mount(CrucibleFilter);
    wrapper.find(".crucible-filter-control").trigger("click");
    wrapper.vm.$nextTick();
  });
  it("should fetch the filter tag set,when land the component", () => {
    expect(getFilterSetTags).toHaveBeenCalled();
  });
  it("should set the ref 'isTaxonomyExists' value to false", () => {
    const { isTaxonomyExists } = wrapper.vm;
    expect(isTaxonomyExists).toBe(false);
  });
});
