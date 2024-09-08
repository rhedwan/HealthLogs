'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { baseUrl } from "@/lib/utils"
import { FileHeart, Lock, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [token, setToken] = useState('')
  
  // Handle login process
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const Url = baseUrl + '/users/login'
    
    try {
      const response = await fetch(Url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      const data = await response.json()
      
      if (response.ok) {
        // Assuming the token or other necessary login details are in the response data
        console.log("Login successful!", data)
        setToken(data.token)
        localStorage.setItem('token', data.token)
        window.location.href = '/dashboard'
        // Perform redirect or store login state
      } else {
        setError(data.message || 'Login failed. Please try again.')
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
            <CardDescription>
              Enter your account details to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
              </div>
              <CardFooter className="flex flex-col">
                <Button 
                  type="submit" 
                  className="w-full bg-[#7457D3] hover:bg-[#5E45A8] text-white mt-6"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </Button>
                <div className="mt-4 text-sm text-center">
                  <Link
                    href="/forgot-password"
                    className="text-[#7457D3] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-sm text-gray-600">
          {"Don't have an account?"}{" "}
          <Link href="/register" className="text-[#7457D3] hover:underline">
            Contact your administrator
          </Link>
        </div>
      </div>
    </div>
  );
}
