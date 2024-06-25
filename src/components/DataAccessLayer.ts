import { staticResources, tags } from "@/resources";
import { ResourceInSearch } from "@/types";

const fetchAllData = async (tag: string, getApisFromHost: string) => {
  try {
    const apiData = await fetch(
      getApisFromHost + "?" + new URLSearchParams({ tag }),
    );
    return await apiData.json();
  } catch (err) {
    console.error("Error fetching data from the server", err);
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

export const findTags = async (
  inputValue: string,
  searchTagsApi: string,
): Promise<string[]> => {
  try {
    const params = new URLSearchParams({
      tag: inputValue,
    });
    const tagsCollectionResponse = await fetch(`${searchTagsApi}?${params}`);
    const tagsCollection =
      ((await tagsCollectionResponse.json()) as string[]) ?? tags;

    const uniqueTagsCollection = new Set<string>(tagsCollection);
    return Array.from(uniqueTagsCollection);
  } catch (err) {
    console.error("An error occurred while fetching tags", err);
    return [];
  }
};
