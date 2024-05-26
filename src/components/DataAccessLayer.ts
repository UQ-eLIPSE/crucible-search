export const findData = async (inputValue: string): Promise<string[]> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${inputValue.toString()}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return [data.name];
  } catch (err) {
    console.log(err);
    return [];
  }
};
