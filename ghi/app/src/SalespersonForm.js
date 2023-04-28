import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from './Alert';

function SalespersonForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
  });
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8090/api/salespeople/";
    const data = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      employee_id: formData.employeeId,
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
        firstName: "",
        lastName: "",
        employeeId: "",
      });
      return navigate("/salespeople")
    } else {
      setAlert(true);
      setAlertMessage("Duplicate Manufacturer!");
  }} catch(error) {
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
          <h1>Add a Salesperson</h1>
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
            <div id="employeeIDAlert" className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Employee Id"
                required
                type="text"
                name="employeeId"
                className="form-control"
              />
              <label htmlFor="employeeId">Employee ID...</label>
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

export default SalespersonForm;
