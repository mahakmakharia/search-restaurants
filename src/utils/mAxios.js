import axios from "axios";

const mAxios = axios.create({
  baseURL: "https://developers.zomato.com/api/v2.1",
  headers: {
    "user-key": "6644fd9bac71820dff8c7f626619198b",
    "content-type": "application/json",
  },
});

export default mAxios;
