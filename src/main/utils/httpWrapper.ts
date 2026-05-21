import { axiosServerClient } from "@shared/libs/utils";
import {
  HttpErrorInterface,
  HttpSuccessInterface,
  TApiServerResponse,
} from "@shared/types/http-wrapper.types";
import axios, { AxiosRequestConfig } from "axios";

export const httpFallbackError = (): HttpErrorInterface => ({
  success: false,
  message: "UNKNOWN_ERROR",
});

export const httpRequest = async <T = undefined>(
  config: AxiosRequestConfig,
): Promise<TApiServerResponse<T>> => {
  try {
    const response =
      await axiosServerClient.request<HttpSuccessInterface<T>>(config);
    return {
      success: true,
      data: response.data.data,
      status: response.data.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
      } satisfies HttpErrorInterface;
    }

    return httpFallbackError();
  }
};
