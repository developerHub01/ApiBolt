import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import LocalPasswordDetails from "@/components/app/local-password/LocalPasswordDetails";
import LocalPasswordInput from "@/components/app/local-password/LocalPasswordInput";
import { Save as SaveIcon, ArrowLeft as BackIcon } from "lucide-react";
import { useLocalPassword } from "@/context/local-password/LocalPasswordProvider";
import { useAppDispatch } from "@/context/redux/hooks";
import { updateLocalPassword } from "@/context/redux/local-password/thunks/local-password";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const inputFieldList = [
  {
    id: "password",
    name: "password",
    placeholder: "Enter password",
  },
  {
    id: "rePassword",
    name: "rePassword",
    placeholder: "Re-enter password",
  },
] as const;

type PasswordState = {
  password: string;
  rePassword: string;
};

const LocalPasswordChange = () => {
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const { handleChangeStage } = useLocalPassword();

  const [passwordState, setPasswordState] = useState<PasswordState>({
    password: "",
    rePassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await dispatch(
      updateLocalPassword(passwordState.password),
    ).unwrap();
    toast({
      type: response ? "success" : "error",
      title: response ? "Updated" : "Failed",
      description: response
        ? "Password updated successfully."
        : "Couldn't update password.",
    });
  };

  const isDisabled = useMemo(
    () =>
      !passwordState.password ||
      !passwordState.rePassword ||
      passwordState.password !== passwordState.rePassword,
    [passwordState],
  );

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4/5 flex flex-col gap-4"
      >
        <LocalPasswordDetails
          title="Set Local Password"
          description={[
            "Create a password to lock this app on your device. If you forget this password, it cannot be recovered.",
            "Make sure you remember this password before saving.",
          ]}
        />
        {inputFieldList.map(({ id, name, placeholder }) => (
          <LocalPasswordInput
            key={id}
            name={name}
            value={passwordState[name]}
            onChange={handleChange}
            placeholder={placeholder}
            type="password"
          />
        ))}
        <Button type="submit" disabled={isDisabled} className="justify-start">
          <SaveIcon />
          Save Password
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="justify-start"
          onClick={() => handleChangeStage("option")}
        >
          <BackIcon />
          Back
        </Button>
      </form>
    </div>
  );
};

export default LocalPasswordChange;
