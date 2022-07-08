type ActionContextSchema = {
  translateMessage: jest.Mock<any, any>;
  h: {
    resourceUrl: jest.Mock<any, any>;
  };
  resource: {
    id: () => string;
    decorate: () => { id: () => string };
    model: {
      findOne: jest.Mock<any, any>;
    };
  };
};

export const makeActionContext = (contextOverrideObj: any = {}): [ActionContextSchema, jest.Mock<any, any>] => {
  const softRemoveMock = jest.fn();

  const context = {
    h: {
      resourceUrl: jest.fn().mockReturnValue('test'),
    },
    translateMessage: jest.fn().mockReturnValue('test message'),
    resource: {
      id: () => '1',
      decorate: () => ({
        id: () => '1',
      }),
      model: {
        findOne: jest.fn().mockReturnValue({
          softRemove: softRemoveMock,
        }),
      },
    },
  };

  Object.assign(context, contextOverrideObj);

  return [context, softRemoveMock];
};

export const makeRecordItem = (itemOverrideObj: any = {}) => {
  const item = {
    toJSON: () => ({
      id: '1',
    }),
    params: {
      deletedAt: undefined,
    },
    id: () => '1',
  };

  Object.assign(item, itemOverrideObj);

  return item;
};

export const makeExpectedResult = (expectedOverrideObj: any = {}) => {
  const expected = {
    notice: {
      message: 'test message',
      type: 'success',
    },
    redirectUrl: 'test',
  };

  Object.assign(expected, expectedOverrideObj);

  return expected;
};
