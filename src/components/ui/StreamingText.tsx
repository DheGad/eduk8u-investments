'use client';

import { useState, useEffect } from 'react';

interface StreamingTextProps {
    text: string;
    speed?: number;
    className?: string;
    onComplete?: () => void;
}

export default function StreamingText({ text, speed = 30, className, onComplete }: StreamingTextProps) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        setDisplayedText(''); // Reset on text change

        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, onComplete]);

    return (
        <span className={className}>
            {displayedText}
            <span className="animate-pulse">|</span>
        </span>
    );
}
