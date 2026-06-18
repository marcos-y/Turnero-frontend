// api/client.js
import axios from "axios";

export const api = axios.create({
  //baseURL: "http://localhost:5000/api",
  baseURL: "http://192.168.8.193:5000/api",
});
