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
import { updateAuthorization } from "@/context/redux/request-response/request-response-thunk";
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

interface Props {
  className?: string;
}

const AuthTypeTab = ({ className = "" }: Props) => {
  const dispatch = useAppDispatch();
  const authType = useAppSelector(selectAuthType);

  return (
    <Select
      value={authType ?? authTypeList[0].id}
      onValueChange={(type: TAuthType) =>
        dispatch(
          updateAuthorization({
            type,
          })
        )
      }
    >
      <SelectTrigger className={cn("capitalize", className)} size="sm">
        <SelectValue placeholder="Select auth" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {authTypeList.map(({ id, label }) => (
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
