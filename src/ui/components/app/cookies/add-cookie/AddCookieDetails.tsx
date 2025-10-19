import {
  selectAddCookieDetails,
  selectIsAddOptionOpen,
} from "@/context/redux/cookies/selectors/cookies-selector";
import { useAppSelector } from "@/context/redux/hooks";
import AddCookieBottomAction from "@/components/app/cookies/add-cookie/AddCookieBottomAction";
import CookieEditor from "@/components/app/cookies/cookie-editor/CookieEditor";
import ContentWrapper from "@/components/app/cookies/ContentWrapper";

const AddCookieDetails = () => {
  const isOpen = useAppSelector(selectIsAddOptionOpen);
  const details = useAppSelector(selectAddCookieDetails);

  return (
    <ContentWrapper key={"add-cookie"} open={isOpen}>
      <CookieEditor
        details={details}
        onChange={() => {}}
        bottomAction={<AddCookieBottomAction />}
      />
    </ContentWrapper>
  );
};

export default AddCookieDetails;
