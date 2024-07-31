"use server";

import prisma from "@/lib/db/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

/**
 * Creates a new user in the database.
 * @param formData - The data from the form containing the user's email and name.
 * @returns A Promise that resolves when the user is created.
 */
export async function createUser(formData: FormData) {

  // Extract email and name from the form data
  const newUser = {
    email: formData.get("email") as string,
    name: formData.get("name") as string
  }

  // Insert the new user into the database using raw SQL query
  await prisma.$executeRaw`INSERT INTO "User" ("email", "name") VALUES (${newUser.email}, ${newUser.name});`

  // Revalidate  and redirect the path for the '/users' page
  revalidatePath('/users');
  redirect('/users');

  // Alternative way to create the user using Prisma's ORM
  //return await prisma.user.create({ data: newUser } );
}

/**
 * Creates a new category in the database.
 * @param formData - The data from the form containing the category's name.
 * @returns A Promise that resolves when the category is created.
 */
export async function createCategory(formData: FormData) {
  // Extract the category name from the form data
  const newCategory = {
    name: formData.get("category") as string,
  }

  // Insert the new category into the database using Prisma's ORM
  await prisma.category.create({ data: newCategory });

  // Revalidate and redirect the path for the '/categories' page
  revalidatePath('/categories');
  redirect('/categories');
}

/**
 * Deletes a category from the database.
 *
 * @param id - The ID of the category to be deleted.
 * @returns A Promise that resolves when the category is deleted.
 */
export async function deleteCategory(id: number): Promise<"OK" | "Not_Empty" | "Unknown_Error"> {
  try {
    // Delete the category from the database using Prisma's ORM
    const res = await prisma.category.delete({ where: { id } });

    //  Revalidate and redirect the path for the '/categories' page
    revalidatePath('/categories');
    redirect('/categories');
  } 
  catch (error: any) {
    if(isRedirectError(error)){
      throw error // Explicitly rethrow the catch block's redirect error
    }
    else if (error instanceof PrismaClientKnownRequestError && error.code === "P2003") {
      return "Not_Empty";
    } 
    else {
      // Handle other errors (e.g., database connection issues)
      return "Unknown_Error";
    }
  }
}


/**
 * Updates a category in the database.
 *
 * @param id - The ID of the category to be updated.
 * @param formData - The data from the form containing the category's name.
 * @returns A Promise that resolves when the category is updated.
 */
export async function updateCategory(id: number, formData: FormData) {
  // Extract the category name from the form data
  const newCategory = {
    name: formData.get("category") as string, // Get the category name from the form data
  }

  // Update the category in the database using Prisma's ORM
  await prisma.category.update({
    where: { id }, // Specify which category to update
    data: newCategory, // Specify the new category data
  });

  // Revalidate and redirect the path for the '/categories' page
  revalidatePath('/categories');
  redirect('/categories');
}

/**
 * Creates a new transaction in the database.
 *
 * @param formData - The data from the form containing the transaction's description, amount, date, and category ID.
 * @returns A Promise that resolves when the transaction is created.
 */
export async function createTransaction(formData: FormData) {
  // Extract the date details from the form data
  const dateStr = (formData.get("date") as string).split("[")[0].trim();

  const newTransaction = {
    description: formData.get("description") as string, // Get the transaction description from the form data
    amount: Number(formData.get("amount")), // Get the transaction amount from the form data
    date: new Date(Date.parse(dateStr)), // Parse the transaction date from the form data
    categoryId: Number(formData.get("categoryId")), // Get the transaction category ID from the form data
    userId: 11, // Assign a fixed user ID for now
  }

  // Create the transaction in the database using Prisma's ORM
  await prisma.transaction.create({ data: newTransaction });

  // Revalidate and redirect the path for the '/transactions' page
  revalidatePath('/transactions');
  redirect('/transactions');
}

/**
 * Deletes a transaction from the database.
 *
 * @param id - The ID of the transaction to be deleted.
 * @returns A Promise that resolves when the transaction is deleted.
 */
export async function deleteTransaction(id: number) {
  // Delete the transaction from the database using Prisma's ORM
  await prisma.transaction.delete({ where: { id } });

  // Revalidate and redirect the path for the '/transactions' page
  revalidatePath('/transactions');
  redirect('/transactions');
}

/**
 * Updates a transaction in the database.
 *
 * @param id - The ID of the transaction to be updated.
 * @param formData - The data from the form containing the updated transaction's description, amount, date, and category ID.
 * @returns A Promise that resolves when the transaction is updated.
 */
export async function updateTransaction(id: number, formData: FormData) {
  // Extract the date details from the form data
  const dateStr = (formData.get("date") as string).split("[")[0].trim();

  // Create an object with the updated transaction data
  const newTransaction = {
    description: formData.get("description") as string, // Get the updated transaction description from the form data
    amount: Number(formData.get("amount")), // Get the updated transaction amount from the form data
    date: new Date(Date.parse(dateStr)), // Parse the updated transaction date from the form data
    categoryId: Number(formData.get("categoryId")), // Get the updated transaction category ID from the form data
    userId: 11, // Assign a fixed user ID for now
  }

  // Update the transaction in the database using Prisma's ORM
  await prisma.transaction.update({ where: { id }, data: newTransaction });

  // Revalidate and redirect the path for the '/transactions' page
  revalidatePath('/transactions');
  redirect('/transactions');
}