import { getCategories, getTransactionsJSON } from "@/app/lib/data";
import TransactionsTable from "../ui/transactionsTable";
import { TransactionFormat } from "../lib/definitions";
import AiSummary from "../ui/aiSummary";
export const dynamic = "force-dynamic";

export default async function Page() {
    const formattedTransactions:TransactionFormat[] = await getTransactionsJSON();
    const categoryList = await getCategories();

    return (
        <div>
            <TransactionsTable transactions={formattedTransactions} categories={categoryList}/>
            <AiSummary />
        </div>
    );
}
