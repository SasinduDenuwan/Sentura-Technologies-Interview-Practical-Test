import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const getCountries = () => {
  return API.get("/countries");
};

export const searchCountries = (name) => {
  return API.get(`/countries/search?name=${name}`);
};