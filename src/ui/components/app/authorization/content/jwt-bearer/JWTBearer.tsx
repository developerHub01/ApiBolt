import { useCallback } from "react";
import ContentWrapper from "@/components/app/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/authorization/content/AuthContentInput";
import AuthContentSelect from "@/components/app/authorization/content/AuthContentSelect";
import AuthContentInoutLabel from "@/components/app/authorization/content/AuthContentInoutLabel";
import { JWT_ALGO_LIST } from "@/constant";
import PayloadCode from "@/components/app/authorization/content/jwt-bearer/PayloadCode";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateAuthorization } from "@/context/redux/request-response/request-response-thunk";
import { defaultJWTBearerAuth } from "@/constant/request-response.constant";

const algoList = JWT_ALGO_LIST.map((algo) => ({
  id: algo,
  label: algo.toUpperCase(),
}));

const addToList = [
  {
    id: "header",
    label: "Header",
  },
  {
    id: "query",
    label: "Query Params",
  },
];

const JWTBearer = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(
    (state) => state.requestResponse.jwtBearerAuth ?? defaultJWTBearerAuth
  );

  const handleBlur = useCallback(
    (
      key:
        | "jwtAlgo"
        | "jwtSecret"
        | "jwtPayload"
        | "jwtHeaderPrefix"
        | "jwtAddTo",
      value: string
    ) => {
      dispatch(
        updateAuthorization({
          [key]: value,
        })
      );
    },
    [dispatch]
  );

  return (
    <ContentWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-add-to">
          Algorithm
        </AuthContentInoutLabel>
        <AuthContentSelect
          id="api-key"
          className="w-full"
          items={algoList}
          value={authData.algo ?? algoList[0].id}
          onChange={(value) => handleBlur("jwtAlgo", value)}
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-add-to">
          Secret
        </AuthContentInoutLabel>
        <AuthContentInput
          id="api-key"
          className="w-full"
          type="password"
          value={authData.secret}
          onBlur={(value) => handleBlur("jwtSecret", value)}
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-add-to">
          Payload
        </AuthContentInoutLabel>
        <PayloadCode
          code={authData.payload}
          onBlur={(code: string) => handleBlur("jwtPayload", code)}
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-add-to">
          Request header prefix
        </AuthContentInoutLabel>
        <AuthContentInput
          id="api-key"
          className="max-w-80"
          value={authData.headerPrefix}
          onBlur={(value) => handleBlur("jwtHeaderPrefix", value)}
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-add-to">
          Add to
        </AuthContentInoutLabel>
        <AuthContentSelect
          id="api-key"
          className="w-full"
          items={addToList}
          value={authData.addTo ?? addToList[0].id}
          onChange={(value) => handleBlur("jwtAddTo", value)}
        />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default JWTBearer;
