import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { CategorySum, TransactionFormat } from "@/app/lib/definitions" // Assuming you've defined this type
import { getTotalSumPerCategory, getTransactionsJSON } from '../lib/data';
import dynamic from 'next/dynamic';
const LineChartPage = dynamic(() => import('./_components/LineChart'), { ssr: false });
const PieChartPage = dynamic(() => import('./_components/PieChart'), { ssr: false });

export default async function Page(){

  const data: TransactionFormat[] = await getTransactionsJSON();
  // Sort the data by date
  data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Get the total sum per category
  const categorySums:CategorySum[] = await getTotalSumPerCategory();

  

  return (

    <div>
      <h1>Finance Dashboard</h1>

      <div className="flex justify-center gap-4">
        <LineChartPage data={data} />
        <PieChartPage data={categorySums} />
      </div>

      
    </div>
  );
};
