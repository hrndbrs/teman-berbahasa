export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
}

export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface MessageResponse {
  message: string;
}

export interface HealthResponse {
  status: 'ok' | 'error';
  db: 'ok' | 'error';
}
