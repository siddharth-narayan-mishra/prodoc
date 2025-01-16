import DottedSeparator from "@/components/dotted-separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import VerifyEmailButton from "./VerifyEmailButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function VerifyEmailCard() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  console.log(data)

  if (!data.user?.email) {
    redirect("/sign-in");
  }
  return (
    <Card className="w-full h-fit md:w-[480px] border-none shadow-none mx-auto">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text-3xl p-4">Verify Your Email</CardTitle>
        <CardDescription>
          Please check your email and click the verification link to activate
          your account.
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="px-7 py-7 text-center">
        <p>
          If you don&apos;t see the email, please check your spam or junk
          folder.
        </p>
        <VerifyEmailButton email={data.user?.email} />
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>Already verified your email?&nbsp;</p>
        <Link href={"/sign-in"}>
          <span className="text-blue-600 underline">Sign In</span>
        </Link>
      </CardContent>
    </Card>
  );
}
