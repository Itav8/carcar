import React, { useEffect, useState } from "react";
// add a detail feature when you name (id)
function VehicleModelList() {
  const [models, setModels] = useState([]);

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
      setModels(models.filter((model) => model.id !== modelId));
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
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model, i) => {
            const manufacturer = model.manufacturer.name;
            return (
              <tr key={i}>
                <td>{model.name}</td>
                <td>{manufacturer}</td>
                <td>
                  <img
                    style={{width: "320px", height:"170px"}}
                    src={
                      model.picture_url ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKF7un7rdumxHU9gmGv_eQFCx4ct0cPjtttw&usqp=CAU"
                    }
                  />
                </td>
                {/* add a edit button */}
                <td>
                  <button className="btn btn-outline-dark" onClick={() => handleDelete(model.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default VehicleModelList;
