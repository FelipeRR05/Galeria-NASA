import axios from 'axios';

const NASA_API_BASE_URL = "https://images-api.nasa.gov/search";

export const fetchImages = async (astro, page = 1) => {
  try {
    const response = await axios.get(`${NASA_API_BASE_URL}?q=${astro}&page=${page}`);
    return response.data.collection.items.map((item) => ({
      id: item.data[0].nasa_id,
      title: item.data[0].title,
      description: item.data[0].description,
      imageUrl: item.links ? item.links[0].href : null,
    }));
  } catch (error) {
    console.error("Error fetching NASA images:", error);
    return [];
  }
};
