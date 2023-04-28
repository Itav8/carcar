import React, { useState } from "react";
import { useNavigate } from "react-router";

function VehicleModelFormEdit(props) {
  const navigate = useNavigate();
  const [updatedForm, setUpdatedForm] = useState({
    name: props.model.name,
    pictureUrl: props.model.picture_url,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateUrl = `http://localhost:8100/api/models/${props.model.id}/`;
    const updateData = {
      name: updatedForm.name,
      picture_url: updatedForm.pictureUrl,
    };

    const updatedFetchConfig = {
      method: "put",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const updatedResponse = await fetch(updateUrl, updatedFetchConfig);
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
  console.log(props.model.name, props.model.id);
  return (
    <div className="p-3" data-bs-focus={true}>
      <div className="d-flex justify-content-between">
        <p>
          {" "}
          <strong>Manufacturer:</strong>
          {props.model.manufacturer.name}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="updatedForm" className="form-label">
            <strong>Name:</strong>
          </label>
          <input
            onChange={handleFormChange}
            type="text"
            name="name"
            className="form-control"
            id="updatedName"
            value={updatedForm.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="updatedForm2" className="form-label">
            <strong>Picture:</strong>
          </label>
          <input
            onChange={handleFormChange}
            type="text"
            name="pictureUrl"
            className="form-control"
            id="updatedPictureUrl"
            value={updatedForm.pictureUrl}
          />
        </div>
        <button className="btn btn-outline-success">Update</button>
      </form>
    </div>
  );
}

export default VehicleModelFormEdit;
