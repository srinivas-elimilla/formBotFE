import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registering chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CompletionChart = ({ completed, total }) => {
  const completedPercentage = (completed / total) * 100;
  const notCompletedPercentage = 100 - completedPercentage;

  const data = {
    labels: ["Completed", "Not Completed"],
    datasets: [
      {
        data: [completedPercentage, notCompletedPercentage],
        backgroundColor: ["#3B82F6", "#909090"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: false,
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw.toFixed(2)}%`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "500px", height: "300px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CompletionChart;
