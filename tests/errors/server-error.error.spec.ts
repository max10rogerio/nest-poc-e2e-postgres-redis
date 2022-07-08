import { ServerError } from 'src/errors';

describe('ServerError - Error (Unit)', () => {
  it('should be throw error with message', () => {
    const error = new ServerError('test', 'test message');

    expect(error.toJSON()).toEqual({
      message: 'test message',
      metadata: 'test',
      type: 'SERVER_ERROR',
    });
  });

  it('should be throw error without message', () => {
    const error = new ServerError('test');

    expect(error.toJSON()).toEqual({
      message: 'Erro Interno',
      metadata: 'test',
      type: 'SERVER_ERROR',
    });
  });
});
