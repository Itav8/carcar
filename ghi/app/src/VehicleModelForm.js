import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

function VehicleModelForm() {
  const navigate = useNavigate();
  const [manufacturers, setManufactures] = useState([]);
  const [formData, setFormData] = useState({
    modelName: "",
    pictureUrl: "",
    manufacturer: "",
  });
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchManufaturerData = async () => {
      const url = "http://localhost:8100/api/manufacturers/";

      const response = await fetch(url);
      if (response.ok) {
        const manufacturerData = await response.json();
        setManufactures(manufacturerData.manufacturers);
      }
    };

    fetchManufaturerData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "	http://localhost:8100/api/models/";
    const data = {
      name: formData.modelName,
      picture_url: formData.pictureUrl,
      manufacturer_id: formData.manufacturer,
    };

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setFormData({
        modelName: "",
        pictureUrl: "",
        manufacturer: "",
      });
      return navigate("/models");
    } else {
      setAlert(true);
      setAlertMessage("Bad model, try again! (URL must be < 200 characters)");
    }
    }catch(error) {
      setAlert(true);
      setAlertMessage("Problem with request, try again later.");
    }


  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a vehicle model</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Model name"
                required
                type="text"
                name="modelName"
                className="form-control"
              />
              <label htmlFor="modelName">Model name...</label>
            </div>
            <div id="urlAlert" className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Picture URL"
                type="text"
                name="pictureUrl"
                className="form-control"
              />
              <label htmlFor="pictureUrl">Picture URL...</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                required
                name="manufacturer"
                id="manufacturer"
                className="form-select"
              >
                <option value="">Choose a manufacturer...</option>
                {manufacturers.map((manufacturer, i) => {
                  return (
                    <option key={i} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-outline-success">Create</button>
          </form>
        </div>
      </div>
      <Alert alert={alert} message={alertMessage}>
        <></>
      </Alert>
    </div>
  );
}

export default VehicleModelForm;
