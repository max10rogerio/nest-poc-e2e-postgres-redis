import { UploadedFile } from 'adminjs';
import * as fs from 'fs';
import { AdminUploadProvider } from 'src/modules/admin/admin.provider';

const file: UploadedFile = {
  name: 'test.jpg',
  path: 'tests/test.jpg',
  size: 1,
  type: 'image/jpeg',
};

describe('AdminProvider (Unit)', () => {
  describe('upload function', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should be call create mkdir function if not exists path', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(false as never);
      jest.spyOn(fs.promises, 'copyFile').mockImplementation(() => Promise.resolve());
      jest.spyOn(fs.promises, 'unlink').mockImplementation(() => Promise.resolve());

      const spyMkDir = jest.spyOn(fs.promises, 'mkdir').mockImplementation(() => Promise.resolve('test'));

      const provider = new AdminUploadProvider();

      await provider.upload(file, 'tests');

      expect(spyMkDir).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete function', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should be not call unlink when not exists file', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(false as never);

      const unlinkSpy = jest.spyOn(fs.promises, 'unlink');

      const provider = new AdminUploadProvider();

      await provider.delete('test.jpg');

      expect(unlinkSpy).not.toHaveBeenCalled();
    });

    it('should be call unlink when exists file and not call rmdir', async () => {
      jest.spyOn(fs.promises, 'rmdir');
      jest.spyOn(fs.promises, 'unlink').mockImplementation(() => Promise.resolve());
      jest.spyOn(fs, 'existsSync').mockReturnValue(true as never);
      jest.spyOn(fs.promises, 'readdir').mockImplementation(() => Promise.resolve([1, 2, 3] as any));

      const provider = new AdminUploadProvider();

      await provider.delete('test.jpg');

      expect(fs.promises.unlink).toHaveBeenCalled();
      expect(fs.promises.rmdir).not.toHaveBeenCalled();
    });

    it('should be call unlink and remove directory when not exists more files inside path', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(true as never);
      jest.spyOn(fs.promises, 'readdir').mockImplementation(() => Promise.resolve([]));
      jest.spyOn(fs.promises, 'unlink').mockImplementation(() => Promise.resolve());
      jest.spyOn(fs.promises, 'rmdir').mockImplementation(() => Promise.resolve());

      const provider = new AdminUploadProvider();

      await provider.delete('test.jpg');

      expect(fs.promises.rmdir).toHaveBeenCalled();
    });
  });

  describe('path function', () => {
    it('should be return key param', () => {
      const provider = new AdminUploadProvider();

      expect(provider.path('test')).toEqual('test');
    });
  });
});
