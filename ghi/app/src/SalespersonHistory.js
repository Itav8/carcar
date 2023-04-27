import React, { useEffect, useState } from "react";
// add to prevent data being deleted for history when user delete a sale from SalesList
function SalespersonHistory() {
  const [salespeople, setSalespeople] = useState([]);
  const [salespersonSales, setSalespersonSales] = useState([]);

  useEffect(() => {
    const fetchSalespersonData = async () => {
      const url = "http://localhost:8090/api/salespeople/";
      const response = await fetch(url);

      if (response.ok) {
        const salespersonData = await response.json();
        setSalespeople(salespersonData.salespeople);
      }
    };

    const fetchSalespersonSalesData = async () => {
      const salesList = await fetch("http://localhost:8090/api/sales/");

      if (salesList.ok) {
        const data = await salesList.json();
        setSalespersonSales(data.sales);
      }
    };

    fetchSalespersonSalesData();
    fetchSalespersonData();
  }, []);

  const handleSelectPerson = async (e) => {
    const employeeId = e.target.value;

    if (employeeId) {
      const url = `http://localhost:8090/api/sales/`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        const filteredSales = data.sales.filter(
          (sale) => sale.salesperson.employee_id === employeeId
        );
        setSalespersonSales(filteredSales);
      }
    } else {
      setSalespersonSales([]);
    }
  };

  return (
    <>
      <h1>Salesperson History</h1>
      <div className="mb-3">
        <select
          onChange={handleSelectPerson}
          name="salesperson"
          id="salesperson"
          className="form-select"
        >
          <option value="">Choose an salesperson...</option>
          {salespeople.map((salesperson, i) => {
            return (
              <option key={i} value={salesperson.employee_id}>
                {salesperson.first_name} {salesperson.last_name}
              </option>
            );
          })}
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {salespersonSales.map((salespersonSale, i) => {
            const salespersonName = `${salespersonSale.salesperson.first_name} ${salespersonSale.salesperson.last_name}`;
            const customerName = `${salespersonSale.customer.first_name} ${salespersonSale.customer.last_name}`;
            return (
              <tr key={i}>
                <td>{salespersonName}</td>
                <td>{customerName}</td>
                <td>{salespersonSale.automobile.vin}</td>
                {/* update price setup */}
                <td>${salespersonSale.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SalespersonHistory;
