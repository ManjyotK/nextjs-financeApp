"use server";

import prisma from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { format } from "util";

  export async function createUser(formData: FormData) {

    const newUser = {
      email: formData.get("email") as string,
      name: formData.get("name") as string
    }

    await prisma.$executeRaw`INSERT INTO "User" ("email", "name") VALUES (${newUser.email}, ${newUser.name});`
    revalidatePath('/users');
    redirect('/users');
    //return await prisma.user.create({ data: newUser } );
  }