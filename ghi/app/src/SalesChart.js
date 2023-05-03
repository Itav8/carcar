import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
// fetch the sales data -> line graph to see if sales increasing or decreasing
// fetch how many sales the employee made (bar graph)
// fetch appointments -> bar graph to see total amount of appointments in each month
const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  // fetch all the data and set state
  useEffect(() => {
    const fetchSales = async () => {
      const sales = await fetch("http://localhost:8090/api/sales/");

      if (sales.ok) {
        const data = await sales.json();
        setSalesData(data.sales);
      }
    };

    fetchSales();
  }, []);
  // // renders the sales data chart
  useEffect(() => {
    const data = salesData.reduce((accum, currentVal) => {
      const employee = currentVal.salesperson.employee_id;
      if (!(employee in accum)) {
        accum[employee] = currentVal.price;
      } else {
        accum[employee] += currentVal.price;
      }
      return accum;
    }, {});
    const chart = new Chart(document.getElementById("salesCharts"), {
      type: "bar",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Sales by Employee",
            data: Object.values(data),
          },
        ],
      },
    });
    // clean up function
    // https://react.dev/reference/react/useEffect
    return () => {
      chart.destroy();
    };
  }, [salesData]);

  return (
    <div>
      <canvas id="salesCharts" />
    </div>
  );
};

export default SalesChart;
