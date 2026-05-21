export interface HttpSuccessInterface<T> {
  data: T;
  success: true;
  status: number;
}

export interface HttpErrorInterface {
  success: false;
  code?: string;
  status?: number;
  message?: string;
  data?: unknown;
  url?: string;
  method?: string;
}

export type TApiServerResponse<T> =
  | HttpSuccessInterface<T>
  | HttpErrorInterface;
