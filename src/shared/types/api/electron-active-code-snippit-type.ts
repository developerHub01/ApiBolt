import { TRequestCodeType } from "@/shared/types/code-snippit.types";

export interface ElectronAPIActiveCodeSnippitTypeInterface {
  getActiveCodeSnippitType(): Promise<TRequestCodeType>;
  createActiveCodeSnippitType(
    languageId: TRequestCodeType
  ): Promise<boolean>;
  updateActiveCodeSnippitType(
    languageId: TRequestCodeType | null
  ): Promise<boolean>;
  deleteActiveCodeSnippitType(): Promise<boolean>;
};
