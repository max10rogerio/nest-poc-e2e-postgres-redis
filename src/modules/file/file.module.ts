import { Module } from '@nestjs/common';
import { FtpModule } from 'nestjs-ftp';
import { loadEnv } from 'src/config';
import { CopyFileService, CreateFileService } from './services';

@Module({
  imports: [
    FtpModule.forRootFtpAsync({
      useFactory: async () => {
        const { ftp } = loadEnv();

        return ftp;
      },
    }),
  ],
  providers: [CreateFileService, CopyFileService],
  exports: [CreateFileService, CopyFileService],
})
export class FileModule {}
