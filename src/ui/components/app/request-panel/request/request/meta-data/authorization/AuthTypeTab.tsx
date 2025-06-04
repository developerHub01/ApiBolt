import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { handleChangeAuthType } from "@/context/redux/request-response/request-response-slice";
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
  const dispatch = useAppDispatch();
  const authType = useAppSelector(
    (state) => state.requestResponse.authType[state.tabSidebar.selectedTab!]
  );

  return (
    <Select
      value={authType ?? authTypeList[0].id}
      onValueChange={(type: TAuthType) =>
        dispatch(
          handleChangeAuthType({
            type,
          })
        )
      }
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
