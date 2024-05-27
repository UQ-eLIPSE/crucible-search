import { resources } from "@/resources";
import { inject } from "vue";
import { ResourceInSearch } from "@/types";
const getApisFromHost = inject("$getApi");

export const findData = (inputValue: string): ResourceInSearch[] => {
  console.log("findData...called with ..", inputValue, getApisFromHost); //Todo: Remove once API integration is done

  try {
    const results = resources.filter((resource: ResourceInSearch) =>
      resource.tags.join(",").includes(inputValue),
    ) || { label: "", tags: [] };
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
};
