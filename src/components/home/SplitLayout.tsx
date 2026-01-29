'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState, ReactNode } from 'react';

interface SplitLayoutProps {
    leftContent: ReactNode;
    rightContent: ReactNode;
}

export default function SplitLayout({ leftContent, rightContent }: SplitLayoutProps) {
    const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden bg-background relative font-sans text-foreground">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-navy-900 via-navy-800 to-transparent opacity-50" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-navy-800 via-navy-700 to-transparent opacity-50" />
            </div>

            <SplitSection
                side="left"
                hoveredSide={hoveredSide}
                setHoveredSide={setHoveredSide}
                className="border-r border-white/5"
            >
                {leftContent}
            </SplitSection>

            <SplitSection
                side="right"
                hoveredSide={hoveredSide}
                setHoveredSide={setHoveredSide}
            >
                {rightContent}
            </SplitSection>

            {/* Center Divider Line (Optional visual anchor) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent transform -translate-x-1/2 pointer-events-none z-10" />
        </div>
    );
}

interface SplitSectionProps {
    side: 'left' | 'right';
    hoveredSide: 'left' | 'right' | null;
    setHoveredSide: (side: 'left' | 'right' | null) => void;
    children: ReactNode;
    className?: string;
}

function SplitSection({ side, hoveredSide, setHoveredSide, children, className }: SplitSectionProps) {
    const isHovered = hoveredSide === side;
    const isOtherHovered = hoveredSide && hoveredSide !== side;

    return (
        <motion.div
            className={cn(
                "relative flex flex-col justify-center items-center px-4 py-8 lg:p-12 transition-colors duration-500 ease-in-out overflow-hidden",
                className
            )}
            onMouseEnter={() => setHoveredSide(side)}
            onMouseLeave={() => setHoveredSide(null)}
            initial={{ flex: 1 }}
            animate={{
                flex: isHovered ? 1.4 : (isOtherHovered ? 0.8 : 1),
                filter: isOtherHovered ? 'blur(1px) brightness(0.7)' : 'blur(0px) brightness(1)',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
            {/* Inner Content Container */}
            <motion.div
                className="w-full max-w-xl mx-auto h-full flex flex-col"
                animate={{ opacity: isOtherHovered ? 0.5 : 1 }}
            >
                {children}
            </motion.div>

            {/* Dynamic Background Gradient */}
            <div className={cn(
                "absolute inset-0 pointer-events-none transition-opacity duration-700",
                isHovered ? "opacity-30" : "opacity-0"
            )}>
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-t",
                    side === 'left' ? "from-accent-blue/10" : "from-accent-orange/10"
                )} />
            </div>
        </motion.div>
    );
}
