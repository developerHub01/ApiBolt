import { memo, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateAuthorization } from "@/context/redux/request-response/thunks/auth";
import type { TAuthType } from "@/types/authorization.types";
import {
  AUTH_LIST,
  DEFAULT_AUTHORIZATION_ID,
  INHERIT_AUTH,
} from "@/constant/authorization.constant";
import { selectAuthTypeById } from "@/context/redux/request-response/selectors/auth";
import AuthContentSelect from "@/components/app/authorization/content/AuthContentSelect";
import { cn } from "@/lib/utils";

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
        ? AUTH_LIST
        : [INHERIT_AUTH, ...AUTH_LIST],
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
