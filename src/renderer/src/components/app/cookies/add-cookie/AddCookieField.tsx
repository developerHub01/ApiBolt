import { handleChangeAddCookie } from "@/context/redux/cookies/cookies-slice";
import { useAppDispatch } from "@/context/redux/hooks";
import type { CookieInterface } from "@shared/types/cookies.types";
import CookieField from "@/components/app/cookies/cookie-editor/CookieField";

interface Props {
  fieldKey: keyof CookieInterface;
  value: string;
}

const AddCookieField = ({ fieldKey, value }: Props) => {
  const dispatch = useAppDispatch();

  const handleChange = (value: CookieInterface[keyof CookieInterface]) => {
    if (["httpOnly", "secure"].includes(fieldKey))
      value = value === "false" ? false : true;

    dispatch(
      handleChangeAddCookie({
        [fieldKey]: value,
      })
    );
  };

  return (
    <CookieField fieldKey={fieldKey} value={value} onChange={handleChange} />
  );
};

export default AddCookieField;
