import { React, useState, useEffect } from "react";
import Modal from "./Modal";
import Alert from "./Alert";

const AppointmentList = () => {
  const APPOINTMENTS_URL = "http://localhost:8080/api/appointments";
  const AUTOMOBILEVOS_URL = "http://localhost:8080/api/automobileVOs";

  const [appointments, setAppointments] = useState([]);
  const [vins, setVins] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const apiRequest = async (url = "", optionsObj = null, errMsg = null) => {
    try {
      const response = await fetch(url, optionsObj);
      if (!response.ok) throw Error("Please reload the app");
    } catch (err) {
      errMsg = err.message;
    } finally {
      return errMsg;
    }
  };

  const handleCancel = async (id) => {
    const putOptions = { method: "PUT" };
    const reqUrl = `${APPOINTMENTS_URL}/${id}/cancel`;
    const result = await apiRequest(reqUrl, putOptions);
    if (result) {
      setAlert(true);
      setAlertMessage("Could not Cancel!");
    } else {
      const newAppointments = appointments.filter(
        (appointment) => appointment.id !== id
      );
      setAppointments(newAppointments);
    }
  };

  const handleFinish = async (id) => {
    const putOptions = { method: "PUT" };
    const reqUrl = `${APPOINTMENTS_URL}/${id}/finish`;
    const result = await apiRequest(reqUrl, putOptions);
    if (result) {
      setAlert(true);
      setAlertMessage("Could not Finish!");
    } else {
      const newAppointments = appointments.filter(
        (appointment) => appointment.id !== id
      );
      setAppointments(newAppointments);
    }
  };

  const fetchData = async () => {
    const appointmentsResponse = await fetch(APPOINTMENTS_URL);
    const automobileVOsResponse = await fetch(AUTOMOBILEVOS_URL);
    if (appointmentsResponse.ok) {
      const data = await appointmentsResponse.json();
      setAppointments(
        data.appointments.filter(
          (appointment) => appointment.status === "created"
        )
      );
    } else {
      throw new Error("Appointments Response not ok!");
    }
    if (automobileVOsResponse.ok) {
      const data = await automobileVOsResponse.json();

      const newVins = [];
      for (let car of data) {
        newVins.push(car.vin);
      }
      setVins(newVins);
    } else {
      throw new Error("Appointments Response not ok!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Service Appointments</h1>
      <Alert alert={alert} message={alertMessage}>
        <></>
      </Alert>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="tableAlert">
            <tr>
              <th
                className="align-middle text-uppercase fw-bold"
                style={{ fontSize: "1rem" }}
              >
                VIN
              </th>
              <th
                className="align-middle text-uppercase fw-bold"
                style={{ fontSize: "1rem" }}
              >
                Is VIP?
              </th>
              <th
                className="align-middle text-uppercase fw-bold"
                style={{ fontSize: "1rem" }}
              >
                Customer
              </th>
              <th
                className="align-middle text-uppercase fw-bold"
                style={{ fontSize: "1rem" }}
              >
                Date
              </th>
              <th
                className="align-middle text-uppercase fw-bold"
                style={{ fontSize: "1rem" }}
              >
                Time
              </th>
              <th
                className="align-middle text-uppercase fw-bold"
                style={{ fontSize: "1rem" }}
              >
                Technician
              </th>
              <th
                className="align-middle text-uppercase fw-bold"
                style={{ fontSize: "1rem" }}
              >
                Reason
              </th>
              <th className="align-middle text-center">Cancel/Finish</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              return (
                <tr key={appointment.id}>
                  <td
                    className="align-middle fw-bold px-3"
                    style={{ fontSize: "1rem" }}
                  >
                    {appointment.vin}
                  </td>
                  <td
                    className="align-middle px-3"
                    style={{
                      fontSize: "1rem",
                      color:
                        vins.indexOf(appointment.vin) > -1 ? "green" : "black",
                    }}
                  >
                    {vins.indexOf(appointment.vin) > -1 && `YES`}
                    {!(vins.indexOf(appointment.vin) > -1) && `No`}
                  </td>
                  <td
                    className="align-middle px-3"
                    style={{ fontSize: "1rem" }}
                  >
                    {appointment.customer}
                  </td>
                  <td
                    className="align-middle px-3"
                    style={{ fontSize: "1rem" }}
                  >
                    {new Date(appointment.date_time).toLocaleDateString()}
                  </td>
                  <td
                    className="align-middle px-3"
                    style={{ fontSize: "1rem" }}
                  >
                    {new Date(appointment.date_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td
                    className="align-middle px-3"
                    style={{ fontSize: "1rem" }}
                  >
                    {appointment.technician}
                  </td>
                  <td
                    className="align-middle px-3"
                    style={{ fontSize: "1rem" }}
                  >
                    {appointment.reason}
                  </td>
                  <td className="align-middle px-3 text-center">
                    <button
                      className="btn btn-outline-danger"
                      role="button"
                      onClick={() => handleCancel(appointment.id)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-outline-success"
                      role="button"
                      onClick={() => handleFinish(appointment.id)}
                    >
                      Finish
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AppointmentList;
