import { useState, useCallback } from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { ButtonLikeDiv } from "@/components/ui/button-like-div";
import { Button } from "@/components/ui/button";
import { OctagonX as ErrorIcon, Terminal, XCircle, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ErrorBoundary = () => {
  const error = useRouteError();
  const [showStack, setShowStack] = useState<boolean>(false);

  let errorMessage = "An unknown error has occurred within the application.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error))
    errorMessage = error.data?.message || error.statusText || errorMessage;
  else if (error instanceof Error) {
    errorMessage = error.message;
    stack = error.stack;
  } else if (typeof error === "string") errorMessage = error;

  const handleQuit = useCallback(() => {
    if (window.electronAPI?.windowClose) window.electronAPI.windowClose();
    else window.close();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-background p-6 select-none relative overflow-hidden">
      {/* Subtle background glow for premium feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-destructive/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-125 flex flex-col gap-5 z-10">
        <section className="w-full flex flex-col gap-6 p-8 border-2 border-dashed rounded-2xl bg-muted/5 border-border/40 backdrop-blur-sm transition-all hover:border-destructive/20 hover:bg-destructive/1">
          <div className="flex items-start gap-5">
            <ButtonLikeDiv
              variant={"destructiveSecondary"}
              size={"icon"}
              className="rounded-2xl [&_svg]:size-7 shrink-0 shadow-lg shadow-destructive/5"
            >
              <ErrorIcon strokeWidth={2.5} />
            </ButtonLikeDiv>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-black text-foreground tracking-tight uppercase italic">
                System Failure Detected
              </h1>
              <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">
                ApiBolt encountered a critical exception. For your system&apos;s
                stability, please
                <span className="text-foreground font-bold underline decoration-destructive/40 underline-offset-4 mx-1">
                  close and restart
                </span>{" "}
                the application.
              </p>
            </div>
          </div>

          <div className="p-5 bg-muted/20 rounded-xl border border-border/50 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-3">
              <XCircle size={15} className="text-destructive/60" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/80">
                Crash Report
              </span>
            </div>
            <p className="text-[11px] text-foreground/70 font-mono break-all leading-relaxed pl-1 italic">
              {errorMessage}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            {stack && (
              <button
                type="button"
                onClick={() => setShowStack(!showStack)}
                className="text-[10px] font-black text-muted-foreground/50 hover:text-primary flex items-center gap-2 transition-all uppercase tracking-[0.2em] group"
              >
                <Terminal
                  size={14}
                  className="group-hover:scale-110 transition-transform"
                />
                {showStack ? "Collapse Logs" : "Trace Stack"}
              </button>
            )}

            <Button
              onClick={handleQuit}
              variant="destructiveSecondary"
              size="sm"
              className="h-10 rounded-xl px-5 font-bold text-[11px] uppercase tracking-widest gap-2 shadow-md shadow-destructive/5"
            >
              <LogOut size={16} />
              Quit App
            </Button>
          </div>
        </section>

        <AnimatePresence>
          {showStack && stack && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
                y: -10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
                y: -10,
              }}
              transition={{
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="w-full"
            >
              <div className="p-6 bg-zinc-950/95 rounded-4xl border border-white/5 font-mono text-[9px] text-zinc-600 leading-[1.8] overflow-auto max-h-62.5 scrollbar-none shadow-2xl selection:bg-primary/20 backdrop-blur-2xl">
                <pre className="whitespace-pre-wrap select-text selection:text-zinc-200">
                  {stack}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ErrorBoundary;
