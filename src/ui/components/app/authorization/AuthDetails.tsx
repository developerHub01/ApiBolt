import { useAppSelector } from "@/context/redux/hooks";
import { selectAuthTypeById } from "@/context/redux/request-response/selectors/auth";

interface Props {
  id: string;
}

const AuthDetails = ({ id }: Props) => {
  const authType = useAppSelector(selectAuthTypeById(id));
  if (authType === "no-auth") return null;

  return (
    <p className="text-sm text-muted-foreground leading-relaxed pt-1">
      The authorization header will be automatically generated when you send the
      request.
    </p>
  );
};

export default AuthDetails;
