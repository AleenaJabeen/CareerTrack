import Link from "next/link"


export default async function Home() {
  

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600 text-white font-mono text-sm">
              CT
            </span>
            <span>CareerTrack</span>
          </Link>

          <nav className="flex items-center gap-4">
           
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium hover:text-teal-400 transition-colors px-3 py-2"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition-all shadow-md shadow-teal-900/20"
                >
                  Get Started
                </Link>
              </div>
           
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full max-w-5xl mx-auto px-6 pt-24 pb-16 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800/50 text-teal-300 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Smart Job Application Management
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-50 max-w-3xl leading-tight">
            Track your job search and boost your career response rate.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
            Keep every application, interview stage, and follow-up organized in one unified platform. Say goodbye to messy spreadsheets.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
           
              <>
                <Link
                  href="/signup"
                  className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-teal-900/30 text-center"
                >
                  Start Tracking for Free
                </Link>
                <Link
                  href="/login"
                  className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold px-8 py-3.5 rounded-xl transition-all text-center"
                >
                  Sign In to Account
                </Link>
              </>
           
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="w-full max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-950 border border-teal-800/60 flex items-center justify-center text-teal-400 font-bold">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-100">Application Pipeline</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Organize positions by stage: Applied, Interview Scheduled, Offer Extended, or Archived.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-950 border border-teal-800/60 flex items-center justify-center text-teal-400 font-bold">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-100">Analytics & Insights</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Monitor your response rates, interview success metrics, and application volume over time.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-950 border border-teal-800/60 flex items-center justify-center text-teal-400 font-bold">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-100">Follow-Up Reminders</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Never miss an interview follow-up or recruiter email with automated status updates.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-sm gap-4">
          <p>© {new Date().getFullYear()} CareerTrack. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-slate-300 transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="hover:text-slate-300 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}