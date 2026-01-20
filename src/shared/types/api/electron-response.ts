export interface ElectronAPIResponseInterface {
  saveResponse(payload: {
    contentType: string;
    data: unknown;
  }): Promise<boolean>;
}
