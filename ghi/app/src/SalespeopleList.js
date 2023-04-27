import React, { useEffect, useState } from "react";

function SalespeopleList() {
  const [salespeople, setSalespeople] = useState([]);

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
      setSalespeople(salespeople.filter((salesperson) => salesperson.employee_id !== employeeId));
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
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {salespeople.map((salesperson, i) => {
            return (
              <tr key={i}>
                <td>{salesperson.employee_id}</td>
                <td>{salesperson.first_name}</td>
                <td>{salesperson.last_name}</td>
                <td>
                  <button onClick={() => handleDelete(salesperson.employee_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SalespeopleList;
