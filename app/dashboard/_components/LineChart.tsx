'use client';

import { TransactionFormat } from '@/app/lib/definitions';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function LineChartPage({data}: {data: TransactionFormat[]}) {

    const totalCostData = data.map((transaction) => ({
    date: new Date(transaction.date).toISOString().slice(0, 10),
    totalCost: data
        .filter((t) => t.date <= transaction.date)
        .reduce((sum, t) => sum + t.amount, 0),
    }));

  return (
    <div>
      <h2>Total Spent Over Time</h2>
      <LineChart width={600} height={300} data={totalCostData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="totalCost" stroke="#8884d8" />
      </LineChart>
      

    </div>
  );
}
