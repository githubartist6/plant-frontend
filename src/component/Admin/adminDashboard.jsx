import React, { useState } from "react";
import "./CSS/adminDashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

const initialSalesData = [
  { date: "2025-06-01", purchase: 20, sales: 35 },
  { date: "2025-06-02", purchase: 25, sales: 45 },
  { date: "2025-06-03", purchase: 40, sales: 50 },
  { date: "2025-06-04", purchase: 30, sales: 42 },
];

const topProducts = [
  { name: "Aloe Vera", sales: 60 },
  { name: "Snake Plant", sales: 45 },
  { name: "Peace Lily", sales: 30 },
  { name: "Spider Plant", sales: 20 },
  { name: "Fern", sales: 10 },
];

const AdminDashboard = () => {
  const [selectedRange, setSelectedRange] = useState("week");
  const [salesData, setSalesData] = useState(initialSalesData);

  const handleRangeChange = (range) => {
    setSelectedRange(range);

    // Example: In real scenario, fetch data from API
    if (range === "week") {
      setSalesData(initialSalesData);
    } else if (range === "month") {
      setSalesData([
        { date: "2025-06-01", purchase: 20, sales: 35 },
        { date: "2025-06-05", purchase: 25, sales: 45 },
        { date: "2025-06-10", purchase: 40, sales: 60 },
        { date: "2025-06-15", purchase: 35, sales: 48 },
      ]);
    } else if (range === "year") {
      setSalesData([
        { date: "2025-01", purchase: 120, sales: 135 },
        { date: "2025-03", purchase: 180, sales: 160 },
        { date: "2025-06", purchase: 240, sales: 200 },
        { date: "2025-09", purchase: 160, sales: 210 },
      ]);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>PLANT DASHBOARD 🌱</h2>

      <div className="summary-cards">
        <div className="card green">
          <h3>PLANTS</h3>
          <p>249</p>
        </div>
        <div className="card lightgreen">
          <h3>CATEGORIES</h3>
          <p>25</p>
        </div>
        <div className="card olive">
          <h3>CUSTOMERS</h3>
          <p>1500</p>
        </div>
        <div className="card brown">
          <h3>ALERTS</h3>
          <p>56</p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={() => handleRangeChange("week")}>This Week</button>
        <button onClick={() => handleRangeChange("month")}>This Month</button>
        <button onClick={() => handleRangeChange("year")}>This Year</button>
        {/* Calendar input */}
        <input
          type="date"
          onChange={(e) =>
            setSalesData([
              {
                date: e.target.value,
                purchase: Math.floor(Math.random() * 50),
                sales: Math.floor(Math.random() * 70),
              },
            ])
          }
          style={{ marginLeft: "10px" }}
        />
      </div>

      <div className="charts-row">
        <div className="chart-box">
          <h4>Top 5 Plants</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#66bb6a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>Purchase & Sales - {selectedRange.toUpperCase()}</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="purchase" stroke="#8bc34a" />
              <Line type="monotone" dataKey="sales" stroke="#388e3c" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
