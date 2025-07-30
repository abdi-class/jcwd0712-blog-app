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
import { Formik, Form, FormikProps } from "formik";
import { ISignInValue, SignInSchema } from "./SignInSchema";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAccountStore } from "@/lib/store/accountStore";

export default function SignInPage() {
  const router = useRouter();
  const { setAccount } = useAccountStore();
  const onSignin = async (values: ISignInValue) => {
    try {
      const result = await axios.get(
        "https://trimbalance-us.backendless.app/api/data/accounts",
        {
          params: {
            where: `email='${values.email}' AND password='${values.password}'`,
          },
        }
      );
      console.log(result.data);
      setAccount(result.data[0]);
      alert(`Welcome to ${result.data[0].email}`);
      router.replace("/todo");
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
                Welcome back
              </CardTitle>
              <CardDescription className="text-slate-600">
                Sign in to your account to continue writing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={SignInSchema}
                onSubmit={onSignin}
              >
                {(props: FormikProps<ISignInValue>) => {
                  const { errors, values, handleChange } = props;
                  console.log(errors);

                  return (
                    <Form>
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
                          required
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
                          placeholder="Enter your password"
                          className="h-11 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-11 text-base font-medium"
                      >
                        Sign In
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
              <div className="text-center">
                <p className="text-sm text-slate-600">
                  {"Don't have an account? "}
                  <Link
                    href="/signup"
                    className="font-medium text-slate-900 hover:text-slate-700 underline underline-offset-4 transition-colors"
                  >
                    Sign Up
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
