import { memo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TriangleAlert as AlertIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip-custom";
import { Button } from "@/components/ui/button";

interface ErrorAlertProps {
  isError: boolean;
  message: string;
}

const ErrorAlert1 = memo(({ isError, message }: ErrorAlertProps) => {
  return (
    <AnimatePresence>
      {isError && (
        <motion.div
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.5,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "anticipate",
          }}
          className="absolute bottom-2 right-2 origin-center"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructiveSecondary"
                size={"iconXs"}
                className="rounded-full"
              >
                <AlertIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              className="w-52 p-2 bg-accent [&>span>svg]:bg-accent [&>span>svg]:fill-accent text-accent-foreground"
              side="top"
              align="end"
              alignOffset={5}
              variant={"secondary"}
            >
              <p>{message}</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default ErrorAlert1;
