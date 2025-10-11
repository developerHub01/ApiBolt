import { requestDefaultCodeSnippit } from "@/constant/request-code.constant";
import type { CodeSnippitDataInterface } from "@/types/code-snippit.types";
import type {
  RequestCodeSnippitInterface,
  TRequestCodeType,
} from "@/types/request-code.type";
import { generateJavaScriptCode } from "@/utils/snippet-generator/javascript/javascript.utils";
import { generateNodeCode } from "@/utils/snippet-generator/node.utils";
// import { generateJavaCode } from "@/utils/snippet-generator/java.utils";
// import { generateDartCode } from "@/utils/snippet-generator/dart.utils";
// import { generateKotlinCode } from "@/utils/snippet-generator/kotlin.utils";
// import { generateSwiftCode } from "@/utils/snippet-generator/swift.utils";
// import { generateRubyCode } from "@/utils/snippet-generator/ruby.utils";
// import { generateRCode } from "@/utils/snippet-generator/r.utils";
import { generatePHPCode } from "@/utils/snippet-generator/php/php.utils";
import { generateGoCode } from "@/utils/snippet-generator/go/go.utils";
import { generatePythonCode } from "@/utils/snippet-generator/python/python.utils";
// import { generateShellCode } from "@/utils/snippet-generator/shell.utils";
// import { generatePowerShellCode } from "@/utils/snippet-generator/powershell.utils";
// import { generateCSharpCode } from "@/utils/snippet-generator/csharp.utils";
// import { generateElixirCode } from "@/utils/snippet-generator/elixir.utils";

const generatorMap: Record<
  string,
  (
    type: TRequestCodeType,
    data: CodeSnippitDataInterface
  ) => Promise<RequestCodeSnippitInterface>
> = {
  javascript: generateJavaScriptCode,
  node: generateNodeCode,
  python: generatePythonCode,
  go: generateGoCode,
  // java: generateJavaCode,
  // dart: generateDartCode,
  // kotlin: generateKotlinCode,
  // swift: generateSwiftCode,
  // ruby: generateRubyCode,
  // r: generateRCode,
  php: generatePHPCode,
  // shell: generateShellCode,
  // powershell: generatePowerShellCode,
  // csharp: generateCSharpCode,
  // elixir: generateElixirCode,
};

export const generateCode = async (
  type: TRequestCodeType,
  data: CodeSnippitDataInterface
): Promise<RequestCodeSnippitInterface> => {
  const lowerType = type.toLowerCase().replace(/\s+/g, "");

  const key = (Object.keys(generatorMap).find((k) => lowerType.startsWith(k)) ??
    null) as keyof typeof generatorMap | null;

  return key ? await generatorMap[key](type, data) : requestDefaultCodeSnippit;
};
