// import { resources } from "@/resources";
import { inject } from "vue";
import { ResourceInSearch } from "@/types";

const fetchAllData = async () => {
  const getApisFromHost = inject("$getApi") as string;
  const apiData = await fetch(getApisFromHost);
  return await apiData.json();
};

export const findData = async (
  inputValue: string,
): Promise<ResourceInSearch[]> => {
  const getApisFromHost = inject("$getApi");

  // TODO: FIX FOR TAG QUERY
  const resources = await fetchAllData();
  console.log("resources fetched", resources);
  console.log("findDataa...called with ..", inputValue, getApisFromHost); //Todo: Remove once API integration is done

  try {
    const results = resources.filter((resource: ResourceInSearch) =>
      resource.tags.join(",").includes(inputValue),
    ) || { label: "", tags: [] };
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
};
