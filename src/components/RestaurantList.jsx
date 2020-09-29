import React, { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Button,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import RestaurantModal from "./RestaurantModal";
import { getRestaurant } from "../services/RestaurantServices";

const RestaurantList = ({ restaurants }) => {
  const [openModal, setOpenModal] = useState(false);
  const [restaurant, setRestaurant] = useState();

  const restaurantClickHandler = async (id) => {
    await getRestaurantDetails(id);
    setOpenModal(true);
  };

  const modalCloseHandler = () => {
    setOpenModal(false);
  };

  const getRestaurantDetails = async (restaurantId) => {
    const restaurant = await getRestaurant(restaurantId);

    setRestaurant(restaurant);
  };
  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        flexWrap="wrap"
        p={1}
        m={1}
        alignContent="center"
        style={{ margin: "10px auto" }}
      >
        {restaurants?.map((data) => {
          const restaurant = data.restaurant;
          return (
            <div>
              <Card
                style={{
                  maxWidth: "400px",
                  margin: "15px",
                }}
              >
                <CardActionArea>
                  <img
                    src={restaurant?.featured_image}
                    style={{ maxHeight: "350px" }}
                    alt=""
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {restaurant?.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`Address: ${restaurant?.location?.address}`}
                      <br />
                      {`Contact: ${restaurant?.phone_numbers}`}
                      <br />
                      {`Timings: ${restaurant?.timings}`}
                      <br />
                      {`Ratings: ${restaurant?.user_rating?.aggregate_rating}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => restaurantClickHandler(restaurant.id)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
        <RestaurantModal
          open={openModal}
          handleModalClose={modalCloseHandler}
          restaurant={restaurant}
        />
      </Box>
    </div>
  );
};

export default RestaurantList;
