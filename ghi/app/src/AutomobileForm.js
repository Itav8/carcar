import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutomobileForm = () => {
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [vin, setVin] = useState("");
  const [model, setModel] = useState("");
  // const [locationID, setLocationID] = useState('');

  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  };
  const handleYearChange = (event) => {
    const value = event.target.value;
    setYear(value);
  };
  const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value);
  };
  const handleModelChange = (event) => {
    const value = event.target.value;
    setModel(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // create an empty JSON object
    const data = {};

    data.vin = vin;
    data.color = color;
    data.model_id = model;
    data.year = year;

    console.log(data);

    const automobilesUrl = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(automobilesUrl, fetchConfig);
    if (response.ok) {
      const newAutomobile = await response.json();
      console.log(newAutomobile);

      setVin("");
      setColor("");
      setModel("");
      setYear("");
    } else {
      const formAlert = document.getElementById("vinAlert");
      const wrapper = document.createElement("div");
      wrapper.innerHTML = [
        `<div class="alert alert-danger alert-dismissible" role="alert">`,
        `   <div>Duplicate VIN!</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      formAlert.append(wrapper);
    }
    navigate("/automobiles");
  };

  const fetchData = async () => {
    const modelsUrl = "http://localhost:8100/api/models/";

    const modelsResponse = await fetch(modelsUrl);
    if (modelsResponse.ok) {
      const data = await modelsResponse.json();
      setModels(data.models);
    } else {
      throw new Error("Response not ok!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1 id="automobileAlert">Create an Automobile</h1>
            <form onSubmit={handleSubmit} id="create-appointment-form">
              <div className="form-floating mb-3">
                <input
                  value={color}
                  onChange={handleColorChange}
                  placeholder="color"
                  required
                  name="color"
                  type="text"
                  id="color"
                  className="form-control"
                />
                <label htmlFor="color">color</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  maxLength={4}
                  value={year}
                  onChange={handleYearChange}
                  placeholder="year"
                  required
                  name="year"
                  type="text"
                  id="year"
                  className="form-control"
                />
                <label htmlFor="year">year</label>
              </div>
              <div id="vinAlert" className="form-floating mb-3">
                <input
                  maxLength={17}
                  value={vin}
                  onChange={handleVinChange}
                  placeholder="Vin"
                  required
                  name="vin"
                  type="text"
                  id="vin"
                  className="form-control"
                />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  onChange={handleModelChange}
                  required
                  name="model"
                  id="model"
                  className="form-select"
                >
                  <option value="">Choose a model</option>
                  {models.map((model) => {
                    return (
                      <option key={model.name} value={model.id}>
                        {model.name}
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
    </div>
  );
};

export default AutomobileForm;
