import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserHtml from "prettier/plugins/html";
import parserEstree from "prettier/plugins/estree";

export const getParser = (type: string) => {
  switch (type) {
    case "json":
      return "json";
    case "html":
    case "xml":
    case "text":
      return "html";
    case "javascript":
      return "babel";
    default:
      return "babel";
  }
};

export const formatCode = async (
  code: string,
  parserType: "babel" | "html" | "json"
): Promise<{
  success?: boolean;
  data?: string;
  message?: string;
}> => {
  const parser = getParser(parserType);
  try {
    let formatedCode = "";
    if (parserType === "json")
      formatedCode = JSON.stringify(JSON.parse(code), null, 2);
    else
      formatedCode = await prettier.format(code, {
        parser,
        plugins: [parserBabel, parserHtml, parserEstree],
      });

    return {
      success: true,
      data: formatedCode,
    };
  } catch {
    return {
      success: false,
      message: "Formatting error. Please check the input.",
    };
  }
};
