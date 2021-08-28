import axios from "axios";

//export const instance = axios.create({ baseURL: "http://localhost:5000" });

export const instance = axios.create({
  baseURL: "https://blockchain-ecommerce-store.herokuapp.com/",
});

// Specify interceptors
instance.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).accessToken
    }`;
  }
  return req;
});
