import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../utils/requests";

export function accessToken() {
  const jwt = Cookies.get("user");
  if (jwt) {
    return `Bearer ${JSON.parse(jwt)}`;
  } else {
    return null;
  }
}

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Headers": "Authorization",
    //"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
    "Content-Type": "application/json;charset=UTF-8",
    "authorization": accessToken(),
  },
});

