"use client";

import { useState } from "react";
import ApplicationForm from "./ApplicationForm";
import ApplicationCard from "./ApplicationCard";

export default function ApplicationsClient({
  initialApplications,
}) {
  const [applications, setApplications] = useState(
    initialApplications
  );
    const [editingApplication, setEditingApplication] = useState(null);


  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.company
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      application.position
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleApplicationCreated = (newApplication) => {
    setApplications((prev) => [
      newApplication,
      ...prev,
    ]);

    setShowForm(false);
  };

   const handleApplicationUpdated = (updatedApplication) => {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === updatedApplication.id
          ? updatedApplication
          : application
      )
    );

    setEditingApplication(null);
  };
  const handleApplicationDeleted = (deletedId) => {
    setApplications((prev) =>
      prev.filter((app) => app.id !== deletedId)
    );
  };
  const handleEdit = (application) => {
    setEditingApplication(application);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              My Applications
            </h1>

            <p className="mt-2 text-gray-500">
              Track and manage your job applications.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-teal-600 cursor-pointer px-5 py-3 text-white"
          >
             Add Application
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search by company or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg bg-slate-600 px-4 py-3 focus:outline-none"
          />
<div className="flex items-center justify-center rounded-lg bg-teal-600 pe-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg bg-teal-600 px-4 py-2 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
          </div>
        </div>

        {/* Applications */}
        {filteredApplications.length === 0 ? (
          <div className="rounded-lg bg-slate-900 p-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold">
              No applications found
            </h2>

            <p className="mt-2 text-gray-500">
              Start tracking your job applications.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onDeleted={handleApplicationDeleted}
                 onEdit={handleEdit}
              />
            ))}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <ApplicationForm
            onClose={() => setShowForm(false)}
            onCreated={handleApplicationCreated}
          />
        )}
           {editingApplication && (
          <ApplicationForm
            application={editingApplication}
            onClose={() => setEditingApplication(null)}
            onUpdated={handleApplicationUpdated}
          />
        )}
      </div>
    </div>
  );
}