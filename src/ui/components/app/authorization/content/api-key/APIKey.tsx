import { memo, useCallback } from "react";
import ContentWrapper from "@/components/app/authorization/content/ContentWrapper";
import AuthContentInput from "@/components/app/authorization/content/AuthContentInput";
import AuthContentInoutLabel from "@/components/app/authorization/content/AuthContentInoutLabel";
import AuthContentSelect from "@/components/app/authorization/content/AuthContentSelect";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateAuthorization } from "@/context/redux/request-response/thunks/auth";
import { selectAuthApiKey } from "@/context/redux/request-response/selectors/auth";

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

interface Props {
  id: string;
  disabled?: boolean;
}

const APIKey = memo(({ id, disabled = false }: Props) => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(selectAuthApiKey(id));

  const handleBlur = useCallback(
    (key: "apiKeyKey" | "apiKeyValue" | "apiKeyAddTo", value: string) => {
      dispatch(
        updateAuthorization({
          payload: {
            [key]: value.trim(),
          },
        })
      );
    },
    [dispatch]
  );

  return (
    <ContentWrapper>
      <AuthContentInoutLabel htmlFor="api-key">Key</AuthContentInoutLabel>
      <AuthContentInput
        id="api-key"
        placeholder="Key"
        value={authData.key}
        onBlur={(value) => handleBlur("apiKeyKey", value)}
        disabled={disabled}
      />
      <AuthContentInoutLabel htmlFor="api-value">Value</AuthContentInoutLabel>
      <AuthContentInput
        id="api-key"
        placeholder="Value"
        type="password"
        value={authData.value}
        onBlur={(value) => handleBlur("apiKeyValue", value)}
        disabled={disabled}
      />
      <AuthContentInoutLabel htmlFor="api-add-to">Add to</AuthContentInoutLabel>
      <AuthContentSelect
        id="api-key"
        items={addToList}
        value={authData.addTo}
        defaultValue={addToList[0].id}
        onChange={(value) => handleBlur("apiKeyAddTo", value)}
        disabled={disabled}
      />
    </ContentWrapper>
  );
});

export default APIKey;
