import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserHtml from "prettier/plugins/html";
import parserEstree from "prettier/plugins/estree";

const getParser = (type: string) => {
  switch (type) {
    case "json":
      return "json";
    case "html":
    case "xml":
      return "html";
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
  try {
    const formatedCode = await prettier.format(code, {
      parser: getParser(parserType),
      plugins: [parserBabel, parserHtml, parserEstree],
    });

    return {
      success: true,
      data: formatedCode,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Formatting error. Please check the input.",
    };
  }
};
