import axios from "axios";
import { SERVER_API_BASE_URL } from "@shared/constant/api-bolt";

export const axiosServerClient = axios.create({
  baseURL: SERVER_API_BASE_URL,
});
