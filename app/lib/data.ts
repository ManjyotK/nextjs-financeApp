import { boredapi, CategorySum, TransactionFormat } from "./definitions";
import prisma from "@/lib/db/prisma";
import { User, Transaction, Category } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";


export async function fetchFact(): Promise<boredapi> {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  //noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Fetching data...');
    const response = await fetch('https://www.boredapi.com/api/activity', 
      { cache: 'no-store'}
    );
    
    const data = await response.json();


    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch data.');
  }
}

export async function getUsers(): Promise<User[]> {
  // const result: User[] = await prisma.$queryRaw`SELECT * FROM "User"`;
  const result: User[] = await prisma.user.findMany();
  return result;
}


export async function getTransactions(): Promise<Transaction[]> {
  // const result: Transaction[] = await prisma.$queryRaw`SELECT * FROM "Transaction"`;
  const result: Transaction[] = await prisma.transaction.findMany();
  return result;
}

export async function getCategories(): Promise<Category[]> {
  // const result: Category[] = await prisma.$queryRaw`SELECT * FROM "Category"`;
  const result: Category[] = await prisma.category.findMany();
  return result;
}

export async function getTransactionsJSON(): Promise<TransactionFormat[]> {
  // const result: Transaction[] = await prisma.$queryRaw`SELECT * FROM "Transaction"`;
  const result = await prisma.transaction.findMany({
    include: {
      category: {
        select: {
          name: true,
        }
      }
    },
  });

  const formattedTransactions:TransactionFormat[] = result.map((transaction) => {
    return {
      ...transaction,
      amount: transaction.amount.toNumber(),
      date: transaction.date.toISOString(),
      category: transaction.category.name,
    }
  })

  return formattedTransactions;
}


export async function getTotalSumPerCategory(): Promise<CategorySum[]> {

  const result:{sum:Decimal, categoryId:number, name:string}[] = await prisma.$queryRaw`
    SELECT SUM("Transaction".amount) AS sum,
     "Transaction"."categoryId" as categoryId,
     "Category".name
      FROM "Transaction"
      JOIN "Category" ON "Transaction"."categoryId" = "Category"."id"
      GROUP BY "Transaction"."categoryId", "Category".name
      `;

  const formattedResults:CategorySum[] = result.map((result) => {
    return {
      ...result,
      sum: result.sum.toNumber()
    }
  })

  return formattedResults;
}
