import { CategorySum, TransactionFormat } from "@/app/lib/definitions" // Assuming you've defined this type
import { getTotalSumPerCategory, getTransactionsJSON } from '../lib/data';
import dynamicComponent from 'next/dynamic' ;
import DashboardCard from "./_components/card";
import AiSummary from "../ui/aiSummary";
const LineChartPage = dynamicComponent(() => import('./_components/LineChart'), { ssr: false });
const PieChartPage = dynamicComponent(() => import('./_components/PieChart'), { ssr: false });
export const dynamic = "force-dynamic";

/**
 * This is the main function for the dashboard page.
 * It fetches the transaction data and category sums from the server.
 * It then renders the dashboard cards and the line and pie charts.
 *
 * @returns {Promise<JSX.Element>} The JSX element representing the dashboard page.
 */
export default async function Page(){
  
  // Fetch the transaction data from the server
  const data: TransactionFormat[] = await getTransactionsJSON();
  
  // Sort the data by date
  data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Fetch the total sum per category from the server
  const categorySums:CategorySum[] = await getTotalSumPerCategory();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Render the dashboard cards */}
      <div className="md:flex md:pb-4 justify-center gap-4">
        {/* Render the Total Spent card */}
        <DashboardCard
          title="Total Spent"
          value={"$" + (data.reduce((sum, t) => sum + t.amount, 0)).toFixed(2)}
        />
        {/* Render the Total Transactions card */}
        <DashboardCard
          title="Total Transactions"
          value={data.length.toString()}
        />
        {/* Render the Total Categories card */}
        <DashboardCard
          title="Total Categories"
          value={categorySums.length.toString()}
        />
      </div>
      {/* Render the line and pie charts */}
      <div className="md:flex justify-center gap-4">
        {/* Render the Line Chart */}
        <LineChartPage data={data} />
        {/* Render the Pie Chart */}
        <PieChartPage data={categorySums} />
      </div>

      {/* Display the AI summary component */}
      <AiSummary />
    </div>
  );
};
