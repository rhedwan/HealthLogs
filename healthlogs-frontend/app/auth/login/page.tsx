"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import Link from "next/link";
import { State, login } from "@/app/actions/auth";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";

export default function LoginPage() {
  const initialState: State = { message: "", errors: {} };
  // @ts-ignore
  const [state, formAction] = useFormState(login, initialState);
  const { pending } = useFormStatus();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            className="inline-flex items-center space-x-2"
            src="/logo.png"
            width={180}
            height={90}
            alt="Logo"
          />
        </div>

        {/* New component for default credentials */}
        <Card className="mb-6 relative">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">Default Credentials:</p>
            <p>
              <strong>Email:</strong> hello@rhedwan.com
            </p>
            <p>
              <strong>Password:</strong> password1234
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-bl-lg rounded-tr-md">
            Demo
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your account details to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      name="email"
                      required
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                  {state?.errors?.email && <p>{state.errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      name="password"
                      required
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                  {state?.errors?.password && (
                    <div>
                      <p>Password must:</p>
                      <ul>
                        {state.errors.password.map((error) => (
                          <li key={error}>- {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-[#7457D3] hover:bg-[#5E45A8] text-white mt-6 disabled:bg-purple-400 disabled:cursor-not-allowed"
                >
                  {pending ? "Logging in" : "Log In"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="text-[#7457D3]">
            {"Don't have an account? Contact your administrator"}
          </p>
        </div>
      </div>
    </div>
  );
}
