import React, { useState } from "react";
import { useNavigate } from "react-router";

function AutomobileFormEdit(props) {
  const navigate = useNavigate();
  const [updatedForm, setUpdatedForm] = useState({
    color: props.automobile.color,
    year: props.automobile.year,
    sold: props.automobile.sold,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateUrl = `http://localhost:8100/api/automobiles/${props.automobile.vin}/`;

    const updateData = {
      color: updatedForm.color,
      year: updatedForm.year,
      sold: updatedForm.sold,
    };

    const updateFetchConfig = {
      method: "put",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const updatedResponse = await fetch(updateUrl, updateFetchConfig);

    if (updatedResponse.ok) {
      navigate(0);
    }
  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setUpdatedForm({
      ...updatedForm,
      [inputName]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const inputName = e.target.name;

    setUpdatedForm({
      ...updatedForm,
      [inputName]: !updatedForm.sold,
    });
  };

  console.log(props.automobile.model.manufacturer.name);
  return (
    <div className="p-3" data-bs-focus={true}>
      <div className="d-flex justify-content-between">
        <p>
          <strong>VIN:</strong>
          {props.automobile.vin}
        </p>
        <p>
          {" "}
          <strong>Model:</strong>
          {props.automobile.model.name}{" "}
        </p>
        <p>
          {" "}
          <strong>Manufacturer:</strong>
          {props.automobile.model.manufacturer.name}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="updatedForm" className="form-label">
            <strong>Color:</strong>
          </label>
          <input
            onChange={handleFormChange}
            type="text"
            name="color"
            className="form-control"
            id="updateColor"
            value={updatedForm.color}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="updatedForm2" className="form-label">
            <strong>Year:</strong>
          </label>
          <input
            onChange={handleFormChange}
            type="text"
            name="year"
            className="form-control"
            id="updateYear"
            value={updatedForm.year}
          />
        </div>
        <div className="mb-3 form-check">
          <label className="form-check-label">Sold</label>
          <input
            onChange={handleCheckboxChange}
            className="form-check-input"
            name="sold"
            type="checkbox"
            id="updateSold"
            checked={updatedForm.sold}
          />
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default AutomobileFormEdit;
