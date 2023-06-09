export interface ApiResponse<T> {
  status: number;
  msg?: string;
  error?: string;
  data?: T;
  index?: {
    page: number;
    perpage: number;
    total: number;
  };
}
