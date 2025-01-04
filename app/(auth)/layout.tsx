"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  return (
    <main className="bg-neutral-800 min-h-screen">
      <div className="max-w-screen-2xl mx-auto p-4">
        <nav className="flex justify-between items-center">
          <Image alt="" src="/logo.svg" width={50} height={50} />
          <div className="flex items-center gap-2">
            <Link href={pathname === "/sign-up" ? "/sign-in" : "/sign-up"}>
              <Button variant={"secondary"}>
                {pathname === "/sign-up" ? "Log In" : "Sign Up"}
              </Button>
            </Link>
          </div>
        </nav>
        <div className="flex flex-col justify-center items-center pt-4 md:pt-16">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
