import { ActionContext, ActionRequest } from 'adminjs';
import { checkJoinSoftDeleteProduct } from 'src/modules/admin/utils/check-join-soft-delete';
import { joinSoftDeleteParams, joinSoftDeleteResponse } from './__mocks__/check-join-soft-delete.mock';

describe('AdminBro - Check Join Soft Delete', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should remove plans belonging to soft deleted products and keep the others', async () => {
    const response = joinSoftDeleteParams();
    const request = {} as ActionRequest;
    const context = {} as ActionContext;

    const received = await checkJoinSoftDeleteProduct(response, request, context);
    const expected = joinSoftDeleteResponse();

    await expect(received).toEqual(expected);
  });
});
