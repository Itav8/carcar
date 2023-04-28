import { React, useState, useEffect } from "react";

const ServiceHistory = () => {
  const APPOINTMENTS_URL = "http://localhost:8080/api/appointments";
  const AUTOMOBILEVOS_URL = "http://localhost:8080/api/automobileVOs";

  const [appointments, setAppointments] = useState([]);
  const [vins, setVins] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");

  const fetchData = async () => {
    const appointmentsResponse = await fetch(APPOINTMENTS_URL);
    const automobileVOsResponse = await fetch(AUTOMOBILEVOS_URL);
    if (appointmentsResponse.ok) {
      const data = await appointmentsResponse.json();
      setAppointments(data.appointments);
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

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchTrigger(search);
  };

  return (
    <>
      <h1>Service History</h1>
      <div>
        <div className="mb-3">
          <form className="searchForm" onSubmit={handleSearchSubmit}>
            <div id="nameAlert" className="form-floating mb-3">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                role="searchbox"
                id="vin"
                name="vin"
                value={search}
                placeholder="Enter a VIN"
              />
              <button className="btn btn-outline-dark m-1" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead>
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
                <th
                  className="align-middle text-uppercase fw-bold"
                  style={{ fontSize: "1rem" }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => {
                return (
                  appointment.vin.includes(searchTrigger) && (
                    <tr key={appointment.id}>
                      <td
                        className="align-middle fw-bold px-3"
                        style={{ fontSize: "1rem" }}
                      >
                        {appointment.vin}
                      </td>
                      <td
                        className="align-middle px-3"
                        style={{ fontSize: "1rem" }}
                      >
                        {vins.indexOf(appointment.vin) > -1 && `YES`}
                        {!(vins.indexOf(appointment.vin) > -1) && `NO`}
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
                        {new Date(appointment.date_time).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
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
                      <td
                        className="align-middle px-3"
                        style={{ fontSize: "1rem" }}
                      >
                        {appointment.status}
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ServiceHistory;
