import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";
import type { TAuthType } from "@/types";

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

const AuthTypeTab = () => {
  const { authType, handleChangeAuthType } = useRequestResponse();
  return (
    <Select
      value={authType ?? authTypeList[0].id}
      onValueChange={handleChangeAuthType}
    >
      <SelectTrigger className="w-full capitalize">
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
