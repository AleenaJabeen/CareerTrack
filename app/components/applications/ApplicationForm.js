"use client";

import { Cross, CrossIcon } from "lucide-react";
import { useState } from "react";

export default function ApplicationForm({
  onClose,
  onCreated,
    onUpdated,
    application
}) {
    const isEditMode = Boolean(application);
 const [formData, setFormData] = useState({
    company: application?.company || "",
    position: application?.position || "",
    location: application?.location || "",
    job_url: application?.job_url || "",
    status: application?.status || "Applied",
    applied_date:
      application?.applied_date ||
      new Date().toISOString().split("T")[0],
    notes: application?.notes || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

     const url = isEditMode
        ? `/api/applications/${application.id}`
        : "/api/applications";

      const method = isEditMode ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

    const result = await response.json();

    if (!response.ok) {
      setError(result.message || "Failed to create application");
      setLoading(false);
      return;
    }

     if (isEditMode) {
        onUpdated(result.application);
      } else {
        onCreated(result.application);
      }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs p-4">
      <div className="max-h-[70vh] w-full max-w-lg overflow-y-auto rounded-xl bg-slate-900 border-4 shadow-xl border-teal-600 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {isEditMode ? "Edit Application" : "Add Application"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            <Cross/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="company"
            placeholder="Company name"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />

          <input
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <input
            name="job_url"
            type="url"
            placeholder="Job URL"
            value={formData.job_url}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>

          <input
            name="applied_date"
            type="date"
            value={formData.applied_date}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border p-3"
          />

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-black px-4 py-2 text-white"
            >
              {loading
                ? "Saving..."
                : isEditMode
                ? "Update Application"
                : "Save Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}