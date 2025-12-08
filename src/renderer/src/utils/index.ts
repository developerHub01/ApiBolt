export const calculateIntoFixedPoint = (result: number, point: number = 1) =>
  Number(result.toFixed(point));

export const normalizeText = (text: string) =>
  // Convert to lowercase and remove anything that's not a letter or number
  text.toLowerCase().replace(/[^a-z0-9]/g, "");

export const rotateIndex = ({
  type,
  length,
  current,
}: {
  type: "left" | "right";
  length: number;
  current: number;
}) =>
  type === "left" ? (length + current - 1) % length : (current + 1) % length;

export const getResponseType = (contentType: string) => {
  if (contentType.includes("application/json")) {
    return "JSON";
  } else if (contentType.includes("text/html")) {
    return "HTML";
  } else if (contentType.includes("text/plain")) {
    return "TEXT";
  } else if (
    contentType.includes("application/javascript") ||
    contentType.includes("application/x-javascript")
  ) {
    return "JavaScript";
  } else if (
    contentType.includes("application/xml") ||
    contentType.includes("text/xml")
  ) {
    return "XML";
  } else {
    return "TEXT";
  }
};

export const formatSize = (size: number) =>
  size > 1024 ? `${(size / 1024).toFixed(2)} KB` : `${size} B`;

export const parseUrlParams = (api: string) => {
  try {
    const url = new URL(api);
    return Array.from(url.searchParams.entries());
  } catch {
    const queryParams = api.split("?")[1] ?? "";
    return Array.from(new URLSearchParams(queryParams).entries());
  }
};

export const getRawContentType = (
  subtype: "json" | "xml" | "html" | "text" | "javascript",
) => {
  switch (subtype) {
    case "json":
      return "application/json";
    case "xml":
      return "application/xml";
    case "html":
      return "text/html";
    case "text":
      return "text/plain";
    case "javascript":
      return "application/javascript";
    default:
      return "text/plain";
  }
};

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const converterFileToMetadata = async (
  file: File,
  supportBase64: boolean = false,
) => {
  const fileData = {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    fileName: file.name,
    mimeType: file.type,
  };

  return {
    ...fileData,
    base64: supportBase64 ? await fileToBase64(file) : undefined,
  };
};

export const base64ToFileObject = (
  base64: string,
  filename: string,
  mimeType: string,
): File => {
  const byteString = atob(base64.split(",")[1]); // Decode Base64
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([ab], filename, { type: mimeType });
};

export const isLocalhost = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    return (
      hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
    );
  } catch {
    console.error("Invalid URL");
    return false;
  }
};

export const ensureAbsoluteUrl = (url: string): string => {
  if (/^https?:\/\//i.test(url)) {
    return url; // already absolute
  }
  return `http://${url}`; // fallback (you can choose https if needed)
};

export const dateFormater = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const formatedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "2-digit",
    });
    return formatedDate;
  } catch (error) {
    console.error(error);
    return dateString;
  }
};
