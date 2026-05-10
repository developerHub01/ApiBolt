import { axiosServerClient } from "@shared/libs/utils";
import { HttpErrorInterface } from "@shared/types/http.types";
import axios, { AxiosRequestConfig } from "axios";

export interface HttpRequestResponseInterface<T> {
  data: T;
  success: boolean;
  status: number;
}

export const httpFallbackError = (): HttpErrorInterface => ({
  success: false,
  message: "UNKNOWN_ERROR",
});

export const httpRequest = async <T = undefined>(
  config: AxiosRequestConfig,
): Promise<HttpRequestResponseInterface<T>> => {
  try {
    const response =
      await axiosServerClient.request<HttpRequestResponseInterface<T>>(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        success: false,
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
      } satisfies HttpErrorInterface;
    }

    throw httpFallbackError();
  }
};
