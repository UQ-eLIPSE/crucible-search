import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CrucibleSearch from "@/components/CrucibleSearch.vue";
import { nextTick } from "vue";
import { flushPromises } from "@vue/test-utils";

describe("CrucibleSearch.vue", () => {
  let wrapper: VueWrapper;
  let input: DOMWrapper<Element>;

  // helper function that inputs a value into the search bar
  const inputSearch = async (value: string) => {
    await input.setValue(value);
    await input.trigger("input");
    await nextTick();
  };

  vi.mock("@/components/DataAccessLayer", () => ({
    findTags: vi.fn((query) =>
      Promise.resolve(
        ["TAG1", "TAG2", "Horse"].filter((tag) => tag.includes(query)),
      ),
    ),
  }));

  beforeEach(() => {
    wrapper = mount(CrucibleSearch);
    input = wrapper.find('input[type="text"]');
  });

  it("displays correct dropdown options when a search term is entered", async () => {
    await inputSearch("TAG");
    expect(wrapper.find("ul").isVisible()).toBe(true);
    expect(wrapper.findAll("li")).toHaveLength(2);
    expect(wrapper.findAll("li")[0].text()).toBe("TAG1");
    expect(wrapper.findAll("li")[0].findAll("strong")).toHaveLength(3);

    expect(wrapper.findAll("li")[1].text()).toBe("TAG2");
  });

  it("closes dropdown when no tags are displayed", async () => {
    await inputSearch("Phy");

    const dropdown = wrapper.find("ul");
    expect(dropdown.exists()).toBe(false);
  });

  it("bolds the matching part of the tag", async () => {
    const value = "TAG";
    await inputSearch(value);

    const tag1 = wrapper.findAll("li")[0];
    expect(tag1.text()).toBe("TAG1");
    expect(tag1.findAll("strong")).toHaveLength(3);
    tag1.findAll("strong").forEach((char, index) => {
      expect(char.text()).toBe(value[index]);
    });
  });
});
