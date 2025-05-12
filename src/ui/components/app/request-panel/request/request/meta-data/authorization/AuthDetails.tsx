import { useRequestResponse } from "@/context/request/RequestResponseProvider";

const AuthDetails = () => {
  const { authType } = useRequestResponse();

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
