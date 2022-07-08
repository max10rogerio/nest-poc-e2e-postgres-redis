import { BaseProvider } from '@adminjs/upload';
import { UploadedFile } from 'adminjs';
import * as fs from 'fs';
import * as path from 'path';

export class AdminUploadProvider extends BaseProvider {
  constructor() {
    // it requires bucket as a parameter to properly pass it to other methods
    const defaultBucket = 'uploads';
    super(defaultBucket);
  }

  async upload(file: UploadedFile, key: string): Promise<any> {
    const dirPath = path.dirname(key);

    if (!fs.existsSync(dirPath)) {
      await fs.promises.mkdir(dirPath, { recursive: true });
    }

    await fs.promises.copyFile(file.path, key);
    await fs.promises.unlink(file.path);

    return key;
  }

  async delete(key: string): Promise<any> {
    if (!fs.existsSync(key)) return;

    await fs.promises.unlink(key);

    const dirPath = path.dirname(key);
    const otherFiles = await fs.promises.readdir(dirPath);

    if (otherFiles && otherFiles.length == 0) {
      await fs.promises.rmdir(dirPath);
    }
  }

  path(key: string): Promise<string> | string {
    return key;
  }
}
