import React, { useEffect, useState } from "react";
import { Box, MenuItem, Select, TextField } from "@material-ui/core";
import {
  getAllCategories,
  getAllCuisines,
  getAllRestaurants,
} from "../services/RestaurantServices";

import { toast } from "react-toastify";
import { useParams } from "react-router";

const SearchRestaurants = () => {
  const locationId = useParams();
  // Category State
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    name: "Select Category",
  });

  // Cuisine State
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState({
    id: 0,
    name: "Select Cuisine",
  });

  // Restaurant State
  const [restaurantInput, setRestaurantInput] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [fetchedRestaurants, setFetchedRestaurants] = useState([]);

  useEffect(() => {
    getCategories();
    getCuisines();
    getRestaurants();
  });

  const getRestaurants = async () => {
    const response = await getAllRestaurants(locationId);
    if (!response.restaurantFound)
      toast.error("No Restaurants found in this constraints");

    setRestaurants(response.restaurants);
    setFetchedRestaurants(response.restaurants);
  };

  const getCategories = async () => {
    const categories = await getAllCategories();
    setCategories(categories);
  };

  const getCuisines = async () => {
    const cuisines = await getAllCuisines(locationId);
    setCuisines(cuisines);
  };

  const categoryChangeHandler = (event) => {
    const { value: id } = event.target;
    const selectedCategory = categories.find((category) => category.id === id);
    if (selectedCategory?.id) {
      setSelectedCategory(selectedCategory);
      getRestaurants();
    }
  };
  const cuisinesChangeHandler = (event) => {
    const { value: id } = event.target;
    const selectedCuisines = cuisines.find((cuisines) => cuisines.id === id);
    if (selectedCuisines?.id) {
      setSelectedCuisines(selectedCuisines);
      getRestaurants();
    }
  };

  const restaurantChangeHandler = (e) => {
    const { value } = e.target;
    const filteredRestaurants = fetchedRestaurants.filter((restaurant) =>
      restaurant.name.includes(value)
    );
    setRestaurants(filteredRestaurants);
    setRestaurantInput(value);
  };

  return (
    <>
      <Box mx={"auto"} width={"fit-content"}>
        <form>
          <Box my={"2rem"} display={"flex"}>
            <Box mr={"2.5rem"}>
              <Select
                value={selectedCategory.id}
                onChange={categoryChangeHandler}
              >
                <MenuItem value={0} disabled style={{ display: "none" }}>
                  Select Category
                </MenuItem>
                {categories
                  ? categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </Box>
            <Select
              value={selectedCuisines.id}
              onChange={cuisinesChangeHandler}
            >
              <MenuItem value={0} disabled style={{ display: "none" }}>
                Select Cuisine
              </MenuItem>
              {cuisines
                ? cuisines.map((cuisine) => (
                    <MenuItem key={cuisine.id} value={cuisine.id}>
                      {cuisine.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </Box>
        </form>
        <Box mr={"2rem"} width={"100%"}>
          <TextField
            fullWidth
            placeholder={"Enter Restaurant Name"}
            onChange={restaurantChangeHandler}
            value={restaurantInput}
          />
        </Box>
      </Box>
    </>
  );
};

export default SearchRestaurants;
