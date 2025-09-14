import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectAuthType } from "@/context/redux/request-response/request-response-selector";
import { updateAuthorization } from "@/context/redux/request-response/thunks/auth";
import useAuthContextType from "@/hooks/authorization/use-auth-context-type";
import { cn } from "@/lib/utils";
import type { TAuthType } from "@/types/request-response.types";

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
  className?: string;
}

const AuthTypeTab = ({ className = "" }: Props) => {
  const dispatch = useAppDispatch();
  const authType = useAppSelector(selectAuthType);

  const authContextType = useAuthContextType();

  const list = useMemo(() => {
    if (authContextType === "global") return authTypeList;

    return [inheritTypeAuth, ...authTypeList];
  }, [authContextType]);

  return (
    <Select
      value={authType ?? list[0].id}
      defaultValue={list[0].id}
      onValueChange={(type: TAuthType) =>
        dispatch(
          updateAuthorization({
            payload: {
              type,
            },
          })
        )
      }
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
};

export default AuthTypeTab;
