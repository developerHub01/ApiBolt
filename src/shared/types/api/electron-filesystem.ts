export interface electronAPIFileSystemInterface {
  openFolder: (_factor: string) => Promise<boolean>;
}
