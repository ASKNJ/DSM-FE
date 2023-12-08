import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ stats }) => {
    const data = {
        labels: Object.keys(stats),
        datasets: [
            {
                data: Object.values(stats),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'right', // to display legend to the right of the chart
                align: 'start'
            },
        },
    };

    return (
        <div style={{ width: "350px", height: '350px' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default PieChart;
