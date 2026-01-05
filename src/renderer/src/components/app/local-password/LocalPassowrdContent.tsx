import { memo } from "react";
import LocalPasswordProtector from "@/components/app/local-password/LocalPasswordProtector";
import LocalPasswordOption from "@/components/app/local-password/LocalPasswordOption";
import LocalPasswordChange from "@/components/app/local-password/LocalPasswordChange";
import { useLocalPassword } from "@/context/local-password/LocalPasswordProvider";

const LocalPassowrdContent = memo(() => {
  const { stage } = useLocalPassword();

  switch (stage) {
    case "protect":
      return <LocalPasswordProtector />;
    case "change":
      return <LocalPasswordChange />;
    case "option":
      return <LocalPasswordOption />;
    default:
      return null;
  }
});

export default LocalPassowrdContent;
