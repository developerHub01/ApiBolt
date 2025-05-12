import ContentWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/ContentWrapper";
import AuthKeyValueWrapper from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthKeyValueWrapper";
import AuthContentInput from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInput";
import AuthContentSelect from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentSelect";
import AuthContentInoutLabel from "@/components/app/request-panel/request/request/meta-data/authorization/content/AuthContentInoutLabel";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import { JWT_ALGO_LIST } from "@/constant";
import PayloadCode from "@/components/app/request-panel/request/request/meta-data/authorization/content/jwt-bearer/PayloadCode";

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
  const { jwtBearerAuth, handleChangeJWTBearerAuth } = useRequestResponse();

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
          value={jwtBearerAuth.algo ?? algoList[0].id}
          onChange={(value) => handleChangeJWTBearerAuth("algo", value)}
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-add-to">
          Secret
        </AuthContentInoutLabel>
        <AuthContentInput
          id="api-key"
          className="w-full"
          value={jwtBearerAuth.secret}
          onBlur={(value) => handleChangeJWTBearerAuth("secret", value)}
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-add-to">
          Payload
        </AuthContentInoutLabel>
        <PayloadCode
          code={jwtBearerAuth.payload}
          onBlur={(code) => handleChangeJWTBearerAuth("payload", code)}
        />
      </AuthKeyValueWrapper>
      <AuthKeyValueWrapper>
        <AuthContentInoutLabel htmlFor="api-add-to">
          Request header prefix
        </AuthContentInoutLabel>
        <AuthContentInput
          id="api-key"
          className="max-w-80"
          value={jwtBearerAuth.headerPrefix}
          onBlur={(value) => handleChangeJWTBearerAuth("headerPrefix", value)}
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
          value={jwtBearerAuth.addTo ?? addToList[0].id}
          onChange={(value) => handleChangeJWTBearerAuth("addTo", value)}
        />
      </AuthKeyValueWrapper>
    </ContentWrapper>
  );
};

export default JWTBearer;
