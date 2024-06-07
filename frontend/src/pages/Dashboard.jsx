import React from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie,  XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { MdInsertChart } from 'react-icons/md';
import './dashboard.css'

const Dashboard = () => {
  // Sample data for the statistics graph
  const data = [
    { name: 'January', sales: 2400, visitors: 400, revenue: 24000 },
    { name: 'February', sales: 1300, visitors: 200, revenue: 18000 },
    { name: 'March', sales: 2800, visitors: 300, revenue: 22000 },
    { name: 'April', sales: 1500, visitors: 500, revenue: 26000 },
    { name: 'May', sales: 4000, visitors: 600, revenue: 32000 },
    { name: 'June', sales: 2500, visitors: 350, revenue: 28000 },
  ];
  const colors = ['#404A93', '#5DA5DA', '#FAA43A', '#60BD68', '#F17CB0', '#B2912F'];
  return (
    <div>
     <div className="dashboard-container">
     <div className="dashboard-content">
      <h1>Dashboard Page</h1>
      <div className="d-flex align-items-center">
        <MdInsertChart size={24} className="mr-2" />
        <h4>Statistics</h4>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" align="right" />
             {/* Map over data and create a Bar component for each data point, providing a different color for each bar */}
          {data.map((entry, index) => (
            <Bar key={index} dataKey="sales" fill={colors[index]} />
          ))}
          </BarChart>
        </div>
        <div className="col-md-6">
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" align="right" />
            <Line type="monotone" dataKey="visitors" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <AreaChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" align="right" />
            <Area type="monotone" dataKey="revenue" fill="#ffc658" stroke="#ffc658" />
          </AreaChart>
        </div>
        <div className="col-md-6">
          <PieChart width={500} height={300}>
            <Pie data={data} dataKey="sales" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" />
            <Tooltip />
            <Legend verticalAlign="top" align="right" />
          </PieChart>
        </div>
      </div>
    
      </div>
      </div>
    </div>
  );
};

export default Dashboard;

