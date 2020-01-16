declare interface UploadFileHandler {
  error(error: Error): void
  upload(): Promise<void>
  delete(): Promise<void>
}
