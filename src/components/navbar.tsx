"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, PenTool, Home, User } from "lucide-react";
import { useAccountStore } from "@/lib/store/accountStore";
import axios from "axios";

export function Navbar() {
  const account = useAccountStore((state) => state.account);
  const setAccount = useAccountStore((state) => state.setAccount);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const keeplogin = async () => {
    try {
      if (localStorage.getItem("id")) {
        const result = await axios.get(
          "https://trimbalance-us.backendless.app/api/data/accounts",
          {
            params: {
              where: `objectId='${localStorage.getItem("id")}'`,
            },
          }
        );
        console.log(result.data[0]);

        setAccount(result.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    keeplogin();
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold text-slate-900 hover:text-slate-700 transition-colors"
          >
            <PenTool className="h-6 w-6" />
            <span>BlogPlatform</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/create"
              className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <PenTool className="h-4 w-4" />
              <span>Write</span>
            </Link>
            <Link
              href="/blogs"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          {account?.email ? (
            <p>Hello, {account.email}</p>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                asChild
                className="text-slate-600 hover:text-slate-900"
              >
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/create"
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <PenTool className="h-4 w-4" />
                <span>Write</span>
              </Link>
              <Link
                href="/blogs"
                className="text-slate-600 hover:text-slate-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/about"
                className="text-slate-600 hover:text-slate-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-slate-200">
                <Button variant="ghost" asChild className="justify-start">
                  <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="justify-start">
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
