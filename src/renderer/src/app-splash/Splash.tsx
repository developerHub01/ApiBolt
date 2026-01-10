import { useEffect, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Activity, Code, Database } from "lucide-react";
import SplashScreenBg from "@/components/splash/SplashScreenBg";
import { APP_NAME } from "@/constant";
import { SPLASH_MIN_DURATION } from "@shared/constant";

const dragableStyle = {
  appRegion: "drag",
} as CSSProperties;

const apiMethods = ["GET", "POST", "PUT", "DELETE"];
const methodColors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

const Splash = () => {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [currentMethod, setCurrentMethod] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const start = performance.now();

    const raf = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min((elapsed / SPLASH_MIN_DURATION) * 100, 100);

      setLoadingProgress(progress);

      if (progress < 100) requestAnimationFrame(raf);
      else {
        setTimeout(() => {
          setIsReady(true);
          setTimeout(async () => {
            await window.electronAPISplashWindow.splashWindowCompleteEnd();
          }, 300);
        }, 200);
      }
    };

    requestAnimationFrame(raf);
    const methodInterval = setInterval(() => {
      setCurrentMethod(prev => (prev + 1) % apiMethods.length);
    }, 800);

    return () => {
      clearInterval(methodInterval);
    };
  }, []);

  return (
    <div
      className="w-full h-full aspect-square bg-background backdrop-blur-3xl flex flex-col justify-center items-center overflow-hidden relative rounded-lg border border-border/20 p-3"
      style={dragableStyle}
    >
      <SplashScreenBg>
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          {/* Logo Section */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <motion.div
              className="relative"
              initial={{
                scale: 0.8,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <div className="w-10 h-10 bg-secondary backdrop-blur-sm rounded-lg flex items-center justify-center border border-border shadow-lg">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Zap className="w-5 h-5 text-primary" />
                </motion.div>
              </div>

              {/* Subtle glow */}
              <motion.div
                className="absolute -inset-0.5 bg-primary-foreground/5 rounded-lg blur-sm"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </motion.div>

            <motion.h1
              className="text-xl font-semibold text-primary tracking-wide"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
            >
              {APP_NAME}
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-xs font-medium"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
            >
              Powerful API Testing Tool
            </motion.p>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            className="flex gap-3"
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.5,
            }}
          >
            {[Activity, Code, Database].map((Icon, index) => (
              <motion.div
                key={index}
                className="w-7 h-7 bg-secondary/80 backdrop-blur-sm rounded-md flex items-center justify-center border border-border"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.7 + index * 0.1,
                }}
              >
                <Icon className="w-3.5 h-3.5 text-foreground" />
              </motion.div>
            ))}
          </motion.div>

          {/* API Method Display */}
          <motion.div
            className="bg-secondary/80 backdrop-blur-sm rounded-md px-3 py-1.5 border border-border min-w-20 flex justify-center"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 0.9,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentMethod}
                className="px-2 py-0.5 rounded text-xs font-semibold text-white"
                style={{
                  backgroundColor: methodColors[currentMethod],
                }}
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                {apiMethods[currentMethod]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Loading Progress */}
          <motion.div
            className="w-40 mt-1"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 1.1,
            }}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-secondary-foreground text-xs font-medium">
                Loading
              </span>
              <span className="text-secondary-foreground text-xs font-medium">
                {Math.min(Math.trunc(loadingProgress), 100)}%
              </span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-1 overflow-hidden border border-border">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${loadingProgress}%`,
                }}
                transition={{
                  duration: 0.1,
                }}
              />
            </div>
          </motion.div>

          {/* Ready State */}
          <AnimatePresence>
            {isReady && (
              <motion.div
                className="text-foreground font-medium text-xs flex items-center gap-1.5"
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                }}
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-green-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: 2,
                  }}
                />
                Ready
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SplashScreenBg>
    </div>
  );
};

export default Splash;
