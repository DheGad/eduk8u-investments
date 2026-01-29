'use client';

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequence from "@/components/ui/BootSequence";
import IntelligenceToggle from "@/components/launchpad/IntelligenceToggle";
import FutureEngine from "@/components/engines/FutureEngine";
import WealthEngine from "@/components/engines/WealthEngine";
import GeminiChat from "@/components/ui/GeminiChat";

export default function DualIntelligenceOS() {
  const [isBooting, setIsBooting] = useState(true);
  const [mode, setMode] = useState<'future' | 'wealth'>('future'); // Default to Future (Education first)

  // Prevent scrolling during boot
  useEffect(() => {
    if (isBooting) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isBooting]);

  return (
    <main className="min-h-screen relative flex flex-col pt-24 bg-navy-900 transition-colors duration-1000 ease-in-out overflow-x-hidden">
      <AnimatePresence>
        {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      {/* Intelligence Switcher */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8 z-20 pointer-events-auto flex justify-center w-full"
      >
        <IntelligenceToggle mode={mode} setMode={setMode} />
      </motion.div>

      {/* Engine Container */}
      <div className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          {mode === 'future' ? (
            <motion.div key="future" className="w-full" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <FutureEngine />
            </motion.div>
          ) : (
            <motion.div key="wealth" className="w-full" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <WealthEngine />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20"
          animate={{
            background: mode === 'future' ? 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)' : 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'
          }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20"
          animate={{
            background: mode === 'future' ? 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)' : 'radial-gradient(circle, #f97316 0%, transparent 70%)'
          }}
          transition={{ duration: 1.5 }}
        />
      </div>
      <GeminiChat />
    </main >
  );
}
