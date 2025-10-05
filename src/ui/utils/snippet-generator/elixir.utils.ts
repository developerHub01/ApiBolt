import type { TRequestCodeType } from "@/types/request-code.type";

export const generateElixirHTTPoisonCode = () => {};

export const generateElixirTeslaCode = () => {};

export const generateElixirCode = (type: TRequestCodeType) => {
  switch (type) {
    case "elixir-httpoison":
      return generateElixirHTTPoisonCode();
    case "elixir-tesla":
      return generateElixirTeslaCode();
  }
};
