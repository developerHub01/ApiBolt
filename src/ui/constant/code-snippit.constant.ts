import type {
  RequestCodeSnippitInterface,
  TRequestCodeType,
} from "@/types/code-snippit.types";

export const requestCodeSnippitsMap: Record<TRequestCodeType, string> = {
  // JavaScript
  "javascript-fetch": "JavaScript - Fetch",
  "javascript-axios": "JavaScript - Axios",
  "javascript-jquery": "JavaScript - jQuery",
  "javascript-xhr": "JavaScript - XHR",
  "javascript-superagent": "JavaScript - SuperAgent",
  "node-http": "Node - HTTP",

  // Python
  "python-requests": "Python - Requests",
  "python-http-client": "Python - HTTP Client",
  "python-urllib3": "Python - urllib3",
  "python-aiohttp": "Python - aiohttp",

  // Java
  "java-okhttp": "Java - OkHttp",
  "java-httpurlconnection": "Java - HttpURLConnection",
  "java-apache-httpclient": "Java - Apache HttpClient",
  "java-unirest": "Java - Unirest",

  // C# / .NET
  "csharp-httpclient": "C# - HttpClient",
  "csharp-restsharp": "C# - RestSharp",
  "csharp-flurl": "C# - Flurl",

  // PHP
  "php-curl": "PHP - cURL",
  "php-pecl_http": "PHP - pecl_http",
  "php-http_request2": "PHP - http_request2",
  "php-guzzle": "PHP - Guzzle",

  // Ruby
  "ruby-net-http": "Ruby - Net::HTTP",
  "ruby-restclient": "Ruby - RestClient",
  "ruby-http.rb": "Ruby - HTTP.rb",

  // Go
  "go-net-http": "Go - net/http",
  "go-fasthttp": "Go - fasthttp",

  // Shell / CLI
  "shell-curl": "Shell - cURL",
  "shell-httpie": "Shell - HTTPie",
  "shell-wget": "Shell - Wget",

  // Swift / iOS
  "swift-urlsession": "Swift - URLSession",
  "swift-alamofire": "Swift - Alamofire",

  // Kotlin / Android
  "kotlin-okhttp": "Kotlin - OkHttp",

  // Dart / Flutter
  "dart-http": "Dart - HTTP",
  "dart-dio": "Dart - Dio",

  // R
  "r-httr": "R - httr",
  "r-rcurl": "R - RCurl",

  // PowerShell
  "powershell-invoke-restmethod": "PowerShell - Invoke RestMethod",
  "powershell-invoke-webrequest": "PowerShell - Invoke WebRequest",

  // Elixir
  "elixir-httpoison": "Elixir - HTTPoison",
  "elixir-tesla": "Elixir - Tesla",
};

export const codeSnippitTypes = Object.keys(
  requestCodeSnippitsMap
) as Array<TRequestCodeType>;

export const codeSnippitByLanguageName = Object.keys(
  requestCodeSnippitsMap
).reduce(
  (acc, curr) => {
    const language = curr.split("-")[0];
    if (!acc[language]) acc[language] = [];
    acc[language].push(curr as TRequestCodeType);
    return acc;
  },
  {} as Record<string, Array<TRequestCodeType>>
);

export const codeSnippitLanguageList = Object.keys(codeSnippitByLanguageName);

export const MASKED_AUTHORIZATION = "••••••";

export const requestDefaultCodeSnippit: RequestCodeSnippitInterface = {
  code: "",
  maskedCode: "",
};
