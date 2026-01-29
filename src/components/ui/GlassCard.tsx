'use client';

import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'dark' | 'interactive';
}

export default function GlassCard({ children, className, variant = 'default', ...props }: GlassCardProps) {
    return (
        <motion.div
            className={cn(
                "rounded-2xl border backdrop-blur-md transition-all duration-300",
                variant === 'default' && "bg-white/5 border-white/10 hover:border-white/20",
                variant === 'dark' && "bg-navy-900/60 border-white/5 shadow-xl",
                variant === 'interactive' && "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 cursor-pointer active:scale-[0.98]",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            {...props}
        >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none" />

            <div className="relative z-10 h-full">
                {children}
            </div>
        </motion.div>
    );
}
