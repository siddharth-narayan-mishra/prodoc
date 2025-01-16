"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function VerifyEmailButton({email}:{email:string|undefined}) {
  const supabase = createClient();
  const router = useRouter();

  const handleVerify = async () => {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email!,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_APP_URL! + "/private",
      },
    });

    if (error) {
      console.log(error);
      router.push("/error");
    }
  };

  return (
    <Button disabled className="mt-4" onClick={handleVerify}>
      Resend Email Verification
    </Button>
  );
}
