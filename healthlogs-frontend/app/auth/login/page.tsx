import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileHeart, Lock, User } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <FileHeart className="h-8 w-8 text-[#7457D3]" />
            <span className="text-2xl font-bold text-gray-800">HealthLogs</span>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your account details to access your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accountId">Account ID</Label>
                  <div className="relative">
                    <Input id="accountId" placeholder="Enter your account ID" type="text" required />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input id="password" placeholder="Enter your password" type="password" required />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full bg-[#7457D3] hover:bg-[#5E45A8] text-white">
              Log In
            </Button>
            <div className="mt-4 text-sm text-center">
              <Link href="/forgot-password" className="text-[#7457D3] hover:underline">
                Forgot password?
              </Link>
            </div>
          </CardFooter>
        </Card>
        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#7457D3] hover:underline">
            Contact your administrator
          </Link>
        </div>
      </div>
    </div>
  )
}