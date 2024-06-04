import { staticResources } from "@/resources";
import { inject } from "vue";
import { ResourceInSearch } from "@/types";

const fetchAllData = async (tag: string) => {
  try {
    const getApisFromHost = inject("$getApi") as string;
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
): Promise<ResourceInSearch[]> => {
  try {
    const resources =
      (await fetchAllData(inputValue)) ||
      staticResources.filter((resource: ResourceInSearch) =>
        resource.tags.join(",").includes(inputValue),
      );
    return resources;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const findTags = async (inputValue: string): Promise<string[]> => {
  try {
    // TODO: The API call from Crucible should be passed in here
    const resources = staticResources;

    const tagsSet = new Set<string>();
    resources.forEach((resource: ResourceInSearch) => {
      resource.tags.forEach((fullTag) => {
        const tagParts = fullTag.split(":");
        const tagSuffix = tagParts[1];
        if (tagSuffix.toLowerCase().includes(inputValue.toLowerCase())) {
          tagsSet.add(tagSuffix);
        }
      });
    });

    return Array.from(tagsSet);
  } catch (err) {
    console.log(err);
    return [];
  }
};
