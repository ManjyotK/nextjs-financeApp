import { CategorySum, TransactionFormat } from "@/app/lib/definitions" // Assuming you've defined this type
import { getTotalSumPerCategory, getTransactionsJSON } from '../lib/data';
import dynamic from 'next/dynamic';
import DashboardCard from "./_components/card";
const LineChartPage = dynamic(() => import('./_components/LineChart'), { ssr: false });
const PieChartPage = dynamic(() => import('./_components/PieChart'), { ssr: false });

export default async function Page(){

  const data: TransactionFormat[] = await getTransactionsJSON();
  // Sort the data by date
  data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Get the total sum per category
  const categorySums:CategorySum[] = await getTotalSumPerCategory();

  return (
    <>
      <div className="md:flex md:pb-4 justify-center gap-4">
        <DashboardCard title="Total Spent" value={"$" + (data.reduce((sum, t) => sum + t.amount, 0)).toFixed(2)}/>
        <DashboardCard title="Total Transactions" value={data.length.toString()}/>
        <DashboardCard title="Total Categories" value={categorySums.length.toString()}/>
      </div>
      <div className="md:flex justify-center gap-4">
        <LineChartPage data={data} />
        <PieChartPage data={categorySums} />
      </div>
    </>
  );
};
