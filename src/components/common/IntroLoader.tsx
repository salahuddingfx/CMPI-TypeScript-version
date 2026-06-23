import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroLoaderProps {
  onComplete?: () => void;
  apiLoading?: boolean;
}

const statusMessages = [
  "Initializing institutional portal...",
  "Establishing secure API connection...",
  "Synchronizing notices & department records...",
  "Preparing user experience...",
];

export function IntroLoader({ onComplete, apiLoading = false }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  // Update progress bar and status text smoothly over 2.2 seconds (2200ms)
  useEffect(() => {
    const duration = 2200; // total intro animation time
    const intervalTime = 20; // update frequency
    const steps = duration / intervalTime;
    const progressStep = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressStep;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    // Cycle through status messages
    const messageInterval = setInterval(() => {
      setStatusIndex((prev) => (prev < statusMessages.length - 1 ? prev + 1 : prev));
    }, duration / statusMessages.length);

    return () => {
      clearInterval(timer);
      clearInterval(messageInterval);
    };
  }, []);

  // Check when both minimum duration (progress === 100) AND API fetching are done
  useEffect(() => {
    if (progress === 100 && !apiLoading) {
      const finishTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 300); // short grace period for fadeout
      return () => clearTimeout(finishTimer);
    }
  }, [progress, apiLoading, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
      }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background select-none overflow-hidden"
    >
      {/* Background visual accents - Sleek drifting radial glow filters */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Glow Top Left */}
        <motion.div 
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl" 
        />
        {/* Glow Bottom Right */}
        <motion.div 
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-secondary/10 dark:bg-secondary/5 blur-3xl" 
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-md w-full">
        {/* Logo Container with glowing outer circles */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* External Pulse Ring 1 */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-44 h-44 rounded-full border border-primary/20 dark:border-primary/10"
          />
          {/* External Pulse Ring 2 */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ 
              scale: [1.1, 1.25, 1.1],
              opacity: [0.08, 0.2, 0.08]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute w-44 h-44 rounded-full border border-secondary/20 dark:border-secondary/10"
          />

          {/* Premium Logo Glassmorphic Base */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative flex items-center justify-center w-32 h-32 md:w-36 md:h-36 rounded-full bg-card/40 border border-border/80 shadow-2xl backdrop-blur-md"
          >
            <img 
              src="/CMPI.png" 
              alt="Cox's Bazar Model Polytechnic Institute" 
              className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_10px_rgba(255,255,255,0.05)]"
              onError={(e) => {
                // Fail-safe if image isn't available
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </motion.div>
        </div>

        {/* Institution Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-1.5 mb-8"
        >
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-primary to-primary-dark dark:from-primary dark:to-accent bg-clip-text text-transparent">
            CMPI
          </h2>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Cox's Bazar Model Polytechnic Institute
          </p>
        </motion.div>

        {/* Progress Section */}
        <div className="w-full space-y-3.5">
          {/* Progress Bar Container */}
          <div className="h-1.5 w-full bg-muted border border-border/30 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status Message Carousel */}
          <div className="h-5 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={statusIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-xs text-muted-foreground font-medium select-none"
              >
                {statusMessages[statusIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
