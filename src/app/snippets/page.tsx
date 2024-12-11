"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Code, Grid, Layers, Search, Tag, X } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton";
import SnippetCard from "./_components/SnippetCard";

function SnippetsPage() {
  const snippets = useQuery(api.snippets.getSnippets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  // loading state
  if (snippets === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-gray-900 to-[#0a0a0f]">
        <NavigationHeader />
        <SnippetsPageSkeleton />
      </div>
    );
  }

  const languages = [...new Set(snippets.map((s) => s.language))];
  const popularLanguages = languages.slice(0, 5);

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLanguage =
      !selectedLanguage || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-900 to-[#0a0a0f]">
      <NavigationHeader />

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-sm text-white mb-6"
          >
            <BookOpen className="w-4 h-4" />
            Community Code Library
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 bg-clip-text mb-6"
          >
            Discover & Share Code Snippets
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-gray-300 mb-8"
          >
            Explore a curated collection of code snippets from the community
          </motion.p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          className="relative max-w-5xl mx-auto mb-12 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Search */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search snippets by title, language, or author..."
                className="w-full pl-12 pr-4 py-4 bg-[#1e1e2e]/80 hover:bg-[#1e1e2e] text-white
                rounded-xl border border-[#313244] hover:border-[#414155] transition-all duration-200
                placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </motion.div>

          {/* Filters Bar */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Languages:</span>
            </motion.div>

            {popularLanguages.map((lang) => (
              <motion.button
                key={lang}
                onClick={() =>
                  setSelectedLanguage(lang === selectedLanguage ? null : lang)
                }
                className={`group relative px-3 py-1.5 rounded-lg transition-all duration-200
                    ${
                      selectedLanguage === lang
                        ? "text-blue-400 bg-blue-500/10 ring-2 ring-blue-500/50"
                        : "text-gray-400 hover:text-gray-300 bg-[#1e1e2e] hover:bg-[#262637] ring-1 ring-gray-800"
                    }`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={`/${lang}.png`}
                    alt={lang}
                    className="w-4 h-4 object-contain"
                  />
                  <span className="text-sm">{lang}</span>
                </div>
              </motion.button>
            ))}

            {selectedLanguage && (
              <motion.button
                onClick={() => setSelectedLanguage(null)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <X className="w-3 h-3" />
                Clear
              </motion.button>
            )}

            <motion.div
              className="ml-auto flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className="text-sm text-gray-500">
                {filteredSnippets.length} snippets found
              </span>

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800">
                <motion.button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-md transition-all ${
                    view === "grid"
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <Grid className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-md transition-all ${
                    view === "list"
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <Layers className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Snippets Grid */}
        <motion.div
          className={`grid gap-6 ${
            view === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 max-w-3xl mx-auto"
          }`}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSnippets.map((snippet) => (
              <motion.div
                key={snippet._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <SnippetCard snippet={snippet} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredSnippets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.7,
              type: "spring",
              stiffness: 150,
            }}
            className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-xl shadow-xl max-w-md mx-auto text-center text-gray-300"
          >
            <Code className="w-16 h-16 mb-6 text-blue-500 animate-bounce" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              No Snippets Found
            </h2>
            <p className="text-lg text-gray-400">
              Try searching with different terms or clearing filters to find
              something new.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SnippetsPage;
