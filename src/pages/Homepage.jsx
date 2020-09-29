import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import Locations from "../components/Locations";
import { toast } from "react-toastify";
import { getAllLocations } from "../services/LocationServices";
import illustration from "../assets/images/location.png";

const HomePage = () => {
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);

  const getLocations = async () => {
    if (location === "") toast.error("Search is blank!");

    const locations = await getAllLocations(location);
    setLocations(locations);

    if (!locations && !locations?.length)
      toast.error("No Locations found with this name");
  };

  const locationChangeHandler = (e) => {
    const { value } = e.target;
    setLocation(value);
  };

  const formHandler = (e) => {
    e.preventDefault();
    getLocations();
  };

  return (
    <div>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        mt={"5.5rem"}
      >
        <img
          src={illustration}
          style={
            ({ display: "block" },
            { margin: "auto 10px" },
            { width: "50%" },
            { height: "300px" })
          }
          alt=""
        />
        <form onSubmit={formHandler}>
          <Box display={"flex"}>
            <Box mr={"1.5rem"}>
              <TextField
                placeholder={"Enter Location"}
                variant="outlined"
                type="text"
                onChange={locationChangeHandler}
                value={location}
              />
            </Box>
            <Button type={"submit"} variant="contained" color="primary">
              Search
            </Button>
          </Box>
        </form>
        <br />
        {locations && locations.length ? (
          <Box width={"95vw"} maxWidth={"1000px"} my={"3rem"}>
            <Locations locations={locations} />
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

export default HomePage;
