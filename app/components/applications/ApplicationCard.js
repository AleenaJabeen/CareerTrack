"use client";

import { useState } from "react";
// Assumes you have Lucide icons installed: npm i lucide-react
import { Building2,  MapPin, CalendarDays, Pencil, Trash2, Loader2, StickyNote, BriefcaseConveyorBeltIcon } from "lucide-react";

export default function ApplicationCard({
  application,
   onEdit,
  onDeleted,
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    // Basic confirmation remains, but the UI is now improved.
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    setDeleting(true);

    const response = await fetch(
      `/api/applications/${application.id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Failed to delete application");
      setDeleting(false);
      return;
    }

    onDeleted(application.id);
  };

  // Modern status badges using amber and teal tones
  const statusStyles = {
    Applied: "bg-amber-900/40 text-amber-300 border border-amber-800/50",
    Interview: "bg-amber-400 text-teal-950 font-semibold",
    Rejected: "bg-slate-700/50 text-slate-400 border border-slate-700",
    Offer: "bg-emerald-500/10 text-emerald-300 border border-emerald-800",
  };

  return (
    // CARD BASE: Deep teal, subtle border, shadow
    <div className="rounded-2xl border border-slate-800 bg-teal-950 p-6 text-slate-300 shadow-xl shadow-slate-950/20 transition hover:border-teal-700/50 hover:shadow-2xl hover:shadow-teal-950/30">
      
      {/* HEADER: Company, Role, Status */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-teal-900 border border-teal-800 text-amber-400">
               <Building2 className="size-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {application.company}
              </h2>
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <BriefcaseConveyorBeltIcon className="size-3.5" />
                <span>{application.position}</span>
              </div>
            </div>
          </div>
        </div>

        <span
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium ${
            statusStyles[application.status] ||
            "bg-slate-700 text-slate-300"
          }`}
        >
          {application.status === 'Offer' && <span className="size-1.5 rounded-full bg-emerald-300 animate-pulse"></span>}
          {application.status}
        </span>
      </div>

      {/* BODY: Details (Location/Date) */}
      <div className="space-y-3 border-t border-slate-800 pt-5 text-sm text-slate-400">
        {application.location && (
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-teal-600" />
            <span>{application.location}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-teal-600" />
          <span>
            <span className="text-slate-500">Applied:</span> {application.applied_date}
          </span>
        </div>
      </div>

      {/* NOTES (Optional) */}
      {application.notes && (
        <div className="mt-5 rounded-lg bg-teal-900/30 border border-teal-900 p-4 text-sm text-slate-400">
          <div className="flex items-center gap-2 mb-2 text-teal-600">
            <StickyNote className="size-4" />
            <span className="font-medium text-teal-500">Notes</span>
          </div>
          <p className="leading-relaxed">
            {application.notes}
          </p>
        </div>
      )}

      {/* ACTIONS: Edit & Delete */}
      <div className="mt-6 flex gap-3 border-t border-slate-800 pt-5">
        <button
         onClick={() => onEdit(application)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 active:bg-slate-800"
        >
          <Pencil className="size-4" />
          Edit 
        </button>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center justify-center gap-2 rounded-xl bg-teal-900/50 px-5 py-2.5 text-sm font-semibold text-red-300 border border-red-900/50 transition hover:bg-red-950 hover:text-red-200 active:bg-red-900 disabled:opacity-60 disabled:cursor-not-allowed"
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