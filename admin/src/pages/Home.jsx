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
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [totalDishes, setTotalDishes] = useState(0); // State for total dishes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse,  dishesResponse] = await Promise.all([   //recipesResponse,
          axios.get('http://localhost:3000/api/users/total'),
          axios.get('http://localhost:3000/api/dishes/total') // Fetch total dishes
          // axios.get('http://localhost:3000/api/recipes/total'),
        ]);
        setTotalUsers(usersResponse.data.totalUsers);
        // setTotalRecipes(recipesResponse.data.totalRecipes);
        setTotalDishes(dishesResponse.data.totalDishes); // Set total dishes
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Total Users</h3>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Total Recipes</h3>
          <p className="text-3xl font-bold">{totalRecipes}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Total Dishes</h3>
          <p className="text-3xl font-bold">{totalDishes}</p> {/* Display total dishes */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Total Sales</h3>
          <p className="text-3xl font-bold">$12,345</p>
        </div>
        {/* <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg">Pending Reviews</h3>
          <p className="text-3xl font-bold">89</p>
        </div> */}
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold text-lg mb-4">User Activity and Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="users" fill="#8884d8" name="New Users" />
            <Bar
              yAxisId="right"
              dataKey="sales"
              fill="#82ca9d"
              name="Sales ($)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home;








// where total users work
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const mockData = [
//   { name: "Jan", users: 400, sales: 2400 },
//   { name: "Feb", users: 300, sales: 1398 },
//   { name: "Mar", users: 200, sales: 9800 },
//   { name: "Apr", users: 278, sales: 3908 },
//   { name: "May", users: 189, sales: 4800 },
//   { name: "Jun", users: 239, sales: 3800 },
// ];

// const Home = () => {
//   const [totalUsers, setTotalUsers] = useState(0);

//   useEffect(() => {
//     const fetchTotalUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/users/total');
//         setTotalUsers(response.data.totalUsers);
//       } catch (error) {
//         console.error('Error fetching total users:', error);
//       }
//     };

//     fetchTotalUsers();
//   }, []);

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">Dashboard Overview</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="font-semibold text-lg">Total Users</h3>
//           <p className="text-3xl font-bold">{totalUsers}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="font-semibold text-lg">Total Recipes</h3>
//           <p className="text-3xl font-bold">567</p>

//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="font-semibold text-lg">Total Dishes</h3>
//           <p className="text-3xl font-bold">567</p>
          
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="font-semibold text-lg">Total Sales</h3>
//           <p className="text-3xl font-bold">$12,345</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="font-semibold text-lg">Pending Reviews</h3>
//           <p className="text-3xl font-bold">89</p>
//         </div>
//       </div>
//       <div className="bg-white p-4 rounded-lg shadow">
//         <h3 className="font-semibold text-lg mb-4">User Activity and Sales</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={mockData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
//             <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
//             <Tooltip />
//             <Legend />
//             <Bar yAxisId="left" dataKey="users" fill="#8884d8" name="New Users" />
//             <Bar
//               yAxisId="right"
//               dataKey="sales"
//               fill="#82ca9d"
//               name="Sales ($)"
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Home;