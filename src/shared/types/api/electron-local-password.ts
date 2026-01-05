export interface ElectronAPILocalPasswordInterface {
  getLocalPassword(): Promise<string | null>;
  getHaveLocalPassword(): Promise<boolean>;
  matchLocalPassword(payload: string): Promise<boolean>;
  changeLocalPassword(payload?: string | null): Promise<boolean>;
}
