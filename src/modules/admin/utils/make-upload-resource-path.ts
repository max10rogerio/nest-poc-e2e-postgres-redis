import { BaseRecord } from 'adminjs';
import { randomUUID } from 'crypto';
import { extname, join } from 'path';
import { UPLOADS_FOLDER_NAME } from 'src/config';

export const makeUploadResourcePath = (resource: string) => (record: BaseRecord, filename: string) => {
  const ext = extname(filename);
  const customFilename = `${randomUUID()}${ext}`;

  return join(UPLOADS_FOLDER_NAME, resource, record.id().toString(), customFilename);
};
