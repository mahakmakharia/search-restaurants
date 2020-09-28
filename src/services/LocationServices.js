import mAxios from "../utils/mAxios";
import { toast } from "react-toastify";

export const getAllLocations = async (location) => {
  try {
    const { data } = await mAxios.get(`/cities?q=${location}`);
    return data.location_suggestions;
  } catch (e) {
    console.log(e);
    toast.error("Cannot fetch Locations", {
      autoClose: 5000,
    });
  }
};

export const getLocation = async (locationId) => {
  try {
    const { data } = await mAxios.get(
      `/location_details?entity_id=${locationId}&entity_type=city`
    );
    return data.best_rated_restaurant;
  } catch (e) {
    console.log(e);
    toast.error("Cannot fetch Location", {
      autoClose: 5000,
    });
  }
};
