import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8090/api/customers/";
    const data = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      address: formData.address,
      phone_number: formData.phoneNumber,
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
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
      });
      return navigate("/customer");
    } else {
      const formAlert = document.getElementById("phoneAlert");
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
          `<div class="alert alert-danger alert-dismissible" role="alert">`,
          `   <div>Manufacturer already exists!</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
      ].join('')

      formAlert.append(wrapper);

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
          <h1>Add a Customer</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="First Name"
                required
                type="text"
                name="firstName"
                className="form-control"
              />
              <label htmlFor="firstName">First name...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Last Name"
                required
                type="text"
                name="lastName"
                className="form-control"
              />
              <label htmlFor="lastName">Last name...</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Address"
                required
                type="text"
                name="address"
                className="form-control"
              />
              <label htmlFor="address">Address...</label>
            </div>
            <div id="phoneAlert" className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Phone number"
                required
                type="text"
                name="phoneNumber"
                className="form-control"
              />
              <label htmlFor="phoneNumber">Phone number...</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
