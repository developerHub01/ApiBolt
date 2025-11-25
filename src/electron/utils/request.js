import { stat } from "fs/promises";

export const validateRequest = async ({
  name,
  url,
  method,
  params,
  headers,
  hiddenHeadersCheck,
  requestMetaTab,
  bodyRaw,
  bodyBinary,
  bodyXWWWFormUrlencoded,
  bodyFormData,
  authorization,
} = {}) => {
  try {
    if (
      [name, method, url].includes(undefined) ||
      (params && !Array.isArray(params)) ||
      (headers && !Array.isArray(headers)) ||
      (bodyXWWWFormUrlencoded && !Array.isArray(bodyXWWWFormUrlencoded)) ||
      (bodyFormData && !Array.isArray(bodyFormData))
    )
      return false;

    if (params) {
      for (const param of params) {
        if (
          typeof param.key !== "string" ||
          typeof param.value !== "string" ||
          typeof param.description !== "string" ||
          typeof param.isCheck !== "boolean" ||
          !["text", "env"].includes(param.keyType) ||
          !["text", "env"].includes(param.valueType)
        )
          return false;
      }
    }

    if (headers) {
      for (const header of headers) {
        if (
          typeof header.key !== "string" ||
          typeof header.value !== "string" ||
          typeof header.description !== "string" ||
          typeof header.isCheck !== "boolean"
        )
          return false;
      }
    }

    if (bodyXWWWFormUrlencoded) {
      for (const data of bodyXWWWFormUrlencoded) {
        if (
          typeof data.key !== "string" ||
          typeof data.value !== "string" ||
          typeof data.description !== "string" ||
          typeof data.isCheck !== "boolean"
        )
          return false;
      }
    }

    if (bodyFormData) {
      for (const data of bodyFormData) {
        if (
          typeof data.key !== "string" ||
          (typeof data.value !== "string" && Array.isArray(data.value)) ||
          typeof data.description !== "string" ||
          typeof data.isCheck !== "boolean"
        )
          return false;

        if (Array.isArray(data.value)) {
          for (const path in data.value) {
            if (typeof path !== "string") return;
            try {
              if (!(await stat(path)).isFile()) throw new Error();
            } catch (error) {
              return false;
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
