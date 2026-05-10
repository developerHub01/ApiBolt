export interface HttpErrorInterface {
  success: boolean;
  code?: string;
  status?: number;
  message?: string;
  data?: unknown;
  url?: string;
  method?: string;
}
