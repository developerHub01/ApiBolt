import { memo } from "react";
import CookiesList from "@/components/app/cookies/cookies-list/CookiesList";
import CookieDetails from "@/components/app/cookies/cookie-details/CookieDetails";
import NoCookies from "@/components/app/cookies/cookies-list/NoCookies";
import {
  selectCookiesCount,
  selectIsAddOptionOpen,
} from "@/context/redux/cookies/selectors/cookies-selector";
import { useAppSelector } from "@/context/redux/hooks";
import AddCookieDetails from "@/components/app/cookies/add-cookie/AddCookieDetails";

const CookiesContent = memo(() => {
  const cookiesCount = useAppSelector(selectCookiesCount);
  const isAddOptionOpen = useAppSelector(selectIsAddOptionOpen);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-2">
      <CookiesList />
      <AddCookieDetails />
      {Boolean(cookiesCount) && <CookieDetails />}
      {!cookiesCount && !isAddOptionOpen && <NoCookies />}
    </div>
  );
});

export default CookiesContent;
