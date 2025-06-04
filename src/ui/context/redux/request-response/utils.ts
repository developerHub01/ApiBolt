import type { ResponseFileDataInterface } from "@/context/redux/request-response/request-response-slice";

export const handleCheckImportedRequestFileValidator = (
  data: ResponseFileDataInterface
): boolean => {
  // Basic checks
  if ([data.name, data.url].some((v) => typeof v === "undefined")) return false;
  if (!["get", "post", "put", "patch", "delete"].includes(data.method))
    return false;
  if (!data.body || !data.body.selected) return false;

  // Validate params
  if (
    data.params &&
    !data.params.every(
      (v) =>
        typeof v === "object" &&
        "id" in v &&
        "key" in v &&
        "value" in v &&
        "description" in v
    )
  )
    return false;

  // Validate headers
  if (
    data.headers &&
    !data.headers.every(
      (v) =>
        typeof v === "object" &&
        "id" in v &&
        "value" in v &&
        "key" in v &&
        "description" in v
    )
  )
    return false;

  // Validate formData
  if (
    data.body.formData &&
    !data.body.formData.every((formDataItem) => {
      const isStringValue = typeof formDataItem.value === "string";
      const isFileArray =
        Array.isArray(formDataItem.value) &&
        formDataItem.value.every(
          (file) =>
            file &&
            typeof file.name === "string" &&
            typeof file.size === "number" &&
            typeof file.type === "string" &&
            typeof file.lastModified === "number" &&
            typeof file.fileName === "string" &&
            typeof file.mimeType === "string" &&
            (typeof file.base64 === "string" ||
              typeof file.base64 === "undefined")
        );

      return (
        typeof formDataItem === "object" &&
        "id" in formDataItem &&
        "key" in formDataItem &&
        "value" in formDataItem &&
        (isStringValue || isFileArray) &&
        (typeof formDataItem.description === "undefined" ||
          typeof formDataItem.description === "string")
      );
    })
  )
    return false;

  // Validate binaryData
  if (
    data.body.binaryData &&
    !(
      typeof data.body.binaryData === "object" &&
      typeof data.body.binaryData.name === "string" &&
      typeof data.body.binaryData.size === "number" &&
      typeof data.body.binaryData.type === "string" &&
      typeof data.body.binaryData.lastModified === "number" &&
      typeof data.body.binaryData.fileName === "string" &&
      typeof data.body.binaryData.mimeType === "string" &&
      (typeof data.body.binaryData.base64 === "string" ||
        typeof data.body.binaryData.base64 === "undefined")
    )
  )
    return false;

  // Everything passed
  return true;
};
