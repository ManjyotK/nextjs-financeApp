import { getCategories, getTransactionsJSON } from "@/app/lib/data";
import TransactionsTable from "../ui/transactionsTable";
import { TransactionFormat } from "../lib/definitions";
export const dynamic = "force-dynamic";

/**
 * This is the main page for the transactions section of the app.
 * It displays a table of transactions and an AI summary component.
 *
 * @returns {Promise<JSX.Element>} The JSX element representing the page.
 */
export default async function Page() {
    // Fetch the list of transactions from the database and format them
    const formattedTransactions:TransactionFormat[] = await getTransactionsJSON();
    
    // Fetch the list of categories from the database
    const categoryList = await getCategories();

    // Return the JSX element representing the page
    return (
        <>
            {/* Display the table of transactions */}
            <TransactionsTable 
                transactions={formattedTransactions} 
                categories={categoryList}
            />
        </>
    );
}