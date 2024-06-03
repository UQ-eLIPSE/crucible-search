import { staticResources } from "@/resources";
import { inject } from "vue";
import { ResourceInSearch } from "@/types";

const fetchAllData = async (
  tag: string,
): Promise<ResourceInSearch[] | null> => {
  try {
    const getApisFromHost = inject("$getApi") as string;
    const apiData = await fetch(
      getApisFromHost + "?" + new URLSearchParams({ tag }),
    );
    return await apiData.json();
  } catch (err) {
    alert("Error fetching data from the server, only display test data.");
    return null;
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
