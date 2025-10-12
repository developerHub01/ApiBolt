import type { TRequestCodeType } from "@/types/code-snippit.types";

export const generateSwiftURLSessionCode = () => {};

export const generateSwiftAlamofireCode = () => {};

export const generateSwiftCode = (type: TRequestCodeType) => {
  switch (type) {
    case "swift-alamofire":
      return generateSwiftAlamofireCode();
    case "swift-urlsession":
      return generateSwiftURLSessionCode();
  }
};
