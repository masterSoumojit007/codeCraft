"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import React, { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleOff,
  Cloud,
  Github,
  Laptop,
  Moon,
  Palette,
  Sun,
} from "lucide-react";
import useMounted from "@/hooks/useMounted";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "github-dark": <Github className="size-4" />,
  monokai: <Laptop className="size-4" />,
  "solarized-dark": <Cloud className="size-4" />,
};

function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-48 group relative flex items-center gap-3 px-4 py-3 bg-[#1e1e2e]/90 hover:bg-[#2d2d3a] rounded-lg transition-all duration-300 ease-out border border-gray-800/50 hover:border-gray-700"
      >
        {/* hover state bg decorator */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

        <Palette className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />

        <span className="text-sm text-gray-300 min-w-[90px] text-left group-hover:text-white transition-colors font-semibold">
          {currentTheme?.label}
        </span>

        {/* color indicator */}
        <div
          className="relative w-4 h-4 rounded-full border-2 border-gray-600 group-hover:border-gray-500 transition-all"
          style={{ background: currentTheme?.color }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 mt-3 w-full min-w-[250px] bg-[#1e1e2e]/95 
            backdrop-blur-xl rounded-xl border border-[#313244] shadow-xl py-3 z-50"
          >
            <div className="px-3 pb-2 mb-3 border-b border-gray-800/50">
              <p className="text-xs font-semibold text-gray-400">Select Theme</p>
            </div>

            {THEMES.map((t, index) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative group w-full flex items-center gap-4 px-4 py-3 hover:bg-[#2d2d3a] transition-all duration-300 ease-out
                ${theme === t.id ? "bg-blue-500/20 text-blue-400" : "text-gray-300"}`}
                onClick={() => setTheme(t.id)}
              >
                {/* bg gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 
                  group-hover:opacity-100 transition-opacity"
                />

                {/* icon */}
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-lg
                  ${theme === t.id ? "bg-blue-500/20 text-blue-400" : "bg-gray-800/50 text-gray-400"}
                  group-hover:scale-110 transition-all duration-200`}
                >
                  {THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
                </div>

                {/* label */}
                <span className="flex-1 text-sm text-left group-hover:text-white transition-colors">
                  {t.label}
                </span>

                {/* color indicator */}
                <div
                  className="relative size-4 rounded-full border-2 border-gray-600 
                group-hover:border-gray-500 transition-colors"
                  style={{ background: t.color }}
                />

                {/* active theme border */}
                {theme === t.id && (
                  <motion.div
                    className="absolute inset-0 border-2 border-blue-500/40 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeSelector;
