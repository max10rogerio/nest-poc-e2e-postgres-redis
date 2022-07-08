import { BaseRecord } from 'adminjs';
import * as crypto from 'crypto';
import * as path from 'path';
import { UPLOADS_FOLDER_NAME } from 'src/config';
import { makeUploadResourcePath } from 'src/modules/admin/utils';

describe('makeUploadResourcePath (Unit)', () => {
  it('should be make a resource path with UUID', () => {
    const uuid = '50371aaf-4614-4826-998c-443477cf5cb4';
    const baseRecord = {
      id: () => '1',
    };

    jest.spyOn(crypto, 'randomUUID').mockReturnValue(uuid);

    const expected = path.join(UPLOADS_FOLDER_NAME, 'test', '1', `${uuid}.jpg`);
    const result = makeUploadResourcePath('test')(baseRecord as BaseRecord, 'test.jpg');

    expect(result).toEqual(expected);
  });
});
