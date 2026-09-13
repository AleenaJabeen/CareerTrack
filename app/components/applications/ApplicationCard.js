"use client";

import { useState } from "react";
import { Building2, MapPin, CalendarDays, Pencil, Trash2, Loader2, StickyNote, Briefcase } from "lucide-react";

export default function ApplicationCard({ application, onEdit, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    setDeleting(true);

    try {
      const response = await fetch(`/api/applications/${application.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to delete application");
        setDeleting(false);
        return;
      }

      onDeleted(application.id);
    } catch {
      alert("An unexpected error occurred.");
      setDeleting(false);
    }
  };

  const statusStyles = {
    Applied: "bg-amber-900/40 text-amber-300 border border-amber-800/50",
    Interview: "bg-amber-400 text-teal-950 font-semibold",
    Rejected: "bg-slate-700/50 text-slate-400 border border-slate-700",
    Offer: "bg-emerald-500/10 text-emerald-300 border border-emerald-800",
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-teal-950 p-6 text-slate-300 shadow-xl shadow-slate-950/20 transition hover:border-teal-700/50 hover:shadow-2xl hover:shadow-teal-950/30">
      <div>
        {/* HEADER: Company, Status, and Position */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-teal-800 bg-teal-900 text-amber-400">
              <Building2 className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-xl font-bold tracking-tight text-white">
                {application.company}
              </h2>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
                <Briefcase className="size-4 shrink-0 text-slate-400" />
                <span className="truncate">{application.position}</span>
              </div>
            </div>
          </div>

          <span
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              statusStyles[application.status] || "bg-slate-700 text-slate-300"
            }`}
          >
            {application.status === "Offer" && (
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-300"></span>
            )}
            {application.status}
          </span>
        </div>

        {/* BODY: Details (Location/Date) */}
        <div className="space-y-2 border-t border-slate-800 pt-4 text-sm text-slate-400">
          {application.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-teal-600" />
              <span className="truncate">{application.location}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-teal-600" />
            <span>
              <span className="text-slate-500">Applied:</span> {application.applied_date}
            </span>
          </div>
        </div>

        {/* NOTES (Optional) */}
        {application.notes && (
          <div className="mt-4 rounded-lg border border-teal-900 bg-teal-900/30 p-3.5 text-sm text-slate-400">
            <div className="mb-1 flex items-center gap-2 text-teal-500">
              <StickyNote className="size-4 shrink-0" />
              <span className="font-medium">Notes</span>
            </div>
            <p className="line-clamp-3 leading-relaxed text-slate-300">
              {application.notes}
            </p>
          </div>
        )}
      </div>

      {/* ACTIONS: Edit & Delete pinned to bottom */}
      <div className="mt-6 flex gap-3 border-t border-slate-800 pt-4">
        <button
          onClick={() => onEdit(application)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 active:bg-slate-800"
        >
          <Pencil className="size-4" />
          Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center justify-center gap-2 rounded-xl border border-red-900/50 bg-teal-900/50 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-950 hover:text-red-200 active:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {deleting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Deleting
            </>
          ) : (
            <>
              <Trash2 className="size-4" />
              Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
}