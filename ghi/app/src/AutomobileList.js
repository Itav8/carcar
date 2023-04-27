import React, { useEffect, useState } from "react";
// add a detail feature when you name (id)
function AutomobileList() {
  const [automobiles, setAutomobiles] = useState([]);

  const handleDelete = async (vin) => {
    const url = `http://localhost:8100/api/automobiles/${vin}/`;

    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setAutomobiles(
        automobiles.filter((automobile) => automobile.vin !== vin)
      );
    }
  };

  useEffect(() => {
    const fetchAutomobiles = async () => {
      const automobileList = await fetch(
        "http://localhost:8100/api/automobiles/"
      );

      if (automobileList.ok) {
        const data = await automobileList.json();
        console.log(data.autos);
        setAutomobiles(data.autos);
      }
    };

    fetchAutomobiles();
  }, []);

  return (
    <>
      <h1>Automobiles</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {automobiles.map((automobile, i) => {
            console.log(automobile);
            return (
              <tr key={i}>
                <td>{automobile.vin}</td>
                <td>{automobile.color}</td>
                <td>{automobile.year}</td>
                <td>{automobile.model.name}</td>
                <td>{automobile.model.manufacturer.name}</td>
                {/* use boolean to set to yes or no */}
                <td>{automobile.model.sold}</td>
                {/* add a edit button */}
                <td>
                  <button onClick={() => handleDelete(automobile.vin)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AutomobileList;
