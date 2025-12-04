import { FormDataPayloadInterface } from "@/shared/types/request-response.types";

export interface ElectronAPIBodyFormDataInterface {
  getBodyFormData(
    requestOrFolderMetaId?: string | null
  ): Promise<Array<FormDataPayloadInterface>>;
  deleteBodyFormData(formId: string): Promise<boolean>;
  deleteBodyFormDataByRequestMetaId(
    requestOrFolderMetaId?: string | null
  ): Promise<boolean>;
  deleteBodyFormDataFile(formId: string, index: number): Promise<boolean>;
  createBodyFormData(
    payload: Partial<
      FormDataPayloadInterface & {
        requestOrFolderMetaId?: string | null;
      }
    >
  ): Promise<boolean>;
  updateBodyFormData(
    formId: string,
    payload: Partial<FormDataPayloadInterface>
  ): Promise<boolean>;
  updateBodyFormDataFile(formId: string): Promise<boolean>;
  replaceBodyFormData(
    requestOrFolderMetaId: string,
    payload?: Array<Partial<FormDataPayloadInterface>>
  ): Promise<boolean>;
  replaceFullBodyFormData(
    requestOrFolderMetaId: string,
    payload?: Array<Partial<FormDataPayloadInterface>>
  ): Promise<boolean>;
  checkAllBodyFormDataByRequestMetaId(
    requestOrFolderMetaId?: string | null
  ): Promise<boolean>;
  duplicateBodyFormData(payload: Record<string, string>): Promise<boolean>;
}
