import ContentWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInput";
import AuthContentSelect from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentSelect";
import AuthContentInoutLabel from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInoutLabel";
import { JWT_ALGO_LIST } from "@/constant";
import PayloadCode from "@/components/app/request-panel/request/request/meta-data/authorization/content/jwt-bearer/PayloadCode";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import {
  defaultJWTBearerAuth,
  handleChangeJWTBearerAuth,
} from "@/context/redux/request-response/request-response-slice";
import { useCallback } from "react";

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
    (state) =>
      state.requestResponse.jwtBearerAuth[state.requestResponse.selectedTab!] ??
      defaultJWTBearerAuth
  );

  const handleBlur = useCallback(
    (
      key: "algo" | "secret" | "payload" | "headerPrefix" | "addTo",
      value: string
    ) => {
      dispatch(
        handleChangeJWTBearerAuth({
          key,
          value,
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
          onChange={(value) => handleBlur("algo", value)}
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
          onBlur={(value) => handleBlur("secret", value)}
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-add-to">
          Payload
        </AuthContentInoutLabel>
        <PayloadCode
          code={authData.payload}
          onBlur={(code: string) => handleBlur("payload", code)}
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
          onBlur={(value) => handleBlur("headerPrefix", value)}
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
          onChange={(value) => handleBlur("addTo", value)}
        />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default JWTBearer;
