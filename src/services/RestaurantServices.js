import mAxios from "../utils/mAxios";
import { toast } from "react-toastify";
import { getLocation } from "./LocationServices";

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

export const getAllRestaurants = async ({ locationId, cuisine, category }) => {
  let final_restaurants = await getLocation(locationId);
  console.log(final_restaurants);
  // if (cuisine) {
  //   final_restaurants = final_restaurants.filter((restaurant) =>
  //     restaurant.cuisines.includes(cuisine)
  //   );

  //   if (category) {
  //     final_restaurants = final_restaurants.filter((restaurant) =>
  //       restaurant.highlights.find(category)
  //     );
  //   }
  // } else {
  //   final_restaurants = final_restaurants.filter((restaurant) =>
  //     restaurant.highlights.find(category)
  //   );
  // }

  return final_restaurants;
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
