import DottedSeparator from "@/components/dotted-separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

const UserButton = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/sign-in");
  }

  const avaFallback = data.user.user_metadata.first_name
    ? data.user.user_metadata.first_name.charAt(0).toUpperCase()
    : data.user.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 rounded-full  border border-neutral-300 transition cursor-pointer">
          <AvatarFallback className="bg-neutral-200 text-neutral-500 h-full w-full flex items-center justify-center">
            {avaFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] rounded-full  border border-neutral-300 transition cursor-pointer">
            <AvatarFallback className="bg-neutral-200 text-neutral-500 h-full w-full flex items-center justify-center">
              {avaFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-100">
                {data.user.user_metadata.first_name+" "+data.user.user_metadata.last_name || "User"}
            </p>
            <p className="text-xs text-neutral-400">
                {data.user.email}
            </p>
          </div>
        </div>
        <DottedSeparator className="mb-1"/>
        <DropdownMenuItem className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer">
            <LogOut className="size-4 mr-2"/>
            Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
