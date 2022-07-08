import { Injectable } from '@nestjs/common';
import { FtpService } from 'nestjs-ftp';
import * as path from 'path';

@Injectable()
export class CopyFileService {
  constructor(private readonly ftpService: FtpService) {}

  public async copyFile(params: CopyFileServiceParams): Promise<CopyFileServiceResponse> {
    await this.ftpService.upload(path.join(params.folder, params.file), path.join(params.destination, params.file));

    const pathReturn: Path = {
      path: decodeURIComponent(path.join(params.destination, params.file)),
    };

    return pathReturn;
  }
}

type File = {
  folder: string;
  file: string;
  destination: string;
};

type Path = {
  path: string;
};

export type CopyFileServiceParams = File;
export type CopyFileServiceResponse = Path;
