export const httpStatus = {
  100: {
    reason: "Continue",
    description:
      "The server has received the request headers and the client should proceed to send the request body.",
  },
  101: {
    reason: "Switching Protocols",
    description: "The requester has asked the server to switch protocols.",
  },
  102: {
    reason: "Processing",
    description:
      "The server has received and is processing the request, but no response is available yet.",
  },
  200: {
    reason: "OK",
    description: "Request successful. The server has responded as required.",
  },
  201: {
    reason: "Created",
    description:
      "The request has been fulfilled and a new resource has been created.",
  },
  202: {
    reason: "Accepted",
    description:
      "The request has been accepted for processing, but the processing is not complete.",
  },
  203: {
    reason: "Non-Authoritative Information",
    description:
      "The server is returning information that may be from another source.",
  },
  204: {
    reason: "No Content",
    description:
      "The server successfully processed the request, but is not returning any content.",
  },
  205: {
    reason: "Reset Content",
    description:
      "The server has fulfilled the request and the client should reset the document view.",
  },
  206: {
    reason: "Partial Content",
    description:
      "The server is delivering only part of the resource due to a range header sent by the client.",
  },
  300: {
    reason: "Multiple Choices",
    description: "The request has more than one possible response.",
  },
  301: {
    reason: "Moved Permanently",
    description:
      "The URL of the requested resource has been changed permanently.",
  },
  302: {
    reason: "Found",
    description: "The resource resides temporarily under a different URI.",
  },
  303: {
    reason: "See Other",
    description:
      "The response can be found under a different URI and should be retrieved using a GET method.",
  },
  304: {
    reason: "Not Modified",
    description: "The resource has not been modified since the last request.",
  },
  307: {
    reason: "Temporary Redirect",
    description: "The resource resides temporarily under a different URI.",
  },
  308: {
    reason: "Permanent Redirect",
    description: "The resource has been permanently moved to a new URI.",
  },
  400: {
    reason: "Bad Request",
    description:
      "The server could not understand the request due to invalid syntax.",
  },
  401: {
    reason: "Unauthorized",
    description:
      "The client must authenticate itself to get the requested response.",
  },
  402: {
    reason: "Payment Required",
    description: "Reserved for future use.",
  },
  403: {
    reason: "Forbidden",
    description: "The client does not have access rights to the content.",
  },
  404: {
    reason: "Not Found",
    description: "The server can not find the requested resource.",
  },
  405: {
    reason: "Method Not Allowed",
    description: "The method is not allowed for the requested URL.",
  },
  406: {
    reason: "Not Acceptable",
    description:
      "The server cannot produce a response matching the list of acceptable values.",
  },
  407: {
    reason: "Proxy Authentication Required",
    description: "Authentication with a proxy is required.",
  },
  408: {
    reason: "Request Timeout",
    description: "The server timed out waiting for the request.",
  },
  409: {
    reason: "Conflict",
    description:
      "The request could not be completed due to a conflict with the current state of the target resource.",
  },
  410: {
    reason: "Gone",
    description:
      "The resource is no longer available and will not be available again.",
  },
  411: {
    reason: "Length Required",
    description: "The request did not specify the length of its content.",
  },
  412: {
    reason: "Precondition Failed",
    description:
      "The server does not meet one of the preconditions that the requester put on the request.",
  },
  413: {
    reason: "Payload Too Large",
    description:
      "The request is larger than the server is willing or able to process.",
  },
  414: {
    reason: "URI Too Long",
    description: "The URI provided was too long for the server to process.",
  },
  415: {
    reason: "Unsupported Media Type",
    description:
      "The media type of the request is not supported by the server.",
  },
  416: {
    reason: "Range Not Satisfiable",
    description:
      "The range specified by the Range header field in the request can't be fulfilled.",
  },
  417: {
    reason: "Expectation Failed",
    description:
      "The expectation given in the request's Expect header could not be met.",
  },
  418: {
    reason: "I'm a teapot",
    description:
      "This code was defined in 1998 as one of the traditional IETF April Fools' jokes.",
  },
  422: {
    reason: "Unprocessable Entity",
    description:
      "The request was well-formed but was unable to be followed due to semantic errors.",
  },
  425: {
    reason: "Too Early",
    description:
      "Indicates that the server is unwilling to risk processing a request that might be replayed.",
  },
  426: {
    reason: "Upgrade Required",
    description: "The client should switch to a different protocol.",
  },
  428: {
    reason: "Precondition Required",
    description: "The origin server requires the request to be conditional.",
  },
  429: {
    reason: "Too Many Requests",
    description:
      "The user has sent too many requests in a given amount of time.",
  },
  431: {
    reason: "Request Header Fields Too Large",
    description:
      "The server is unwilling to process the request because its header fields are too large.",
  },
  451: {
    reason: "Unavailable For Legal Reasons",
    description:
      "The server is denying access to the resource as a consequence of a legal demand.",
  },
  500: {
    reason: "Internal Server Error",
    description:
      "The server has encountered a situation it doesn't know how to handle.",
  },
  501: {
    reason: "Not Implemented",
    description:
      "The request method is not supported by the server and cannot be handled.",
  },
  502: {
    reason: "Bad Gateway",
    description:
      "The server, while acting as a gateway, received an invalid response from the upstream server.",
  },
  503: {
    reason: "Service Unavailable",
    description: "The server is not ready to handle the request.",
  },
  504: {
    reason: "Gateway Timeout",
    description:
      "The server is acting as a gateway and cannot get a response in time.",
  },
  505: {
    reason: "HTTP Version Not Supported",
    description:
      "The HTTP version used in the request is not supported by the server.",
  },
};
