'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GeminiChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
        { role: 'ai', text: 'Hello. I am the Eduk8u Intelligence Core. How can I assist with your wealth or career simulations today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking
        setTimeout(() => {
            const aiResponse = generateResponse(userMsg);
            setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    const generateResponse = (msg: string): string => {
        const m = msg.toLowerCase();
        if (m.includes('invest') || m.includes('wealth')) return "Our Wealth Engine projects a 72-85% confidence interval for long-term diversified portfolios in Labuan. Would you like to run a stress test?";
        if (m.includes('career') || m.includes('student') || m.includes('study')) return "The Student Gateway analyzes outcomes across 8 major economies. Data Science and Healthcare pathways currently show the highest global mobility scores. Shall we simulate a path?";
        if (m.includes('risk') || m.includes('safe')) return "We utilize a dual-core architectural risk model. Your portfolio is stress-tested against historical crises (2008, 2020) to ensure resilience.";
        if (m.includes('hello') || m.includes('hi')) return "Greetings. I am ready to process your financial or academic simulation queries.";
        return "I am processing that query against our Labuan database. Please proceed with a simulation in the main dashboard for precise modeling.";
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-110 group"
                    >
                        <Sparkles className="w-6 h-6 animate-pulse group-hover:rotate-12 transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-navy-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-blue-600/20 to-teal-500/20">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-blue-400" />
                                <span className="font-bold text-white text-sm">Gemini Intelligence</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                        msg.role === 'user' ? "bg-white/10" : "bg-gradient-to-br from-blue-500 to-teal-500"
                                    )}>
                                        {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm leading-relaxed",
                                        msg.role === 'user' ? "bg-white/10 text-white rounded-tr-none" : "bg-blue-600/20 border border-blue-500/30 text-blue-100 rounded-tl-none"
                                    )}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3 max-w-[85%] mr-auto">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shrink-0">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="p-3 rounded-2xl bg-blue-600/20 border border-blue-500/30 rounded-tl-none flex gap-1 items-center h-10">
                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-100" />
                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-black/20">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask Eduk8u AI..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-white/20"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-400 disabled:opacity-50 disabled:hover:bg-blue-500 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
