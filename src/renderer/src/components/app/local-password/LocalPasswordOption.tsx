import { Fragment } from "react";
import {
  Lock as LockIcon,
  ShieldOff as DisableIcon,
  ArrowLeft as BackIcon,
  LucideIcon,
} from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LocalPasswordDetails from "@renderer/components/app/local-password/micro/LocalPasswordDetails";
import { useLocalPassword } from "@/context/local-password/LocalPasswordProvider";
import { useAppDispatch } from "@/context/redux/hooks";
import { handleChangeIsLocalPasswordOpen } from "@/context/redux/local-password/local-password-slice";
import LocalPasswordScreenWrapper from "@renderer/components/app/local-password/micro/LocalPasswordScreenWrapper";

interface CTAInterface {
  id: "change" | "disable" | "back";
  label: string;
  Icon: LucideIcon;
  variant: VariantProps<typeof Button>["variant"];
  separator?: boolean;
}

const CTAButtons: Array<CTAInterface> = [
  {
    id: "change",
    label: "Change Password",
    Icon: LockIcon,
    variant: "default",
  },
  {
    id: "disable",
    label: "Disable Password",
    Icon: DisableIcon,
    variant: "destructiveSecondary",
  },
  {
    id: "back",
    label: "Close",
    Icon: BackIcon,
    variant: "secondary",
    separator: true,
  },
] as const;

const LocalPasswordOption = () => {
  const dispatch = useAppDispatch();
  const { handleChangeStage, handleChangeDisableRequest } = useLocalPassword();

  const handleClick = (type: CTAInterface["id"]) => {
    switch (type) {
      case "change":
        return handleChangeStage("change");
      case "disable":
        return handleChangeDisableRequest(true);
      case "back":
        return dispatch(handleChangeIsLocalPasswordOpen(false));
    }
  };

  return (
    <LocalPasswordScreenWrapper>
      <div className="w-full max-w-4/5 flex flex-col gap-4">
        <LocalPasswordDetails
          title="Protect your app locally"
          description={`Set a local password to secure this app and all stored data on your device. This password is never transmitted to any server and cannot be recovered if lost.`}
        />
        {CTAButtons.map(({ id, Icon, label, variant, separator }) => (
          <Fragment key={id}>
            {separator && <Separator />}
            <Button
              id={id}
              variant={variant}
              className="w-full justify-start"
              onClick={() => handleClick(id)}
            >
              <Icon /> {label}
            </Button>
          </Fragment>
        ))}
      </div>
    </LocalPasswordScreenWrapper>
  );
};

export default LocalPasswordOption;
