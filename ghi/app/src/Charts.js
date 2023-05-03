import React, { useEffect } from "react";
import Chart from "chart.js/auto";

// fetch the sales data -> line graph to see if sales increasing or decreasing
// fetch appointments -> bar graph to see total amount of appointments in each month
// fetch manufactuere and models -> pie chart to track inventory visually
const Charts = () => {
  useEffect(() => {
    // fetch the data the is needed
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];
    // create the chats
    const chart = new Chart(document.getElementById("charts"), {
      type: "bar",
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      },
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by year",
            data: data.map((row) => row.count),
          },
        ],
      },
    });
    // clean up function
    // https://react.dev/reference/react/useEffect
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div>
      <canvas id="charts" />
    </div>
  );
};

export default Charts;
