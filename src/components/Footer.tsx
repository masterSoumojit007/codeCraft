import { Blocks, Twitter, Github, Mail, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#0a0a0f] to-[#1a1a2e] border-t border-gray-800/50 mt-auto relative">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-12 text-gray-300">
        {/* Logo & Tagline */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 animate__animated animate__fadeIn animate__delay-1s">
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-white/10 hover:ring-white/30 transition-all">
              <Blocks className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 bg-clip-text text-transparent animate__animated animate__fadeIn animate__delay-2s">
              CodeCraft
            </h1>
          </div>
          <p className="text-gray-400 text-center md:text-right max-w-lg leading-relaxed animate__animated animate__fadeIn animate__delay-3s">
            Learn. Build. Grow.
          </p>
        </div>

        {/* Footer Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div className="animate__animated animate__fadeIn animate__delay-1s">
            <h3 className="text-2xl font-bold text-white mb-4">About</h3>
            <p className="leading-relaxed">
              Building tools, tutorials, and resources for developers.
            </p>
          </div>

          {/* Explore */}
          <div className="animate__animated animate__fadeIn animate__delay-2s">
            <h3 className="text-2xl font-bold text-white mb-4">Explore</h3>
            <ul className="space-y-3">
              {["Snippets", "Blog", "Docs", "Pricing"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="group text-lg relative hover:text-white transition-all animate__animated animate__fadeIn animate__delay-3s"
                  >
                    {item}
                    <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div className="animate__animated animate__fadeIn animate__delay-4s">
            <h3 className="text-2xl font-bold text-white mb-4">Connect</h3>
            <ul className="space-y-3">
              {[
                { name: "support@codecraft.dev", icon: Mail },
                {
                  name: "@codecraft",
                  link: "https://twitter.com/codecraft",
                  icon: Twitter,
                },
                {
                  name: "GitHub",
                  link: "https://github.com/codecraft",
                  icon: Github,
                },
                {
                  name: "LinkedIn",
                  link: "https://linkedin.com/company/codecraft",
                  icon: Linkedin,
                },
              ].map(({ name, link, icon: Icon }) => (
                <li
                  key={name}
                  className="flex items-center gap-3 animate__animated animate__fadeIn animate__delay-5s"
                >
                  <Icon className="w-6 h-6 text-blue-400 transition-transform transform hover:scale-110" />
                  <Link href={link || "#"} className="hover:text-white">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="animate__animated animate__fadeIn animate__delay-6s">
            <h3 className="text-2xl font-bold text-white mb-4">Subscribe</h3>
            <p className="leading-relaxed mb-4">Get tips & updates.</p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2 text-white font-medium rounded-r-md hover:opacity-90 transition-all animate__animated animate__fadeIn animate__delay-7s"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800/50 animate__animated animate__fadeIn animate__delay-8s">
          © {new Date().getFullYear()}{" "}
          <span className="font-bold text-gray-300">CodeCraft</span>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
