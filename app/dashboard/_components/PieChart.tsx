'use client';

import { CategorySum } from '@/app/lib/definitions';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

/**
 * PieChartPage component is a React functional component that renders a pie chart
 * showing the breakdown of transactions by category.
 *
 * @param {Object} props - The props object containing the data for the pie chart.
 * @param {Array} props.data - An array of objects representing the category sums.
 * @param {number} props.data[].sum - The total sum of transactions in the category.
 * @param {string} props.data[].name - The name of the category.
 * @return {JSX.Element} The PieChartPage component.
 */
export default function PieChartPage({data}: {data: CategorySum[]}) {
    // Define the colors for the pie chart
    const colors = [
        '#1f77b4', // Blue
        '#ff7f0e', // Orange
        '#2ca02c', // Green
        '#d62728', // Red
        '#9467bd', // Purple
        '#8c564b', // Brown
        '#e377c2', // Pink
        '#7f7f7f', // Grey
        '#bcbd22', // Yellow
        '#17becf', // Light Blue
        '#aec7e8', // Light Purple
        '#ffbb78', // Gold
    ];

    return (
        <div>
            {/* Title for the pie chart */}
            <h2>Transaction Breakdown by Category</h2>
            {/* Render the pie chart */}
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
                    {/* Map over the category sums and render a cell for each one */}
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                {/* Render the tooltip for the pie chart */}
                <Tooltip />
            </PieChart>
        </div>
    );
}
