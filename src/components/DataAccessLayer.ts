import { staticResources } from "@/resources";
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
    console.log(err);
    return [];
  }
};
