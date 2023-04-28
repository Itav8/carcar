import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const ServiceForm = () => {
  const navigate = useNavigate();
  const [technicians, setTechnicians] = useState([]);
  const [vin, setVin] = useState("");
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [technician, setTechnician] = useState("");
  const [reason, setReason] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value);
  };
  const handleCustomerChange = (event) => {
    const value = event.target.value;
    setCustomer(value);
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };
  const handleTimeChange = (event) => {
    const value = event.target.value;
    setTime(value);
  };
  const handleTechnicianChange = (event) => {
    const value = event.target.value;
    setTechnician(value);
  };
  const handleReasonChange = (event) => {
    const value = event.target.value;
    setReason(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {};

    data.vin = vin;
    data.customer = customer;
    data.date_time = `${date}T${time}`;
    data.technician = technician;
    data.reason = reason;

    console.log(data);

    const appointmentsUrl = "http://localhost:8080/api/appointments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(appointmentsUrl, fetchConfig);
      if (response.ok) {
        const newAppointment = await response.json();
        console.log(newAppointment);

        setVin("");
        setCustomer("");
        setDate("");
        setTime("");
        setTechnician("");
        setReason("");

        navigate("/services");
      } else {
        setAlert(true);
        setAlertMessage("Duplicate Manufacturer!");
      }
    } catch (error) {
      setAlert(true);
      setAlertMessage("Problem with request, try again later.");
    }
  };

  const fetchData = async () => {
    const techniciansUrl = "http://localhost:8080/api/technicians/";

    const techniciansResponse = await fetch(techniciansUrl);
    if (techniciansResponse.ok) {
      const data = await techniciansResponse.json();
      setTechnicians(data.technicians);
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
            <h1 id="appointmentAlert">Create a Service Appointment</h1>
            <form onSubmit={handleSubmit} id="create-appointment-form">
              <div className="form-floating mb-3">
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
                <input
                  value={customer}
                  onChange={handleCustomerChange}
                  placeholder="Customer"
                  required
                  name="customer"
                  type="text"
                  id="customer"
                  className="form-control"
                />
                <label htmlFor="customer">Customer</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={date}
                  onChange={handleDateChange}
                  placeholder="Date"
                  required
                  name="date"
                  type="date"
                  id="date"
                  className="form-control"
                />
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={time}
                  onChange={handleTimeChange}
                  placeholder="Time"
                  required
                  name="time"
                  type="time"
                  id="time"
                  className="form-control"
                ></input>
                <label htmlFor="time">Time</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={handleTechnicianChange}
                  required
                  name="technician"
                  id="technician"
                  className="form-select"
                >
                  <option value="">Choose a Technician</option>
                  {technicians.map((technician) => {
                    return (
                      <option
                        key={technician.employee_id}
                        value={technician.employee_id}
                      >
                        {technician.first_name} {technician.last_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div id="reasonAlert" className="form-floating mb-3">
                <input
                  value={reason}
                  onChange={handleReasonChange}
                  placeholder="Reason"
                  required
                  name="reason"
                  type="text"
                  id="reason"
                  className="form-control"
                />
                <label htmlFor="reason">Reason</label>
              </div>
              <button className="btn btn-outline-success">Create</button>
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

export default ServiceForm;
