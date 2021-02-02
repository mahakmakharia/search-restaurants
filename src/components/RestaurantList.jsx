import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  Button,
  CardContent,
  Typography,
  CardActions,
  Grid
} from "@material-ui/core";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import RestaurantModal from "./RestaurantModal";
import { getRestaurant } from "../services/RestaurantServices";

const useStyles = makeStyles((theme) =>
  createStyles({
    restaurantCard: {
      margin: theme.spacing(2),
    },
    image: {
      height: "300px", 
      width: "100%",
      [theme.breakpoints.only('xs')]: {
        height: "180px",
      },
      [theme.breakpoints.only('sm')]: {
        height: "200px",
      },
    }
  }),
);

const RestaurantList = ({ restaurants }) => {
  const [openModal, setOpenModal] = useState(false);
  const [restaurant, setRestaurant] = useState();
  const classes = useStyles();

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
      <Grid container>
        {restaurants?.map((data) => {
          const restaurant = data.restaurant;
          return (
            <Grid item key={restaurant.id} xl={4} lg={4} md={4} sm={6} xs={12}>
              <Card className={classes.restaurantCard}
              >
                <CardActionArea>
                  <img
                    src={restaurant?.featured_image}
                    className={classes.image}
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
            </Grid>
          );
        })}
      </Grid>
      <RestaurantModal
        open={openModal}
        handleModalClose={modalCloseHandler}
        restaurant={restaurant}
      />

    </div>
  );
};

export default RestaurantList;
