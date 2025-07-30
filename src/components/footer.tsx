import Link from "next/link";
import { PenTool, Twitter, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold hover:text-slate-300 transition-colors"
            >
              <PenTool className="h-6 w-6" />
              <span>BlogPlatform</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              A modern blogging platform designed for writers who value
              simplicity and beautiful content presentation.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Platform</h3>
            <div className="space-y-2">
              <Link
                href="/create"
                className="block text-slate-400 hover:text-white transition-colors text-sm"
              >
                Write a Blog
              </Link>
              <Link
                href="/blogs"
                className="block text-slate-400 hover:text-white transition-colors text-sm"
              >
                Explore Blogs
              </Link>
              <Link
                href="/trending"
                className="block text-slate-400 hover:text-white transition-colors text-sm"
              >
                Trending
              </Link>
              <Link
                href="/categories"
                className="block text-slate-400 hover:text-white transition-colors text-sm"
              >
                Categories
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Company</h3>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-slate-400 hover:text-white transition-colors text-sm"
              >
                About Us
              </Link>
              <Link
                href="/careers"
                className="block text-slate-400 hover:text-white transition-colors text-sm"
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className="block text-slate-400 hover:text-white transition-colors text-sm"
              >
                Contact
              </Link>
              <Link
                href="/press"
                className="block text-slate-400 hover:text-white transition-colors text-sm"
              >
                Press
              </Link>
            </div>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Support</h3>
            <div className="space-y-2">
              <Link
                href="/help"
                className="block text-slate-400 hover:text-white transition-colors text-sm"
              >
                Help Center
              </Link>
              <Link
                href="/privacy"
                className="block text-slate-400 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-slate-400 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/guidelines"
                className="block text-slate-400 hover:text-white transition-colors text-sm"
              >
                Community Guidelines
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2024 BlogPlatform. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/sitemap"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Sitemap
              </Link>
              <Link
                href="/rss"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                RSS Feed
              </Link>
              <Link
                href="/api"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                API
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
