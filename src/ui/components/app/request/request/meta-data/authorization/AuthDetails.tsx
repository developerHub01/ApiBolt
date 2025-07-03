import { useAppSelector } from "@/context/redux/hooks";

const AuthDetails = () => {
  const authType = useAppSelector(
    (state) => state.requestResponse.authType[state.requestResponse.selectedTab!]
  );
  if (authType === "no-auth") return null;

  return (
    <div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        The authorization header will be automatically generated when you send
        the request.
      </p>
    </div>
  );
};

export default AuthDetails;
