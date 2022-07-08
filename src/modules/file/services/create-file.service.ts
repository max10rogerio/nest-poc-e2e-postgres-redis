import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CreateFileService {
  public async createFile(params: CreateFileServiceParams): Promise<CreateFileServiceResponse> {
    if (!fs.existsSync(decodeURIComponent(params.folder))) {
      await fs.promises.mkdir(decodeURIComponent(params.folder), { recursive: true });
    }

    await fs.promises.writeFile(decodeURIComponent(path.join(params.folder, params.file)), params.text, 'utf8');

    const pathReturn: Path = {
      path: decodeURIComponent(path.join(params.folder, params.file)),
    };

    return pathReturn;
  }
}

type File = {
  folder: string;
  file: string;
  text: string;
};

type Path = {
  path: string;
};

export type CreateFileServiceParams = File;
export type CreateFileServiceResponse = Path;
