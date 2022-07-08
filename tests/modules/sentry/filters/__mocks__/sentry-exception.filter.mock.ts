export const expectedExceptionResponse = {
  exception: JSON.stringify(
    {
      response: {
        statusCode: 400,
        message: 'test',
        error: 'Bad Request',
      },
      status: 400,
      message: 'test',
      name: 'BadRequestException',
    },
    null,
    2,
  ),
  request: {
    body: { test: 1 },
    query: { sort: 'asc' },
    headers: { authorization: 'test' },
    params: { id: 1 },
  },
  response: { statusCode: 400, message: 'test', error: 'Bad Request' },
};

export const makeArgumentHostMock = () => {
  const statusMock = jest.fn().mockReturnThis();

  const mockGetResponse = jest.fn().mockReturnValue({
    getResponse: jest.fn().mockReturnThis(),
    status: statusMock,
    json: (value: any) => value,
  });
  const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
    getResponse: mockGetResponse,
    getRequest: jest.fn().mockReturnValue(expectedExceptionResponse.request),
  }));
  const mockArgumentsHost = {
    switchToHttp: mockHttpArgumentsHost,
  };

  return {
    mockArgumentsHost,
    statusMock,
  };
};
