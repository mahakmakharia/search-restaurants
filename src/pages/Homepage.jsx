import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import Locations from "../components/Locations";
import { toast } from "react-toastify";
import { getAllLocations } from "../services/LocationServices";

const HomePage = () => {
  const [location, setLocation] = useState("In");
  const [locations, setLocations] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getLocations()}, []);

  const getLocations = async () => {
    if (location === "") toast.error("Search is blank!");

    const locations = await getAllLocations(location);
    setLocations(locations);
    console.log(locations)

    if (!locations?.length)
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
        <form onSubmit={formHandler}>
          <Box display={"flex"} mt={3}>
            <Box mr={"1.2rem"}>
              <TextField
                placeholder="Kolkata"
                variant="outlined"
                type="text"
                onChange={locationChangeHandler}
                value={location}
                label="Enter Location"
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
