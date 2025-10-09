import { memo, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateAuthorization } from "@/context/redux/request-response/thunks/auth";
import type { TAuthType } from "@/types/authorization.types";
import { DEFAULT_AUTHORIZATION_ID } from "@/constant/authorization.constant";
import { selectAuthTypeById } from "@/context/redux/request-response/selectors/auth";
import AuthContentSelect from "@/components/app/authorization/content/AuthContentSelect";
import { cn } from "@/lib/utils";

const authTypeList: Array<{
  id: TAuthType;
  label: string;
}> = [
  {
    id: "no-auth",
    label: "No auth",
  },
  {
    id: "basic-auth",
    label: "Basic auth",
  },
  {
    id: "bearer-token",
    label: "Bearer token",
  },
  {
    id: "jwt-bearer",
    label: "JWT bearer",
  },
  {
    id: "api-key",
    label: "API key",
  },
];

const inheritTypeAuth: {
  id: TAuthType;
  label: string;
} = {
  id: "inherit-parent",
  label: "Inherit auth from parent",
};

interface Props {
  id: string;
  className?: string;
}

const AuthTypeTab = memo(({ id, className = "" }: Props) => {
  const dispatch = useAppDispatch();
  const authType = useAppSelector(selectAuthTypeById(id));

  const list = useMemo(
    () =>
      id === DEFAULT_AUTHORIZATION_ID
        ? authTypeList
        : [inheritTypeAuth, ...authTypeList],
    [id]
  );

  const handleChange = useCallback(
    (type: string) => {
      dispatch(
        updateAuthorization({
          requestOrFolderId: id,
          payload: {
            type: type as TAuthType,
          },
        })
      );
    },
    [dispatch, id]
  );

  return (
    <AuthContentSelect
      items={list}
      value={authType ?? list[0].id}
      defaultValue={list[0].id}
      onChange={handleChange}
      placeholder="Select auth"
      className={cn("w-fit flex-0", className)}
    />
  );
});

export default AuthTypeTab;
