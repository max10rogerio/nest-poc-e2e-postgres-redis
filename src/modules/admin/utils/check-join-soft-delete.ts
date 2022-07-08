import { After, ListActionResponse } from 'adminjs';

export function checkJoinSoftDelete(response: ListActionResponse, relation: string) {
  response.records = response.records.filter((record) => !!record.populated[relation]?.id);
  return response;
}

export const checkJoinSoftDeleteProduct: After<ListActionResponse> = async (response) => {
  return checkJoinSoftDelete(response, 'productId');
};
