import { useAppSelector } from "@/context/redux/hooks";
import {
  selectAuthApiKey,
  selectAuthBasicAuth,
  selectAuthBearerTokenAuth,
  selectAuthJWTBearerAuth,
} from "@/context/redux/request-response/selectors/auth";

const useGetAuthData = (id: string) => {
  const basicAuthData = useAppSelector(state => selectAuthBasicAuth(state, id));
  const bearerTokenAuthData = useAppSelector(state =>
    selectAuthBearerTokenAuth(state, id),
  );
  const jwtBearerAuthData = useAppSelector(state =>
    selectAuthJWTBearerAuth(state, id),
  );
  const apiKeyAuthData = useAppSelector(state => selectAuthApiKey(state, id));

  return {
    basicAuthData,
    bearerTokenAuthData,
    jwtBearerAuthData,
    apiKeyAuthData,
  };
};

export default useGetAuthData;
