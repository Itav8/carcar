import React, { useEffect, useState } from "react";

function SalesList() {
  const [sales, setSales] = useState([]);

  const handleDelete = async (salesId) => {
    const url = `http://localhost:8090/api/sales/${salesId}/`;

    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setSales(sales.filter((sale) => sale.id !== salesId));
    }
  };

  useEffect(() => {
    const fetchSales = async () => {
      const salesList = await fetch("http://localhost:8090/api/sales/");

      if (salesList.ok) {
        const data = await salesList.json();
        setSales(data.sales);
      }
    };

    fetchSales();
  }, []);

  return (
    <>
      <h1>Sales</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson Employee ID</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, i) => {
            const salespersonName = `${sale.salesperson.first_name} ${sale.salesperson.last_name}`;
            const customerName = `${sale.customer.first_name} ${sale.customer.last_name}`;
            return (
              <tr key={i}>
                <td>{sale.salesperson.employee_id}</td>
                <td>{salespersonName}</td>
                <td>{customerName}</td>
                <td>{sale.automobile.vin}</td>
                {/* update price setup */}
                <td>${sale.price}</td>
                <td>
                  <button onClick={() => handleDelete(sale.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SalesList;
