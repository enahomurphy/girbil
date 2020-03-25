export interface UploadURL {
  postURL: string;
  getURL: string;
}


export interface UploadVideo {
  postThumbnailURL: string;
  getThumbnailURL: string;
  postVideoURL: string;
  getVideoURL: string;
}

export interface AWS {
  createSignedURL: (url: string, type: string) => Promise<UploadURL>;
  getMessageUploadURL: (id: string, path: string) => Promise<UploadVideo>;
}
