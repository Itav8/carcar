import React, { useEffect, useState } from "react";
import Alert from "./Alert";

function SalespeopleList() {
  const [salespeople, setSalespeople] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleDelete = async (employeeId) => {
    const url = `http://localhost:8090/api/salespeople/${employeeId}/`;

    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setAlert(true);
      setAlertMessage("Successfully Deleted!");
      setSalespeople(
        salespeople.filter(
          (salesperson) => salesperson.employee_id !== employeeId
        )
      );
    } else {
      setAlert(true);
      setAlertMessage("Problem with delete, try again later.");
    }
  };

  useEffect(() => {
    const fetchSalespeople = async () => {
      const salespeopleList = await fetch(
        "http://localhost:8090/api/salespeople/"
      );

      if (salespeopleList.ok) {
        const data = await salespeopleList.json();
        setSalespeople(data.salespeople);
      }
    };

    fetchSalespeople();
  }, []);

  return (
    <>
      <h1>Salespeople</h1>
      <Alert alert={alert} message={alertMessage}>
        <></>
      </Alert>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th className="align-middle text-center">Delete?</th>
            </tr>
          </thead>
          <tbody>
            {salespeople.map((salesperson, i) => {
              return (
                <tr key={i}>
                  <td>{salesperson.employee_id}</td>
                  <td>{salesperson.first_name}</td>
                  <td>{salesperson.last_name}</td>
                  <td className="align-middle px-3 text-center">
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => handleDelete(salesperson.employee_id)}
                    >
                      Delete
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
}

export default SalespeopleList;
