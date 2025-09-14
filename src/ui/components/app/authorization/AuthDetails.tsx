import { useAppSelector } from "@/context/redux/hooks";
import { selectAuthType } from "@/context/redux/request-response/request-response-selector";

const AuthDetails = () => {
  const authType = useAppSelector(selectAuthType);
  if (authType === "no-auth") return null;

  return (
    <p className="text-sm text-muted-foreground leading-relaxed pt-1">
      The authorization header will be automatically generated when you send the
      request.
    </p>
  );
};

export default AuthDetails;
