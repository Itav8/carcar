import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Alert from "./Alert";
import AutomobileFormEdit from "./AutomobileFormEdit";
import AutomobileInfo from "./AutomobileInfo";

function AutomobileList() {
  const [automobiles, setAutomobiles] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
      setAlert(true);
      setAlertMessage("Successfully Deleted!");
      setAutomobiles(
        automobiles.filter((automobile) => automobile.vin !== vin)
      );
    } else {
      setAlert(true);
      setAlertMessage("Problem with delete, try again later.");
    }
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
      <Alert alert={alert} message={alertMessage}>
        <></>
      </Alert>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Color</th>
              <th>Year</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Sold</th>
              <th className="align-middle text-center">More info</th>
              <th className="align-middle text-center">Edit</th>
              <th className="align-middle text-center">Delete?</th>
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
                <tr key={i}>
                  <td>{automobile.vin}</td>
                  <td>{automobile.color}</td>
                  <td>{automobile.year}</td>
                  <td>{automobile.model.name}</td>
                  <td>{automobile.model.manufacturer.name}</td>
                  <td>{isSold}</td>
                  <td className="align-middle px-3 text-center">
                    <button
                      className="btn btn-outline-dark"
                      data-bs-toggle="modal"
                      data-bs-target={`#automobileInfo-${i}`}
                    >
                      More info
                    </button>
                    <Modal id={`automobileInfo-${i}`} title="Automobile Info">
                      <AutomobileInfo automobile={automobile} />
                    </Modal>
                  </td>
                  <td className="align-middle px-3 text-center">
                    <button
                      className="btn btn-outline-dark"
                      data-bs-toggle="modal"
                      data-bs-target={`#automobileModal-${i}`}
                    >
                      Edit
                    </button>
                    <Modal id={`automobileModal-${i}`} title="Edit Automobile">
                      <AutomobileFormEdit automobile={automobile} />
                    </Modal>
                  </td>
                  <td className="align-middle px-3 text-center">
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => handleDelete(automobile.vin)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AutomobileList;
