import { CategorySum, TransactionFormat } from "./definitions";
import prisma from "@/lib/db/prisma";
import { User, Transaction, Category } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";


/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<User[]>} An array of User objects.
 */
export async function getUsers(): Promise<User[]> {
  // Query the database to retrieve all users using the Prisma ORM.
  // The result is an array of User objects.

  // const result: User[] = await prisma.$queryRaw`SELECT * FROM "User"`;
  const result: User[] = await prisma.user.findMany();
  
  return result;
}


/**
 * Retrieves all transactions from the database.
 *
 * @returns {Promise<Transaction[]>} An array of Transaction objects.
 */
export async function getTransactions(): Promise<Transaction[]> {
  // Query the database to retrieve all transactions using the Prisma ORM.
  // The result is an array of Transaction objects.

  const result: Transaction[] = await prisma.transaction.findMany();

  return result;
}

/**
 * Retrieves all categories from the database.
 *
 * @returns {Promise<Category[]>} An array of Category objects.
 */
export async function getCategories(): Promise<Category[]> {
  // Query the database to retrieve all categories using the Prisma ORM.
  // The result is an array of Category objects.

  const result: Category[] = await prisma.category.findMany();

  // Return the result of the query.
  return result;
}


/**
 * Retrieves all transactions from the database and formats them into an array of TransactionFormat objects.
 *
 * @returns {Promise<TransactionFormat[]>} An array of TransactionFormat objects.
 */
export async function getTransactionsJSON(): Promise<TransactionFormat[]> {
  // Query the database to retrieve all transactions using the Prisma ORM.
  // The result is an array of Transaction objects.

  // Include the category information for each transaction.
  const result = await prisma.transaction.findMany({
    include: {
      category: {
        select: {
          name: true, // Only include the name field of the category.
        }
      }
    },
  });

  // Map each transaction to a TransactionFormat object.
  // Convert the amount and date fields to the appropriate data types.
  const formattedTransactions: TransactionFormat[] = result.map((transaction) => {
    return {
      ...transaction, // Spread all the properties of the transaction object.
      amount: transaction.amount.toNumber(), // Convert the amount field to a number.
      date: transaction.date.toISOString(), // Convert the date field to an ISO string.
      category: transaction.category.name, // Use the name field of the category.
    };
  });

  // Return the array of formatted transactions.
  return formattedTransactions;
}


/**
 * Retrieves the total sum per category from the database.
 *
 * @returns {Promise<CategorySum[]>} An array of CategorySum objects.
 */
export async function getTotalSumPerCategory(): Promise<CategorySum[]> {
  // Query the database to retrieve the total sum per category using the Prisma ORM.
  // The result is an array of objects with the sum, categoryId, and name fields.

  // Select the sum of the amount field from the Transaction table.
  // Join the Category table to retrieve the name field.
  // Group the results by categoryId and name.
  const result:{sum:Decimal, categoryId:number, name:string}[] = await prisma.$queryRaw`
    SELECT SUM("Transaction".amount) AS sum,
           "Transaction"."categoryId" as categoryId,
           "Category".name
    FROM "Transaction"
    JOIN "Category" ON "Transaction"."categoryId" = "Category"."id"
    GROUP BY "Transaction"."categoryId", "Category".name
  `;

  // Map each result object to a CategorySum object.
  // Convert the sum field to a number.
  const formattedResults:CategorySum[] = result.map((result) => {
    return {
      sum: result.sum.toNumber(), // Convert the sum field to a number.
      categoryId: result.categoryId, // Use the categoryId field.
      name: result.name, // Use the name field.
    };
  });

  // Return the array of formatted results.
  return formattedResults;
}
