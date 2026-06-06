import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingReveal() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // 700ms display duration + 500ms fade transition
    const t = setTimeout(() => setDone(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          // Changed pointer-events-none to pointer-events-auto so users 
          // cannot click underlying links/buttons while the screen fades out
          className="pointer-events-auto fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex h-16 w-16 items-center justify-center rounded-full glass border border-white/10 text-xl font-bold text-primary glow-text"
          >
            KC
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}