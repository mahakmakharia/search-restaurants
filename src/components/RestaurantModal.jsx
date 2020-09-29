import React from "react";
import { Box, Dialog, Typography } from "@material-ui/core";

const RestaurantModal = ({ open, handleModalClose, restaurant }) => {
  return (
    <Dialog open={open} onClose={handleModalClose}>
      <Box width={"500px"} p={"2rem"}>
        <img
          src={restaurant?.featured_image}
          style={{ width: "100%" }}
          alt=""
        />
        <a
          href={restaurant?.url}
          target={"_blank"}
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Typography
            component={"h1"}
            color={"textPrimary"}
            style={{ fontSize: "2rem" }}
          >
            {`Name: ${restaurant?.name}`}
          </Typography>
        </a>
        <Typography>{`Phone Number: ${restaurant?.phone_numbers}`}</Typography>
        <Typography>{`Address: ${restaurant?.location?.address}`}</Typography>
        <Typography>{`Timings: ${restaurant?.timings}`}</Typography>
        <Typography>{`Cuisines: ${restaurant?.cuisines}`}</Typography>
        <Typography>{`Rating: ${restaurant?.user_rating?.aggregate_rating}`}</Typography>
        <Typography>{`Votes: ${restaurant?.user_rating?.votes}`}</Typography>
      </Box>
    </Dialog>
  );
};

export default RestaurantModal;
