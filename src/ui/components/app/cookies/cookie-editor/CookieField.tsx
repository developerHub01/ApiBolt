import { memo } from "react";
import FieldInput from "@/components/app/cookies/cookie-editor/FieldInput";
import FieldSelector from "@/components/app/cookies/cookie-editor/FieldSelector";
import FieldDateSelector from "@/components/app/cookies/cookie-editor/FieldDateSelector";
import type { CookieInterface } from "@/types/cookies.types";
import { DEFAULT_COOKIE_DETAILS } from "@/context/redux/cookies/cookies-slice";

const sameSiteList = [
  {
    id: "strict",
    label: "Strict",
  },
  {
    id: "lax",
    label: "Lax",
  },
  {
    id: "none",
    label: "None",
  },
];

const booleanList = [
  {
    id: "true",
    label: "True",
  },
  {
    id: "false",
    label: "False",
  },
];

interface Props {
  fieldKey: keyof CookieInterface;
  value: CookieInterface[keyof CookieInterface];
  onChange: (value: string | null | boolean) => void;
}

const CookieField = memo(({ fieldKey, value, onChange }: Props) => {
  return (
    <>
      {fieldKey === "sameSite" ? (
        <FieldSelector
          list={sameSiteList}
          label="Select samesite"
          value={String(value ?? DEFAULT_COOKIE_DETAILS["sameSite"])}
          onChange={onChange}
        />
      ) : fieldKey === "httpOnly" ? (
        <FieldSelector
          list={booleanList}
          label="Select is httpOnly"
          value={String(value ?? DEFAULT_COOKIE_DETAILS["httpOnly"])}
          onChange={onChange}
        />
      ) : fieldKey === "hostOnly" ? (
        <FieldSelector
          list={booleanList}
          label="Select is hostOnly"
          value={String(value ?? DEFAULT_COOKIE_DETAILS["hostOnly"])}
          onChange={onChange}
        />
      ) : fieldKey === "secure" ? (
        <FieldSelector
          list={booleanList}
          label="Select is secure"
          value={String(value ?? DEFAULT_COOKIE_DETAILS["secure"])}
          onChange={onChange}
        />
      ) : fieldKey === "expires" ? (
        <FieldDateSelector
          value={(value as CookieInterface["expires"]) ?? null}
          onChange={onChange}
        />
      ) : (
        <FieldInput
          value={String(value ?? "")}
          onChange={onChange}
          placeholder={fieldKey}
        />
      )}
    </>
  );
});

export default CookieField;
