'use client';

import { TransactionFormat } from '@/app/lib/definitions';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

/**
 * LineChartPage component displays a line chart showing the total cost of transactions over time.
 * 
 * @param {Object} props - The props object containing the data array.
 * @param {Array} props.data - The array of transactions to be displayed in the chart.
 * @returns {JSX.Element} The LineChartPage component.
 */
export default function LineChartPage({data}: {data: TransactionFormat[]}) {
  // Map each transaction to an object with date and total cost up to that date
  const totalCostData = data.map((transaction) => ({
    // Format the date as a string in ISO format (YYYY-MM-DD)
    date: new Date(transaction.date).toISOString().slice(0, 10),
    // Calculate the total cost up to and including the current transaction
    totalCost: data
      .filter((t) => t.date <= transaction.date) // Filter transactions up to and including the current transaction
      .reduce((sum, t) => sum + t.amount, 0), // Sum the amounts of the filtered transactions
  }));

  return (
    <div>
      {/* Heading */}
      <h2>Total Spent Over Time</h2>
      
      {/* Line chart */}
      <LineChart width={600} height={300} data={totalCostData}>
        {/* X-axis */}
        <XAxis dataKey="date" />
        {/* Y-axis */}
        <YAxis />
        {/* Tooltip */}
        <Tooltip />
        {/* Line representing the total cost */}
        <Line type="monotone" dataKey="totalCost" stroke="#8884d8" />
      </LineChart>
      
    </div>
  );
}
