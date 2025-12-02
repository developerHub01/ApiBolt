import {
  FormDataPayloadInterface,
  ParamHeaderBuildPayloadInterface,
  ParamHeaderPayloadInterface
} from "@/shared/types/request-response.types";

export interface ElectronAPIBodyXWWWFormUrlencodedInterface {
  getBodyXWWWFormUrlencoded(
    requestOrFolderMetaId?: string
  ): Promise<Array<ParamHeaderPayloadInterface>>;
  deleteBodyXWWWFormUrlencoded(formId: string): Promise<boolean>;
  deleteBodyXWWWFormUrlencodedByRequestMetaId(
    requestOrFolderMetaId?: string
  ): Promise<boolean>;
  createBodyXWWWFormUrlencoded(
    payload: Partial<ParamHeaderBuildPayloadInterface>
  ): Promise<boolean>;
  updateBodyXWWWFormUrlencoded(
    formId: string,
    payload: Partial<ParamHeaderBuildPayloadInterface>
  ): Promise<boolean>;
  replaceBodyXWWWFormUrlencoded(
    requestOrFolderMetaId: string,
    payload?: Array<Partial<FormDataPayloadInterface>>
  ): Promise<boolean>;
  checkAllBodyXWWWFormUrlencodedByRequestMetaId(
    requestOrFolderMetaId?: string
  ): Promise<boolean>;
  duplicateBodyXWWWFormUrlencoded(
    payload: Record<string, string>
  ): Promise<boolean>;
}
