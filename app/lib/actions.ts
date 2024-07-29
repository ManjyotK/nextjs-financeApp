"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  revalidatePath('/categories');
  redirect('/categories');
}

export async function deleteCategory(id: number) {
  // await prisma.$executeRaw`DELETE FROM "Category" WHERE id = ${id};`
  await prisma.category.delete({ where: { id } });
  revalidatePath('/categories');
  redirect('/categories');
}

export async function updateCategory(id: number, formData: FormData) {
  const newCategory = {
    name: formData.get("category") as string,
  }
  await prisma.category.update({ where: { id }, data: newCategory });
  revalidatePath('/categories');
  redirect('/categories');
}

export async function createTransaction(formData: FormData) {

  const dateStr = (formData.get("date") as string).split("[")[0].trim();

  const newTransaction = {
    description: formData.get("description") as string,
    amount: Number(formData.get("amount")),
    date: new Date(Date.parse(dateStr)),
    categoryId: Number(formData.get("categoryId")),
    userId: 11,
  }
  
  await prisma.transaction.create({ data: newTransaction });
  revalidatePath('/transactions');
  redirect('/transactions');
}

export async function deleteTransaction(id: number) {
  // await prisma.$executeRaw`DELETE FROM "Transaction" WHERE id = ${id};`
  await prisma.transaction.delete({ where: { id } });
  revalidatePath('/transactions');
  redirect('/transactions');
}

export async function updateTransaction(id: number, formData: FormData) {

  const dateStr = (formData.get("date") as string).split("[")[0].trim();

  const newTransaction = {
    description: formData.get("description") as string,
    amount: Number(formData.get("amount")),
    date: new Date(Date.parse(dateStr)),
    categoryId: Number(formData.get("categoryId")),
    userId: 11,
  }
  await prisma.transaction.update({ where: { id }, data: newTransaction });
  revalidatePath('/transactions');
  redirect('/transactions');
}