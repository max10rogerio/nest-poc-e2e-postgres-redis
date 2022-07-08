import {
  ActionContext,
  ActionHandler,
  BaseRecord,
  BaseResource,
  BulkActionResponse,
  RecordActionResponse,
} from 'adminjs';

const makeSoftDelete = async (resource: BaseResource, record: BaseRecord): Promise<void> => {
  const { model: Model } = resource as any;
  record.params.deletedAt = new Date();

  const model = await Model.findOne({ id: record.id() });
  await model.softRemove();
};

const makeResponseBase = ({ resource, h: urlHelper, translateMessage }: ActionContext) => {
  return {
    redirectUrl: urlHelper.resourceUrl({
      resourceId: resource.decorate().id() || resource.id(),
    }),
    notice: {
      message: translateMessage('successfullyDeleted', resource.id()),
      type: 'success',
    },
  };
};

export const softDelete: ActionHandler<RecordActionResponse> = async (_request, response, context) => {
  const { record, resource } = context;

  if (!record) {
    return response;
  }

  await makeSoftDelete(resource, record);

  return {
    ...makeResponseBase(context),
    record: record.toJSON(context.currentAdmin),
  };
};

export const bulkSoftDelete: ActionHandler<BulkActionResponse> = async (request, response, context) => {
  const { records, resource } = context;
  // jest coverage not reconized optional chaining
  // istanbul ignore next
  const hasRecords = records?.length > 0;

  if (!hasRecords) return response;

  /**
   * adminbro send 2 requests
   *
   * 1º - method GET - when clicked in "delete all" button in dashboard list
   *
   * 2º - methods POST - when clicked in "confirm removal" in drawer view
   */
  const hasConfirmedToDelete = request.method === 'post';

  if (hasConfirmedToDelete) {
    for (const record of records) {
      await makeSoftDelete(resource, record);
    }
  }

  return {
    ...makeResponseBase(context),
    records: records.map((r) => r.toJSON(context.currentAdmin)),
  };
};
