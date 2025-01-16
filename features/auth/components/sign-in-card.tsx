"use client";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { loginSchema } from "../schema";
import { useLogin } from "../api/useLogin";
import { useRouter } from "next/navigation";

export const SignInCard = () => {
  const { mutate } = useLogin();
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    try {
      mutate({ json: values });
      router.push("/private");
    } catch (e) {
      console.log(e);
      router.push("/error");
    }
  };

  return (
    <Card className="w-full h-full md:w-[480px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text-2xl p-4">Log In to Your Account</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="px-7 py-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="w-full" size={"lg"}>
              Log In
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="px-7 py-7 flex flex-col gap-4">
        <Button
          variant={"secondary"}
          disabled={false}
          size={"lg"}
          className="w-full"
        >
          <Image alt="" src="/google.svg" width={20} height={20} />
          Login with Google{" "}
        </Button>
        <Button
          variant={"secondary"}
          disabled={false}
          size={"lg"}
          className="w-full"
        >
          <Image alt="" src="/github.svg" width={20} height={20} />
          Login with GitHub
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>Don&apos;t have an account?&nbsp;</p>
        <Link href={"/sign-up"}>
          <span className="text-blue-600 underline">Sign Up</span>
        </Link>
      </CardContent>
    </Card>
  );
};
