import React, { useState } from "react";
import { useNavigate } from "react-router";

function ManufacturerFormEdit(props) {
  const navigate = useNavigate();
  const [updatedForm, setUpdatedForm] = useState({
    name: props.manufacturer.name,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateUrl = `http://localhost:8100/api/manufacturers/${props.manufacturer.id}/`;
    const updateData = {
      name: updatedForm.name,
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

  return (
    <div className="p-3" data-bs-focus={true}>
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
            id="updateName"
            value={updatedForm.name}
          />
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default ManufacturerFormEdit;
