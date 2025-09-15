import { memo, useCallback, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { updateAuthorization } from "@/context/redux/request-response/thunks/auth";
import { cn } from "@/lib/utils";
import type { TAuthType } from "@/types/authorization.types";
import { DEFAULT_AUTHORIZATION_ID } from "@/constant/authorization.constant";
import { selectAuthTypeById } from "@/context/redux/request-response/selectors/auth";

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
    <Select
      value={authType ?? list[0].id}
      defaultValue={list[0].id}
      onValueChange={handleChange}
    >
      <SelectTrigger className={cn("capitalize", className)} size="sm">
        <SelectValue placeholder="Select auth" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {list.map(({ id, label }) => (
            <SelectItem key={id} value={id} className="capitalize">
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default AuthTypeTab;
