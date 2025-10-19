import { memo } from "react";
import {
  selectCookies,
  selectSelectedCookieKey,
} from "@/context/redux/cookies/selectors/cookies-selector";
import { useAppSelector } from "@/context/redux/hooks";
import Cookie from "@/components/app/cookies/cookies-list/Cookie";
import ClearCookies from "@/components/app/cookies/cookies-list/clear-cookies/ClearCookies";
import AddCookie from "@/components/app/cookies/cookies-list/AddCookie";

const CookiesList = memo(() => {
  const cookies = useAppSelector(selectCookies);
  const selectedCookieKey = useAppSelector(selectSelectedCookieKey);

  return (
    <div className="w-full grid grid-cols-3 md:grid-cols-4 gap-2">
      <AddCookie />
      <ClearCookies />
      {cookies.map(({ key }) => (
        <Cookie key={key} id={key} selected={key === selectedCookieKey} />
      ))}
    </div>
  );
});

export default CookiesList;
