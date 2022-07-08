import { handlePromise } from 'src/utils';

describe('handlePromise (Unit)', () => {
  it('should be return data value when promise is resolved with successfully', async () => {
    const promise = Promise.resolve('success');

    await expect(handlePromise(promise)).resolves.toEqual([null, 'success']);
  });

  it('should be return an error value when promise is resolved with failure', async () => {
    const promise = Promise.reject('error');

    await expect(handlePromise(promise)).resolves.toEqual(['error', undefined]);
  });

  it('should be return an error and initialvalue when is not undefined', async () => {
    const promise = Promise.reject('error');

    await expect(handlePromise(promise, [])).resolves.toEqual(['error', []]);
  });
});
