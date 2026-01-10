import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import LocalPasswordInput from "@/components/app/local-password/micro/LocalPasswordInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "motion/react";
import { StatusAlert } from "@/components/ui/status-alert";
import SplashScreenBg from "@/components/splash/SplashScreenBg";
import { APP_NAME } from "@/constant";

const dragableStyle = {
  appRegion: "drag",
} as CSSProperties;

const unDragableStyle = {
  appRegion: "no-drag",
} as CSSProperties;

const Splash = () => {
  const [password, setPassword] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => passwordRef.current?.focus(), []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (isSuccess !== null) setIsSuccess(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response =
      await window.electronAPILocalPassword.matchLocalPassword(password);
    setIsSuccess(response);

    if (response)
      setTimeout(() => {
        window.electronAPILocalPassword.setLocalPasswordValid();
      }, 500);
    else if (passwordRef.current) passwordRef.current.focus();
  };

  const isButtonEnabled = password && !isSuccess;

  return (
    <div
      className="w-full h-screen aspect-square bg-background backdrop-blur-3xl flex justify-center items-center overflow-hidden relative rounded-lg border border-border/20 p-3"
      style={dragableStyle}
    >
      <SplashScreenBg>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-75 flex flex-col gap-5 justify-center items-center text-center"
        >
          <div className="flex flex-col gap-2 items-center pb-3">
            <motion.h1
              className="text-3xl font-black text-primary tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {APP_NAME}
            </motion.h1>
            <Separator className="bg-primary max-w-12 pb-1" />
          </div>
          <span />
          <h1 className="text-xl font-bold pb-3">Enter your local password</h1>
          <LocalPasswordInput
            placeholder="Enter your password"
            className="text-sm text-center"
            style={{
              ...unDragableStyle,
            }}
            value={password}
            onChange={handleChange}
            ref={passwordRef}
          />
          <Button
            className="w-full"
            disabled={!isButtonEnabled}
            style={{
              ...(isButtonEnabled ? unDragableStyle : {}),
            }}
          >
            Login
          </Button>
          <AnimatePresence>
            {isSuccess !== null && (
              <motion.span
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <StatusAlert
                  size="xs"
                  variant={"soft"}
                  status={isSuccess ? "success" : "error"}
                  title={isSuccess ? "Successfull" : "Wrong credential"}
                  className="w-full text-start"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </form>
      </SplashScreenBg>
    </div>
  );
};

export default Splash;
