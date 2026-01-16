import { TValueType } from "@/components/app/setting/content/request/boolean-based-select/types/index";

export const getRealToPresentable = (value: unknown) => {
  switch (value) {
    case -1: {
      value = "default";
      break;
    }
    case 0: {
      value = "off";
      break;
    }
    case 1: {
      value = "on";
      break;
    }
  }

  return value as TValueType;
};

export const getPresentableToReal = (value: unknown) => {
  switch (value) {
    case "default": {
      value = -1;
      break;
    }
    case "off": {
      value = 0;
      break;
    }
    case "on": {
      value = 1;
      break;
    }
  }

  return value as number | string | null;
};
