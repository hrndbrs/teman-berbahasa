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
    ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
  } as const;

  constructor(
    public readonly status: number | undefined,
    public readonly code:
      | (typeof ApiError.Code)[keyof typeof ApiError.Code]
      | undefined,
    public readonly fields: Record<string, string> | undefined
  ) {
    super(code ?? 'API_ERROR');
    this.name = 'ApiError';
  }
}
