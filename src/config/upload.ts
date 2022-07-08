import { join } from 'path';

export const UPLOADS_FOLDER_NAME = 'uploads';
export const UPLOADS_PATH = join(__dirname, '..', '..', UPLOADS_FOLDER_NAME);

export const makeFileURL = (path: string | null, domain: string): string | null => {
  if (!path) return null;

  return new URL(path, domain).toString();
};
