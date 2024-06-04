import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import CrucibleSearch from "@/components/CrucibleSearch.vue";
import { nextTick } from "vue";
import { flushPromises } from "@vue/test-utils";

describe("CrucibleSearch.vue", () => {
  vi.mock("@/components/DataAccessLayer", () => ({
    findTags: vi.fn((query) =>
      Promise.resolve(
        ["TAG1", "TAG2", "Horse"].filter((tag) => tag.includes(query)),
      ),
    ),
  }));

  it("displays correct dropdown options when a search term is entered", async () => {
    const wrapper = mount(CrucibleSearch);
    const input = wrapper.find('input[type="text"]');
    await input.setValue("TAG");
    await input.trigger("input");
    await flushPromises();

    expect(wrapper.find("ul").isVisible()).toBe(true);
    expect(wrapper.findAll("li")).toHaveLength(2);
    expect(wrapper.findAll("li")[0].text()).toBe("TAG1");
    expect(wrapper.findAll("li")[1].text()).toBe("TAG2");
  });

  it("closes dropdown when no tags are displayed", async () => {
    const wrapper = mount(CrucibleSearch);
    const input = wrapper.find('input[type="text"]');
    await input.setValue("Phy");
    await input.trigger("input");
    await flushPromises();

    const dropdown = wrapper.find("ul");
    expect(dropdown.exists()).toBe(false);
  });
});
