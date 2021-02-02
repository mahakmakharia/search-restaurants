import axios from "axios";

const mAxios = axios.create({
  baseURL: "https://developers.zomato.com/api/v2.1",
  headers: {
    "user-key": process.env.REACT_APP_KEY,
    "content-type": "application/json",
  },
});

export default mAxios;
