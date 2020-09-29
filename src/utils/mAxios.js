import axios from "axios";

const mAxios = axios.create({
  baseURL: "https://developers.zomato.com/api/v2.1",
  headers: {
    "user-key": "15a4cab7c9af9a5d86386bebfbe8db23",
    "content-type": "application/json",
  },
});

export default mAxios;
