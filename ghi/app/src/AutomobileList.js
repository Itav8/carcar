import React, { useEffect, useState } from "react";
import Modal from "./Modal";
// add a detail feature when you name (id)
function AutomobileList() {
  const [isOpen, setIsOpen] = useState(false);
  const [automobiles, setAutomobiles] = useState([]);

  // onClick passsing event
  // if the isOpen is false, open
  // otherwise, is closed
  // const toggle = () => {
  //   setIsOpen(!isOpen);
  // }

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

  const handleUpdate = () => {
    console.log("TEst");
  };

  useEffect(() => {
    const fetchAutomobiles = async () => {
      const automobileList = await fetch(
        "http://localhost:8100/api/automobiles/"
      );

      if (automobileList.ok) {
        const data = await automobileList.json();
        setAutomobiles(data.autos);
      }
    };

    fetchAutomobiles();
  }, []);

  return (
    <>
      <h1>Automobiles</h1>
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold?</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {automobiles.map((automobile, i) => {
            let isSold = "";
            if (automobile.sold) {
              isSold = "Yes";
            } else {
              isSold = "No";
            }
            return (
              <tr
                key={i}
                data-bs-toggle="modal"
                data-bs-target="#automobileModal"
                role="button"
              >
                <td>{automobile.vin}</td>
                <td>{automobile.color}</td>
                <td>{automobile.year}</td>
                <td>{automobile.model.name}</td>
                <td>{automobile.model.manufacturer.name}</td>
                <td>{isSold}</td>
                <td>
                  <button className="btn btn-outline-dark" onClick={() => handleDelete(automobile.vin)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        id="automobileModal"
        title="Edit Automobile"
      >
        <p></p>
      </Modal>
      </div>
    </>
  );
}

export default AutomobileList;
