import { getTransactions } from "@/app/lib/data";
import { Transaction } from "@prisma/client";

export default async function Page() {
    const transactions:Transaction[] = await getTransactions();

    return (
        <div>
            <h1>Transactions</h1>
            <ul>
                {transactions.map((transactions) => (
                    <li key={transactions.id}>
                        {transactions.amount.toString()} ({transactions.date.toString()})
                    </li>
                ))}
            </ul>
        </div>
    );
}