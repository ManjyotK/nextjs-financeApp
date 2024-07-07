'use client';

import { TransactionFormat } from '@/app/lib/definitions';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineChartPage({data}: {data: TransactionFormat[]}) {

    const totalCostData = data.map((transaction) => ({
    date: transaction.date,
    totalCost: data
        .filter((t) => t.date <= transaction.date)
        .reduce((sum, t) => sum + t.amount, 0),
    }));

  return (
    <div>
      <h2>Total Cost Over Time</h2>
      <LineChart width={600} height={300} data={totalCostData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalCost" stroke="#8884d8" />
      </LineChart>
      

    </div>
  );
}
