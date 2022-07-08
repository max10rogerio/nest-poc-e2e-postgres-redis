import { ActionRequest } from 'adminjs';
import { bulkSoftDelete, softDelete } from 'src/modules/admin/utils';
import { makeActionContext, makeExpectedResult, makeRecordItem } from './__mocks__/make-soft-delete.mock';

describe('AdminBro - Soft Delete', () => {
  describe('single soft delete', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should be not call softRemove from resource if not exists record', async () => {
      const actionRequestMock = {} as ActionRequest;
      const responseMock = { skipped: true };
      const [actionContext] = makeActionContext();

      await softDelete(actionRequestMock, responseMock, actionContext as any);

      expect(actionContext.resource.model.findOne).not.toHaveBeenCalled();
    });

    it('should be call softDelete with successfully', async () => {
      const actionRequestMock = {} as ActionRequest;
      const responseMock = {};
      const recordMock = makeRecordItem();
      const [actionContext, softRemoveMock] = makeActionContext({ record: recordMock });

      const expected = makeExpectedResult({ record: recordMock.toJSON() });

      await expect(softDelete(actionRequestMock, responseMock, actionContext as any)).resolves.toEqual(expected);

      expect(recordMock.params.deletedAt).not.toBeUndefined();
      expect(actionContext.resource.model.findOne).toHaveBeenCalled();
      expect(softRemoveMock).toHaveBeenCalled();
    });

    it('should be call resource.id() when resource.decorate().id() returns falsy', async () => {
      const actionRequestMock = {} as ActionRequest;
      const responseMock = {};
      const recordMock = makeRecordItem();
      const [actionContext] = makeActionContext({ record: recordMock });

      actionContext.resource.decorate = () => ({ id: () => null });

      const idSpy = jest.spyOn(actionContext.resource, 'id');

      await softDelete(actionRequestMock, responseMock, actionContext as any);

      expect(idSpy).toHaveBeenCalled();
    });
  });

  describe('bulk soft delete', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should be not call softRemove from resource if records is a falsy value', async () => {
      const actionRequestMock = {} as ActionRequest;
      const responseMock = { skipped: true };
      const [actionContext] = makeActionContext({ records: [] });
      const promise = bulkSoftDelete(actionRequestMock, responseMock, actionContext as any);

      await expect(promise).resolves.not.toThrow();

      expect(actionContext.resource.model.findOne).not.toHaveBeenCalled();
    });

    it('should be skip softDelete when request method is GET', async () => {
      const actionRequestMock = { method: 'get' } as ActionRequest;
      const responseMock = { skipped: true };
      const item = makeRecordItem();
      const [actionContext] = makeActionContext({ records: [item] });

      const promise = bulkSoftDelete(actionRequestMock, responseMock, actionContext as any);

      const expected = makeExpectedResult({ records: [item.toJSON()] });

      await expect(promise).resolves.toEqual(expected);

      expect(actionContext.resource.model.findOne).not.toHaveBeenCalled();
    });

    it('should be call multiple times softDelete function when request method is POST', async () => {
      const responseMock = {};
      const actionRequestMock = { method: 'post' } as ActionRequest;
      const item = makeRecordItem();
      const [actionContext, softRemoveMock] = makeActionContext({ records: [item] });

      const expected = makeExpectedResult({ records: [item.toJSON()] });

      const promise = bulkSoftDelete(actionRequestMock, responseMock, actionContext as any);

      await expect(promise).resolves.toEqual(expected);

      expect(actionContext.resource.model.findOne).toHaveBeenCalled();
      expect(softRemoveMock).toHaveBeenCalled();
    });
  });
});
