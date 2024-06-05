import { staticResources, tags } from "@/resources";
import { ResourceInSearch } from "@/types";

const fetchAllData = async (tag: string, getApisFromHost: string) => {
  try {
    const apiData = await fetch(
      getApisFromHost + "?" + new URLSearchParams({ tag }),
    );
    return await apiData.json();
  } catch (err) {
    alert("Error fetching data from the server, only display test data.");
  }
};

export const findData = async (
  inputValue: string,
  getApisFromHost: string,
): Promise<ResourceInSearch[]> => {
  try {
    const resources =
      (await fetchAllData(inputValue, getApisFromHost)) ||
      staticResources.filter((resource: ResourceInSearch) =>
        resource.tags.join(",").includes(inputValue),
      );
    return resources;
  } catch (err) {
    return [];
  }
};

export const findTags = async (inputValue: string): Promise<string[]> => {
  try {
    // TODO: The API call from Crucible should be passed in here
    // the below might change according to how we will be passing the APi

    const settags = new Set<string>();
    tags.forEach((tag) => {
      if (tag.toLowerCase().includes(inputValue.toLowerCase())) {
        settags.add(tag);
      }
    });

    return Array.from(settags);
  } catch (err) {
    return [];
  }
};
