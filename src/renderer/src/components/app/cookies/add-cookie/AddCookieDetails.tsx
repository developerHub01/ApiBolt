import { useCallback } from "react";
import {
  selectAddCookieDetails,
  selectIsAddOptionOpen
} from "@/context/redux/cookies/selectors/cookies";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import AddCookieBottomAction from "@/components/app/cookies/add-cookie/AddCookieBottomAction";
import CookieEditor from "@/components/app/cookies/cookie-editor/CookieEditor";
import ContentWrapper from "@/components/app/cookies/ContentWrapper";
import type { CookieInterface } from "@shared/types/cookies.types";
import { handleChangeAddCookie } from "@/context/redux/cookies/cookies-slice";

const AddCookieDetails = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsAddOptionOpen);
  const details = useAppSelector(selectAddCookieDetails);

  const handleChange = useCallback(
    ({
      key,
      value
    }: {
      key: keyof CookieInterface;
      value: CookieInterface[keyof CookieInterface];
    }) => {
      dispatch(
        handleChangeAddCookie({
          [key]: value
        })
      );
    },
    [dispatch]
  );

  return (
    <ContentWrapper id={"add-cookie"} open={isOpen}>
      <CookieEditor
        details={details}
        onChange={handleChange}
        bottomAction={<AddCookieBottomAction />}
      />
    </ContentWrapper>
  );
};

export default AddCookieDetails;
