import { UploadType } from '../modules/upload/upload.type';

export interface UploadURL {
  postURL: string;
  getURL: string;
}

export interface AWS {
  createSignedURL: (url: string, type: string) => Promise<UploadURL>;
  getMessageUploadURL: (id: string, path: string) => Promise<UploadType>;
}
