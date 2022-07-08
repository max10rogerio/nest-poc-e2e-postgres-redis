import { BadRequestException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SentryService } from '@ntegral/nestjs-sentry';
import { SentryHttpExceptionFilter } from 'src/modules/sentry/filters';
import { expectedExceptionResponse, makeArgumentHostMock } from './__mocks__/sentry-exception.filter.mock';

jest.mock('@ntegral/nestjs-sentry', () => ({
  ...(jest.requireActual('@ntegral/nestjs-sentry') as any),
  InjectSentry: () => jest.fn(),
}));

const setExtraMock = jest.fn();

class SentryServiceMock {
  instance() {
    return this;
  }

  captureException(exception: any, context: any) {
    context({ setExtras: setExtraMock });
  }
}

describe('SentryHttpExceptionFilter', () => {
  let sentryHttpExceptionFilter: SentryHttpExceptionFilter;

  beforeEach(async () => {
    jest.clearAllMocks();

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        SentryHttpExceptionFilter,
        {
          provide: SentryService,
          useClass: SentryServiceMock,
        },
      ],
    }).compile();

    sentryHttpExceptionFilter = app.get<SentryHttpExceptionFilter>(SentryHttpExceptionFilter);
  });

  it('should be return a expected exception response', () => {
    const { statusMock, mockArgumentsHost } = makeArgumentHostMock();
    const error = new BadRequestException('test');

    const result = sentryHttpExceptionFilter.catch(error, mockArgumentsHost as any);

    expect(setExtraMock).toHaveBeenCalledWith({
      exception: expectedExceptionResponse.exception,
      request: JSON.stringify(expectedExceptionResponse.request, null, 2),
      response: JSON.stringify(expectedExceptionResponse.response, null, 2),
    });

    expect(statusMock).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(result).toEqual(error.getResponse());
  });

  it('should be return a internal server error when an unexpected exception occurs', () => {
    const { statusMock, mockArgumentsHost } = makeArgumentHostMock();

    const result = sentryHttpExceptionFilter.catch({} as any, mockArgumentsHost as any);

    expect(setExtraMock).toHaveBeenCalled();

    expect(statusMock).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(result).toEqual('Internal Server error');
  });
});
