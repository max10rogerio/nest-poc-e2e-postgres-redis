import { AxiosError } from 'axios';

export const handlePromise = <T, U = Error | AxiosError>(
  promise: Promise<T>,
  initialValue: any = undefined,
): Promise<[U | null, T | undefined]> => {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((error: U) => Promise.resolve([error, initialValue]));
};
