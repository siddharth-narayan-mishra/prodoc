"use server";

import { revalidatePath } from "next/cache";
import { loginSchema, registerSchema } from "@/features/auth/schema";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

function splitFullName(fullName: string) {
  const nameParts = fullName.trim().split(" ");
  if (nameParts.length === 1) {
    return {
      firstName: nameParts[0],
      lastName: "",
    };
  }

  const firstName = nameParts.slice(0, -1).join(" ");
  const lastName = nameParts[nameParts.length - 1];

  return {
    firstName: firstName,
    lastName: lastName,
  };
}

export async function login(formData: z.infer<typeof loginSchema>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    console.log(error);
  } else {
    revalidatePath("/", "layout");
  }
}

export async function signup(formData: z.infer<typeof registerSchema>) {
  const supabase = await createClient();
  const { firstName, lastName } = splitFullName(formData.name);

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    console.log(error);
  } else {
    revalidatePath("/", "layout");
  }
}

export async function logOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if(error){
    console.log(error)
  }
}

export async function getSupabaseUser(){
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data
}