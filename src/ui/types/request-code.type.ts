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
  | "php-file-get-contents"
  | "php-guzzle"
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
  | "swift-alamofire"
  // Kotlin / Android
  | "kotlin-okhttp"
  | "kotlin-retrofit"
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
