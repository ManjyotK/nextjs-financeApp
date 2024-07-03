import { getTransactions } from "@/app/lib/data";
import { Transaction } from "@prisma/client";
import TransactionTable from "@/app/ui/transactionTable";
import { TransactionFormat } from "../lib/definitions";

export default async function Page() {
    const transactions:Transaction[] = await getTransactions();
    const formattedTransactions:TransactionFormat[] = transactions.map((transaction) => {
        return {
            ...transaction,
            amount: transaction.amount.toNumber(),
            date: transaction.date.toISOString()
        }
    })


    return (
        <div>
            <h1>Transactions</h1>


            <TransactionTable transactions={formattedTransactions}/>



            {/* <form action={async (formData: FormData) => {
                'use server';
                console.log(formData.get('image'));
            }}>
                <div  className="flex w-full items-center justify-between space-x-4 p-2 border-2  hover:border-gray-400 rounded-xl transition-colors duration-300"> <input  type="file"  name="image"   className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100" /> </div>
                <Button color="primary" type="submit">Submit</Button>
            </form> */}
        </div>
    );
}
