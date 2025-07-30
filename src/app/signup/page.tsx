"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useRef } from "react";
import axios from "axios";

export default function SignUpPage() {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputConfirmPasswordRef = useRef<HTMLInputElement>(null);

  const onSignup = async () => {
    try {
      const result = await axios.post(
        "https://trimbalance-us.backendless.app/api/data/accounts",
        {
          email: inputEmailRef.current?.value,
          password: inputPasswordRef.current?.value,
        }
      );

      alert("Signup success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-semibold">
                Create your account
              </CardTitle>
              <CardDescription className="text-slate-600">
                Join our community of writers and start sharing your stories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    ref={inputEmailRef}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className="h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    ref={inputPasswordRef}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm password"
                    className="h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    ref={inputConfirmPasswordRef}
                  />
                </div>
                <Button
                  type="button"
                  className="w-full h-11 text-base font-medium"
                  onClick={onSignup}
                >
                  Sign Up
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-slate-600">
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="font-medium text-slate-900 hover:text-slate-700 underline underline-offset-4 transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
