import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import UserButton from "@/features/auth/components/user-button";

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/sign-in");
  }

  return (
    <>
      <p>Hello {data.user.email}</p>
      <UserButton/>
    </>
  );
}
