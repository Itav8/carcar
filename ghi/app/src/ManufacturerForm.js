import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManufacturerForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState([]);

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

    const response = await fetch(manufacturerURL, fetchConfig);
    if (response.ok) {
      const newManufacturer = await response.json();
      console.log(newManufacturer); // DELETE THIS CODE LATER??

      setName("");

      navigate("/manufacturers");
    } else {
      const formAlert = document.getElementById("nameAlert");
      const wrapper = document.createElement("div");
      wrapper.innerHTML = [
        `<div class="alert alert-danger alert-dismissible" role="alert">`,
        `   <div>Manufacturer already exists!</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      formAlert.append(wrapper);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1 id="manufacturerAlert">Create a Manufacturer</h1>
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
              <button className="btn btn-lg btn-primary">Create!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerForm;
