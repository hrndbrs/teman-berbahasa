export function isApiError(e: unknown): e is ApiError {
  return e instanceof Error && e.name === 'ApiError';
}

export class ApiError extends Error {
  static readonly Code = {
    BAD_REQUEST: 'BAD_REQUEST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT',
    GONE: 'GONE',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    RATE_LIMITED: 'RATE_LIMITED',
    REQUEST_TOO_LARGE: 'REQUEST_TOO_LARGE',
    ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
  } as const;

  constructor(
    public readonly status: number | undefined,
    public readonly code:
      (typeof ApiError.Code)[keyof typeof ApiError.Code] | undefined,
    message: string | undefined,
    public readonly fields: Record<string, string> | undefined
  ) {
    super(message ?? code ?? 'API_ERROR');
    this.name = 'ApiError';
  }
}
