import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoImg from "../assets/logo.ico";

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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            // Changed from span to div, kept your beautiful glass container styling
            className="flex h-20 w-20 items-center justify-center rounded-full glass border border-white/10 shadow-lg p-2 overflow-hidden"
          >
            {/* 2. Render your logo inside an image tag with a circular mask */}
            <img 
              src={logoImg} 
              alt="Logo" 
              className="w-full h-full object-cover rounded-full"
            />
        </motion.div>
       </motion.div> 
      )}
    </AnimatePresence>
  );
}