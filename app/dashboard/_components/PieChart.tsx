'use client';

import { CategorySum } from '@/app/lib/definitions';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function PieChartPage({data}: {data: CategorySum[]}) {
    // Colors for the pie chart
  const colors = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
    '#aec7e8',
    '#ffbb78',
  ];

  return (
    <div>
      <h2>Transaction Breakdown by Category</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="sum"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            // <Cell key={`cell-${index}`} fill={`#${(index * 70).toString(16)}3399ff`} />
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>

  );
}
