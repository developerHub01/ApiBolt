import { useState } from "react";
import { Button } from "@/components/ui/button";
import { selectCookiesCount } from "@/context/redux/cookies/selectors/cookies-selector";
import { useAppSelector } from "@/context/redux/hooks";
import ClearAlert from "@/components/app/cookies/cookies-list/clear-cookies/ClearAlert";

const ClearCookies = () => {
  const cookiesCount = useAppSelector(selectCookiesCount);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const handleToggleAlert = (value?: boolean) =>
    setIsAlertOpen((prev) => value ?? !prev);

  if (!cookiesCount) return null;

  return (
    <>
      <Button
        variant={"secondary"}
        onClick={() => handleToggleAlert(true)}
        className="w-full"
      >
        Clear All
      </Button>
      <ClearAlert
        isOpen={isAlertOpen}
        onClose={() => handleToggleAlert(false)}
      />
    </>
  );
};

export default ClearCookies;
