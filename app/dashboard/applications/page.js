import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ApplicationsClient from "@/app/components/applications/ApplicationClient";

export default async function ApplicationsPage() {
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
    console.error(error);
  }

  return (
    <ApplicationsClient
      initialApplications={applications || []}
    />
  );
}