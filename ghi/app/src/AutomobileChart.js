import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

// fetch manufactuere and models -> pie chart to track inventory visually
const AutomobileChart = () => {
  const [automobiles, setAutomobiles] = useState([]);

  useEffect(() => {
    const fetchAutomobile = async () => {
      const automobileList = await fetch(
        "http://localhost:8100/api/automobiles/"
      );

      if (automobileList.ok) {
        const data = await automobileList.json();

        setAutomobiles(data.autos);
      }
    };

    fetchAutomobile();
  }, []);

  useEffect(() => {
    // Filter all cars that are not sold.
    const filtered = automobiles.filter((automobile) => !automobile.sold);
    console.log(filtered);
    // aggregate data
    const data = filtered.reduce((accum, currentVal) => {
      const key = currentVal?.model?.manufacturer?.name;
      if (!(key in accum)) {
        accum[key] = 1;
      } else {
        accum[key]++;
      }

      return accum;
    }, {});

    const chart = new Chart(document.getElementById("automobileCharts"), {
      type: "pie",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            // label: automobiles.map((automobile) => automobile.model.name),
            data: Object.values(data),
          },
        ],
      },
    });
    return () => {
      chart.destroy();
    };
  }, [automobiles]);

  return (
    <div>
      <canvas id="automobileCharts" />
    </div>
  );
};

export default AutomobileChart;
