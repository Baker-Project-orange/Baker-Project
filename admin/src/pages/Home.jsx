import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { name: "Jan", users: 400, sales: 2400 },
  { name: "Feb", users: 300, sales: 1398 },
  { name: "Mar", users: 200, sales: 9800 },
  { name: "Apr", users: 278, sales: 3908 },
  { name: "May", users: 189, sales: 4800 },
  { name: "Jun", users: 239, sales: 3800 },
];

const Home = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDishes, setTotalDishes] = useState(0);
  const [chefAmount, setChefAmount] = useState(0); // New state for chef amount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, dishesResponse, chefAmountResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/users/total'),
          axios.get('http://localhost:3000/api/dishes/total'),
          axios.get('http://localhost:3000/api/orders/orders/chefamount') // Fetch chef amount
        ]);
        setTotalUsers(usersResponse.data.totalUsers);
        setTotalDishes(dishesResponse.data.totalDishes);
        setChefAmount(chefAmountResponse.data.totalChefAmount); // Set the chef amount from response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6  p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-black">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Users", value: totalUsers },
          { title: "Total Dishes", value: totalDishes },
          { title: "Total Amount", value: `$${chefAmount}` },
        ].map((item, index) => (
          <div key={index} className="bg-[#b67c73] p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-black">{item.title}</h3>
            <p className="text-3xl font-bold text-black">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#ffffff] p-4 rounded-lg shadow">
        <h3 className="font-semibold text-lg mb-4 text-black">User Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="black" />
            <XAxis dataKey="name" stroke="black" />
            <YAxis yAxisId="left" orientation="left" stroke="black" />
            <Tooltip
              contentStyle={{ backgroundColor: "#b67c73", color: "#ffffff" }}
            />
            <Legend wrapperStyle={{ color: "black" }} />
            <Bar
              yAxisId="left"
              dataKey="users"
              fill=" #b67c73"
              name="New Users"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home;

