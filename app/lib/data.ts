import { boredapi } from "./definitions";
import prisma from "@/lib/db/prisma";
import { User } from "@prisma/client";


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
  const result: User[] = await prisma.$queryRaw`SELECT * FROM "User"`;
  console.log(result);
  return result;
}
