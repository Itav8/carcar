import React, { useEffect, useState } from "react";

function SalespeopleList() {
  const [salespeople, setSalespeople] = useState([]);

  useEffect(() => {
    const fetchSalespeople = async () => {
      const salespeopleList = await fetch(
        "http://localhost:8090/api/salespeople/"
      );

      if (salespeopleList.ok) {
        const data = await salespeopleList.json();
        console.log(data);
        setSalespeople(data.salespeople);
      }
    };

    fetchSalespeople();
  }, []);

  return (
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default SalespeopleList;
