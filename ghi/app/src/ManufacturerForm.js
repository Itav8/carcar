import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const ManufacturerForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;

    const manufacturerURL = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(manufacturerURL, fetchConfig);
      if (response.ok) {
        const newManufacturer = await response.json();
        setName("");

        navigate("/manufacturers");
      } else {
        setAlert(true);
        setAlertMessage("Duplicate Manufacturer!");
      }
    } catch (error) {
      setAlert(true);
      setAlertMessage("Problem with request, try again later.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Manufacturer</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form">
              <div id="nameAlert" className="form-floating mb-3">
                <input
                  value={name}
                  onChange={handleNameChange}
                  required
                  placeholder="Name of Manufacturer"
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                />
                <label htmlFor="name">Name...</label>
              </div>
              <button className="btn btn-md btn-outline-success">Create!</button>
            </form>
          </div>
        </div>
        <Alert alert={alert} message={alertMessage}>
          <></>
        </Alert>
      </div>
    </div>
  );
};

export default ManufacturerForm;
