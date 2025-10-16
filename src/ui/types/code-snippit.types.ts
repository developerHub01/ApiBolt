import type {
  TContentType,
  THTTPMethods,
  TRequestBodyType,
} from "@/types/request-response.types";

export type TRequestCodeType =
  // JavaScript
  | "javascript-fetch"
  | "javascript-axios"
  | "javascript-jquery"
  | "javascript-xhr"
  | "javascript-superagent"
  | "node-http"
  // Python
  | "python-requests"
  | "python-http-client"
  | "python-urllib3"
  | "python-aiohttp"
  // Java
  | "java-okhttp"
  | "java-httpurlconnection"
  | "java-apache-httpclient"
  | "java-unirest"
  // C# / .NET
  | "csharp-httpclient"
  | "csharp-restsharp"
  | "csharp-flurl"
  // PHP
  | "php-curl"
  | "php-pecl_http"
  | "php-guzzle"
  | "php-http_request2"
  // Ruby
  | "ruby-net-http"
  | "ruby-restclient"
  | "ruby-http.rb"
  // Go
  | "go-net-http"
  | "go-fasthttp"
  // Shell / CLI
  | "shell-curl"
  | "shell-httpie"
  | "shell-wget"
  // Swift / iOS
  | "swift-urlsession"
  // Kotlin / Android
  | "kotlin-okhttp"
  // Dart / Flutter
  | "dart-http"
  | "dart-dio"
  // R
  | "r-httr"
  | "r-rcurl"
  // PowerShell
  | "powershell-invoke-restmethod"
  | "powershell-invoke-webrequest"
  // Elixir
  | "elixir-httpoison"
  | "elixir-tesla";

export interface RequestCodeSnippitInterface {
  maskedCode: string;
  code: string;
}

export interface CodeSnippitDataInterface {
  method: THTTPMethods;
  url: string;
  headers: Array<{
    key: string;
    value?: string;
  }>;
  authorization?: {
    key: string;
    value: string;
  };
  bodyType: TRequestBodyType;
  rawBodyDataType: TContentType;
  rawData: string;
  xWWWFormUrlencoded: Array<{
    key: string;
    value?: string;
  }>;
  formData: Array<{
    key: string;
    value: string;
    type: "file" | "text";
  }>;
  binaryData?: string;
}
