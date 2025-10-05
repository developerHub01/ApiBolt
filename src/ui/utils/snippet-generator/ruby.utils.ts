import type { TRequestCodeType } from "@/types/request-code.type";

export const generateRubyNetHttpCode = () => {};

export const generateRubyRestClientCode = () => {};

export const generateRubyHTTPRbCode = () => {};

export const generateRubyCode = (type: TRequestCodeType) => {
  switch (type) {
    case "ruby-net-http":
      return generateRubyNetHttpCode();
    case "ruby-restclient":
      return generateRubyRestClientCode();
    case "ruby-http.rb":
      return generateRubyHTTPRbCode();
  }
};
