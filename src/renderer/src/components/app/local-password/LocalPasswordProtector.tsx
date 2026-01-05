import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import LocalPasswordDetails from "@/components/app/local-password/LocalPasswordDetails";
import LocalPasswordInput from "@/components/app/local-password/LocalPasswordInput";
import { useAppDispatch } from "@/context/redux/hooks";
import { matchLocalPassword } from "@/context/redux/local-password/thunks/local-password";
import { useLocalPassword } from "@/context/local-password/LocalPasswordProvider";
import useCustomToast from "@/hooks/ui/use-custom-toast";

const LocalPasswordProtector = () => {
  const dispatch = useAppDispatch();
  const { handleChangeStage } = useLocalPassword();
  const toast = useCustomToast();
  const [passwordState, setPasswordState] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordState(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await dispatch(matchLocalPassword(passwordState)).unwrap();
    if (response) return handleChangeStage("option");

    toast({
      type: "error",
      title: "Wrong",
      description: "Password is wrong.",
    });
  };

  const isDisabled = !passwordState;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4/5 flex flex-col gap-4"
      >
        <LocalPasswordDetails
          title="Enter Local Password"
          description={[
            "Enter your current local password to continue. This is required to change or disable the local password on this device.",
          ]}
        />
        <LocalPasswordInput
          key={"password"}
          name={"password"}
          value={passwordState}
          onChange={handleChange}
          placeholder={"Enter password"}
          type="password"
        />
        <Button disabled={isDisabled} className="mt-3 justify-start">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LocalPasswordProtector;
