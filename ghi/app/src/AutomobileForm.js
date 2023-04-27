import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AutomobileForm() {
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
  const [formData, setFormData] = useState({
    color: "",
    year: "",
    vin: "",
    model: "",
  });

  useEffect(() => {
    const fectchModelData = async () => {
      const url = "http://localhost:8100/api/automobiles/";

      const response = await fetch(url);
      if (response.ok) {
        const modelData = await response.json();
        setModels(modelData.autos);
      }
    };
    fectchModelData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8100/api/automobiles/";
    const data = {
      color: formData.color,
      year: formData.year,
      vin: formData.vin,
      model_id: formData.model,
    };

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setFormData({
        color: "",
        year: "",
        vin: "",
        model: "",
      });
    }

    return navigate("/automobiles");
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
          <h1>Add an automobile to inventory</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Color"
                required
                type="text"
                name="color"
                className="form-control"
              />
              <label htmlFor="color">Color...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Year"
                type="text"
                name="year"
                className="form-control"
              />
              <label htmlFor="year">Year...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Vin"
                type="text"
                name="vin"
                className="form-control"
              />
              <label htmlFor="vin">VIN...</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                required
                name="model"
                id="model"
                className="form-select"
              >
                <option value="">Choose a model...</option>
                {models.map((model, i) => {
                  const modelName = model.model.name;
                  // set a conditional to prevent repeated models name
                  return (
                    <option key={i} value={model.id}>
                      {modelName}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AutomobileForm;
