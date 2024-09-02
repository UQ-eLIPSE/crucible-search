import { staticResources, tags, taxonomyTags } from "@/resources";
import { ResourceInSearch } from "@/types";

const fetchAllTagsData = async (
  tag: string,
  level: number,
  getApisFromHost: string,
) => {
  try {
    const apiData = await fetch(
      `${getApisFromHost}?${new URLSearchParams({
        level: level.toString(),
        tag,
      })}`,
    );
    return await apiData.json();
  } catch (err) {
    console.error("Error fetching data from the server", err);
    alert("Error fetching data from the server, only display test data.");
  }
};

export const findTagsData = async (
  inputValue: string,
  level: number,
  getApisFromHost: string,
): Promise<ResourceInSearch[]> => {
  try {
    const resources =
      (await fetchAllTagsData(inputValue, level, getApisFromHost)) ||
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

export const getFilteredResourcesByTitle = async (
  inputValue: string,
  searchFilterApi: string,
) => {
  try {
    const params = new URLSearchParams({
      searchTerm: inputValue,
    });
    const tagsCollectionResponse = await fetch(`${searchFilterApi}?${params}`);
    return await tagsCollectionResponse.json();
  } catch (err) {
    console.error("An error occurred while getting filtered resources", err);
  }
};

//Api call to get the FilterSetTags(Taxonomy tags only) from Server
export const getFilterSetTagsFromApi = async (
  filterSetApi: string,
): Promise<Record<string, number>> => {
  try {
    const tagsCollectionResponse = await fetch(filterSetApi);
    const tagsCollection = await tagsCollectionResponse.json();
    return tagsCollection;
  } catch (err) {
    alert(
      "An error occurred while fetching tags" + err + "fallback to static tags",
    );
    return {};
  }
};

// Convert result from getFilterSetTagsFromApi to FilterSetTags
export const getFilterSetTags = async (filterSetApi: string) => {
  const tagsCollection: { [key: string]: number } =
    await getFilterSetTagsFromApi(filterSetApi);
  const tagList = Object.keys(tagsCollection).map((key: string) => ({
    [key]: tagsCollection[key],
  }));
  return taxonomyGroups(tagList);
};

// Convert the [{"Taxonomy: tag": resourcesSize}] into FilterSetTags: [{taxonomy: {tag: resourceSize}}]
export const taxonomyGroups = (taxonomyTagList: Record<string, number>[]) => {
  if (!taxonomyTagList) {
    return {};
  }

  return taxonomyTagList.reduce(
    (acc, tag) => {
      const [taxonomy, tagValue] = Object.keys(tag)[0].split(":");
      const resourceSize = Object.values(tag)[0];

      if (!acc[taxonomy]) {
        acc[taxonomy] = [];
      }
      acc[taxonomy].push({ [tagValue.replace("_", " ")]: resourceSize });
      return acc;
    },
    {} as Record<string, object[]>,
  );
};

// In Case API not available
export const staticFilterSetTags = taxonomyGroups(taxonomyTags);
