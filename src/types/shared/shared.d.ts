/**
 * ### Simple API Response type.
 */
export interface SimpleResponse<T> {
  ok: boolean;
  error?: {
    code: number;
    message: string;
  };
  data?: T;
}
