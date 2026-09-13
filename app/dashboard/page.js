import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Dashboard applications error:", error);
  }

  const allApplications = applications || [];

  const totalApplications = allApplications.length;

  const appliedCount = allApplications.filter(
    (application) => application.status === "Applied"
  ).length;

  const interviewCount = allApplications.filter(
    (application) => application.status === "Interview"
  ).length;

  const rejectedCount = allApplications.filter(
    (application) => application.status === "Rejected"
  ).length;

  const offerCount = allApplications.filter(
    (application) => application.status === "Offer"
  ).length;

  const interviewRate =
    totalApplications > 0
      ? Math.round((interviewCount / totalApplications) * 100)
      : 0;

  const recentApplications = allApplications.slice(0, 3);

  const statusStyles = {
    Applied: "bg-blue-100 text-blue-700",
    Interview: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
    Offer: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen p-6 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">
              Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Welcome back, {user.email}
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/dashboard/applications"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              View Applications
            </Link>

            <Link
              href="/dashboard/applications"
              className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
            >
              Add Application
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard
            title="Total Applications"
            value={totalApplications}
            description="All tracked applications"
          />

          <StatCard
            title="Applied"
            value={appliedCount}
            description="Waiting for response"
          />

          <StatCard
            title="Interviews"
            value={interviewCount}
            description="Interview opportunities"
          />

          <StatCard
            title="Offers"
            value={offerCount}
            description="Successful offers"
          />

          <StatCard
            title="Rejected"
            value={rejectedCount}
            description="Unsuccessful applications"
          />
        </div>

        {/* Progress Section */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Interview Conversion */}
          <div className="rounded-xl bg-slate-900 p-6 shadow-sm lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-200">
              Application Progress
            </h2>

            <p className="mt-2 text-sm text-gray-100">
              Your interview conversion rate
            </p>

            <div className="mt-6 flex items-center justify-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border-[16px] border-teal-600">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-200">
                    {interviewRate}%
                  </p>

                  <p className="text-xs text-gray-200">
                    Interview Rate
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <ProgressRow
                label="Applications"
                value={totalApplications}
              />

              <ProgressRow
                label="Interviews"
                value={interviewCount}
              />

              <ProgressRow
                label="Offers"
                value={offerCount}
              />
            </div>
          </div>

          {/* Recent Applications */}
          <div className="rounded-xl bg-slate-900 p-6 shadow-sm lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-100">
                  Recent Applications
                </h2>

                <p className="mt-1 text-sm text-gray-200">
                  Your latest job application activity
                </p>
              </div>

              <Link
                href="/dashboard/applications"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                View all
              </Link>
            </div>

            {recentApplications.length === 0 ? (
              <div className="rounded-lg bg-gray-50 p-8 text-center">
                <p className="text-gray-500">
                  You have not added any applications yet.
                </p>

                <Link
                  href="/applications"
                  className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                  Add your first application
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div
                    key={application.id}
                    className="flex flex-col justify-between gap-3 rounded-lg border border-gray-100 p-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-100">
                        {application.company}
                      </h3>

                      <p className="text-sm text-gray-100">
                        {application.position}
                      </p>

                      <p className="mt-1 text-xs text-gray-200">
                        Applied on {application.applied_date}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                        statusStyles[application.status] ||
                        "bg-gray-700 text-gray-200"
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="mt-8 rounded-xl bg-teal-700 p-6 text-white">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-semibold">
                Keep building your career
              </h2>

              <p className="mt-2 text-sm text-gray-300">
                Track every application and monitor your progress toward your
                next opportunity.
              </p>
            </div>

            <Link
              href="/dashboard/applications"
              className="w-fit rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-600"
            >
              Manage Applications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, description }) {
  return (
    <div className="rounded-xl bg-teal-700 p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-100">{title}</p>

      <p className="mt-3 text-3xl font-bold text-gray-100">
        {value}
      </p>

      <p className="mt-2 text-xs text-gray-200">{description}</p>
    </div>
  );
}

function ProgressRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-200">{label}</span>
      <span className="font-semibold text-gray-100">{value}</span>
    </div>
  );
}