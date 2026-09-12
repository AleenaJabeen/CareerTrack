"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    error: null,
    message: null,
    loading: false,
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value, error: null })
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      setForm((prev) => ({ ...prev, error: "Passwords do not match" }))
      return
    }

    setForm((prev) => ({ ...prev, loading: true, error: null, message: null }))

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
    emailRedirectTo: `${window.location.origin}/dashboard`,
  },
    })

    if (error) {
      setForm((prev) => ({ ...prev, loading: false, error: error.message }))
      return
    }

    // If Supabase has email confirmation enabled
    if (data.user && data.session === null) {
      setForm((prev) => ({
        ...prev,
        loading: false,
        message: "Check your email for the confirmation link!",
      }))
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm rounded-lg border p-6 shadow-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        {form.error && (
          <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
            {form.error}
          </div>
        )}

        {form.message && (
          <div className="bg-green-100 text-green-700 p-2 rounded text-sm">
            {form.message}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
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
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="••••••••"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={form.confirmPassword}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={form.loading}
          className="bg-teal-700 text-white p-2 rounded hover:bg-teal-800 disabled:opacity-50"
        >
          {form.loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}