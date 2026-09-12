import LogoutButton from "../components/LogoutButton";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Job Tracker Dashboard
      </h1>

      <p className="mt-4 text-gray-600">
        Welcome to your dashboard.
      </p>
      <LogoutButton/>
    </div>
  );
}