"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value, error: null })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setUser((prev) => ({ ...prev, loading: true, error: null }))

    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
      options: {
    emailRedirectTo: `${window.location.origin}/dashboard`,
  },
    })

    if (error) {
      setUser((prev) => ({ ...prev, loading: false, error: error.message }))
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="bg-slate-900/50 min-h-screen p-4">
     <Link href="/" className="flex items-center justify-start gap-2 text-white p-4">
        <ChevronLeft className="font-bold text-xl" />
        <span className="text-xl">
          Go to Home
        </span>
      </Link>
    <div className="flex items-center justify-center py-8">
     
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-lg border p-6 shadow-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Log In</h1>

        {user.error && (
          <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
            {user.error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={user.email}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={user.password}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={user.loading}
          className="bg-teal-700 text-white p-2 rounded hover:bg-teal-800 disabled:opacity-50"
        >
          {user.loading ? "Logging in..." : "Log In"}
        </button>

        <p className="text-sm text-center mt-2">
          Don't have an account?{" "}
          <Link href="/signup" className="text-teal-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
    </div>
  )
}