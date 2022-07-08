import { StatusEnum } from 'src/modules/common/constants';
import { ExportTypeEnum } from 'src/modules/export/constants';
import { CreateExportServiceParams, CreateExportServiceResponse } from 'src/modules/export/services';

export const params: CreateExportServiceParams = {
  type: ExportTypeEnum.DIH,
  file: 'teste.txt',
  log: 'Its fine',
  status: StatusEnum.SUCCESS,
};

export const response: CreateExportServiceResponse = {
  type: ExportTypeEnum.DIH,
  file: 'teste.txt',
  log: 'Its fine',
  status: StatusEnum.SUCCESS,
  id: 1,
  createdAt: undefined,
  hasId: () => true,
  policies: undefined,
  recover: undefined,
  reload: undefined,
  remove: undefined,
  save: undefined,
  softRemove: undefined,
};
