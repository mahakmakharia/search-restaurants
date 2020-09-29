import React, { useEffect, useState } from "react";
import { Box, MenuItem, Select, TextField, Button } from "@material-ui/core";
import {
  getAllCategories,
  getAllCuisines,
  getAllRestaurants,
  searchRestaurant,
} from "../services/RestaurantServices";
import RestaurantList from "../components/RestaurantList";

import { toast } from "react-toastify";
import { useParams } from "react-router";

const SearchRestaurants = () => {
  const locationId = useParams().locationId;

  // Category State
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    name: "Select Category",
  });

  // Cuisine State
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState({
    cuisine_id: 0,
    cuisine_name: "Select Cuisine",
  });

  // Restaurant State
  const [restaurantInput, setRestaurantInput] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [fetchedRestaurants, setFetchedRestaurants] = useState([]);

  useEffect(() => {
    getCategories();
    getCuisines();
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    toast.success("fetching");
    const response = await getAllRestaurants({
      locationId: locationId,
      categoryId: selectedCategory.id,
      cuisineName: selectedCuisines.cuisine_name,
    });
    console.log(response);
    if (response?.restaurants?.length === 0)
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
    const selectedCategory = categories.find(
      (category) => category.categories.id === id
    );

    if (selectedCategory?.categories.id) {
      setSelectedCategory(selectedCategory.categories);
      getRestaurants();
    }
  };
  const cuisinesChangeHandler = (event) => {
    const { value: cuisine_id } = event.target;
    const selectedCuisines = cuisines.find(
      (cuisine) => cuisine.cuisine.cuisine_id === cuisine_id
    );

    if (selectedCuisines?.cuisine.cuisine_id) {
      setSelectedCuisines(selectedCuisines.cuisine);
      getRestaurants();
    }
  };

  const restaurantChangeHandler = (e) => {
    const { value } = e.target;
    console.log(value);

    setRestaurantInput(value);
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    if (restaurantInput === "") toast.error("search is empty");
    else {
      const filteredRestaurants = await searchRestaurant({
        locationId: locationId,
        restaurantName: restaurantInput,
      });
      setRestaurants(filteredRestaurants.restaurants);
    }
  };

  return (
    <>
      <Box display="flex" flexWrap="wrap" alignContent="flex-end" p={1} m={1}>
        <Box style={{ marginRight: "20px" }}>
          <Select
            value={selectedCategory.id}
            onChange={categoryChangeHandler}
            style={{ minWidth: "140px" }}
          >
            <MenuItem value={0} disabled style={{ display: "none" }}>
              Select Category
            </MenuItem>
            {categories?.map((data) => {
              const category = data.categories;
              return (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <Box style={{ marginRight: "20px" }}>
          <Select
            value={selectedCuisines.cuisine_id}
            onChange={cuisinesChangeHandler}
            style={{ minWidth: "140px" }}
          >
            <MenuItem value={0} disabled style={{ display: "none" }}>
              Select Cuisine
            </MenuItem>

            {cuisines?.map((data) => {
              const cuisine = data.cuisine;
              return (
                <MenuItem key={cuisine.cuisine_id} value={cuisine.cuisine_id}>
                  {cuisine.cuisine_name}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <form onSubmit={searchHandler}>
          <Box display={"flex"}>
            <Box mr={"2rem"} width={"55%"}>
              <TextField
                fullWidth
                placeholder={"Enter Restaurant Name"}
                onChange={restaurantChangeHandler}
                value={restaurantInput}
              />
            </Box>
            <Button type={"submit"} variant="contained" color="primary">
              Search
            </Button>
          </Box>
        </form>
      </Box>

      <Box mt={"3rem"}>
        <RestaurantList restaurants={restaurants} />
      </Box>
    </>
  );
};

export default SearchRestaurants;
