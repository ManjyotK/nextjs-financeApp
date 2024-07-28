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

export async function createCategory(formData: FormData) {
  const newCategory = {
    name: formData.get("category") as string,
  }
  // await prisma.$executeRaw`INSERT INTO "Category" ("category") VALUES (${newCategory.category});`
  await prisma.category.create({ data: newCategory });
  revalidatePath('/manage');
  redirect('/manage');
}

export async function deleteCategory(id: number) {
  // await prisma.$executeRaw`DELETE FROM "Category" WHERE id = ${id};`
  await prisma.category.delete({ where: { id } });
  revalidatePath('/manage');
  redirect('/manage');
}

export async function createTransaction(formData: FormData) {
  const newTransaction = {
    description: formData.get("description") as string,
    amount: Number(formData.get("amount")),
    date: new Date(),
    categoryId: Number(formData.get("categoryId")),
    userId: 11,
  }
  await prisma.transaction.create({ data: newTransaction });
  revalidatePath('/transactions');
  redirect('/transactions');
}