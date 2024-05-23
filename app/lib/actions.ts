"use server";

import prisma from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
import { format } from "util";

  export async function createUser(formData: FormData) {

    const newUser = {
      email: formData.get("email") as string,
      name: formData.get("name") as string
    }

    return await prisma.$executeRaw`INSERT INTO "User" ("email", "name") VALUES (${newUser.email}, ${newUser.name});`
    //return await prisma.user.create({ data: newUser } );
  }