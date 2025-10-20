import { useCallback } from "react";
import { handleChangeAddCookie } from "@/context/redux/cookies/cookies-slice";
import { useAppDispatch } from "@/context/redux/hooks";
import type { CookieInterface } from "@/types/cookies.types";
import CookieField from "@/components/app/cookies/cookie-editor/CookieField";

interface Props {
  fieldKey: keyof CookieInterface;
  value: string;
}

const DetailsCookieField = ({ fieldKey, value }: Props) => {
  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (value: CookieInterface[keyof CookieInterface]) =>
      dispatch(
        handleChangeAddCookie({
          [fieldKey]: value,
        })
      ),
    [dispatch, fieldKey]
  );

  return (
    <CookieField fieldKey={fieldKey} value={value} onChange={handleChange} />
  );
};

export default DetailsCookieField;
