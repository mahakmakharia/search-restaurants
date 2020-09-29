import mAxios from "../utils/mAxios";
import { toast } from "react-toastify";

export const getAllCategories = async () => {
  try {
    const { data } = await mAxios.get(`/categories`);
    return data.categories;
  } catch (e) {
    toast.error("Cannot fetch Categories", {
      autoClose: 5000,
    });
  }
};
export const getAllCuisines = async (locationId) => {
  try {
    const { data } = await mAxios.get(`/cuisines?city_id=${locationId}`);
    return data.cuisines;
  } catch (e) {
    toast.error("Cannot fetch Cuisines", {
      autoClose: 5000,
    });
  }
};

export const getAllRestaurants = async (locationId) => {
  try {
    const { data } = await mAxios.get(
      `search?entity_id=${locationId}&entity_type=city`
    );
    return data;
  } catch (e) {
    console.log(e);
    toast.error("Cannot fetch Location", {
      autoClose: 5000,
    });
  }
};

export const getRestaurant = async (restaurantId) => {
  try {
    const { data } = await mAxios.get(`/restaurant?res_id=${restaurantId}`);
    return data;
  } catch (e) {
    toast.error("Cannot fetch Restaurant", {
      autoClose: 5000,
    });
  }
};
