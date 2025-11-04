import { useEffect, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Activity, Code, Database } from "lucide-react";

const dragableStyle = {
  appRegion: "drag",
} as CSSProperties;

const apiMethods = ["GET", "POST", "PUT", "DELETE"];
const methodColors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

const Splash = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentMethod, setCurrentMethod] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsReady(true), 300);
          return 100;
        }
        return prev + 2.5;
      });
    }, 80);

    const methodInterval = setInterval(() => {
      setCurrentMethod((prev) => (prev + 1) % apiMethods.length);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(methodInterval);
    };
  }, []);

  return (
    <div
      className="w-full h-full aspect-square bg-primary backdrop-blur-3xl flex flex-col justify-center items-center overflow-hidden relative rounded-lg border border-border/20 p-3"
      style={dragableStyle}
    >
      {/* Subtle Light Effects */}
      <motion.div
        className="absolute top-6 right-6 w-1 h-1 bg-primary-foreground/40 rounded-full"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute top-10 right-10 w-0.5 h-0.5 bg-primary-foreground/30 rounded-full"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-1 h-1 bg-primary-foreground/20 rounded-full"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Logo Section */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-primary-foreground/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-border shadow-lg">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Zap className="w-5 h-5 text-primary-foreground" />
              </motion.div>
            </div>

            {/* Subtle glow */}
            <motion.div
              className="absolute -inset-0.5 bg-primary-foreground/5 rounded-lg blur-sm"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          <motion.h1
            className="text-xl font-semibold text-primary-foreground tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ApiBolt
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-xs font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Powerful API Testing Tool
          </motion.p>
        </motion.div>

        {/* Feature Icons */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[Activity, Code, Database].map((Icon, index) => (
            <motion.div
              key={index}
              className="w-7 h-7 bg-primary-foreground/8 backdrop-blur-sm rounded-md flex items-center justify-center border border-border"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
            >
              <Icon className="w-3.5 h-3.5 text-muted-foreground" />
            </motion.div>
          ))}
        </motion.div>

        {/* API Method Display */}
        <motion.div
          className="bg-muted/50 backdrop-blur-sm rounded-md px-3 py-1.5 border border-border min-w-20 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentMethod}
              className="px-2 py-0.5 rounded text-xs font-semibold text-white"
              style={{ backgroundColor: methodColors[currentMethod] }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {apiMethods[currentMethod]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Loading Progress */}
        <motion.div
          className="w-40 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-muted-foreground text-xs font-medium">
              Loading
            </span>
            <span className="text-muted-foreground text-xs font-medium">
              {loadingProgress}%
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-1 overflow-hidden border border-border">
            <motion.div
              className="h-full bg-primary-foreground/80 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>

        {/* Ready State */}
        <AnimatePresence>
          {isReady && (
            <motion.div
              className="text-primary-foreground/90 font-medium text-xs flex items-center gap-1.5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
              />
              Ready
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Professional corner accents */}
      <div className="absolute top-0 right-0 w-8 h-8">
        <div className="absolute top-3 right-3 w-1 h-1 bg-primary-foreground/20 rounded-full" />
        <div className="absolute top-5 right-5 w-0.5 h-0.5 bg-primary-foreground/15 rounded-full" />
      </div>

      <div className="absolute bottom-0 left-0 w-6 h-6">
        <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-primary-foreground/15 rounded-full" />
      </div>
    </div>
  );
};

export default Splash;
