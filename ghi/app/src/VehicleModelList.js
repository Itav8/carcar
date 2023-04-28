import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import Modal from "./Modal";
import VehicleModelFormEdit from "./VehicleModelFormEdit";

function VehicleModelList() {
  const [models, setModels] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleDelete = async (modelId) => {
    const url = `http://localhost:8100/api/models/${modelId}/`;

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
      setModels(models.filter((model) => model.id !== modelId));
    } else {
      setAlert(true);
      setAlertMessage("Problem with delete, try again later.");
    }
  };

  useEffect(() => {
    const fetchModels = async () => {
      const modelList = await fetch("http://localhost:8100/api/models/");

      if (modelList.ok) {
        const data = await modelList.json();
        setModels(data.models);
      }
    };

    fetchModels();
  }, []);

  return (
    <>
      <h1>Models</h1>
      <Alert alert={alert} message={alertMessage}>
        <></>
      </Alert>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th className="text-center">Picture</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, i) => {
              const manufacturer = model.manufacturer.name;
              return (
                <tr key={i}>
                  <td className="align-middle">{model.name}</td>
                  <td className="align-middle">{manufacturer}</td>
                  <td className="align-middle text-center">
                    <img
                      style={{ width: "320px", height: "170px" }}
                      src={
                        model.picture_url ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKF7un7rdumxHU9gmGv_eQFCx4ct0cPjtttw&usqp=CAU"
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-dark"
                      data-bs-toggle="modal"
                      data-bs-target={`#vehicleModal-${i}`}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => handleDelete(model.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <Modal id={`vehicleModal-${i}`} title="Edit Model">
                    <VehicleModelFormEdit model={model} />
                  </Modal>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default VehicleModelList;
