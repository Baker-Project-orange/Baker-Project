import { useState, useEffect } from "react";
import axios from "axios";

const ChefManagement = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const chefsPerPage = 3; // Number of chefs to show per page

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/chefs");
        setChefs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  const indexOfLastChef = currentPage * chefsPerPage;
  const indexOfFirstChef = indexOfLastChef - chefsPerPage;
  const currentChefs = chefs.slice(indexOfFirstChef, indexOfLastChef);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const toggleChefStatus = async (chefId, currentStatus) => {
//     try {
//       await axios.put(`http://localhost:3001/api/chefs/chefs/${chefId}/toggle-active`);
//       setChefs(chefs.map(chef =>
//         chef._id === chefId ? { ...chef, isActive: !currentStatus } : chef
//       ));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chef Management</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold text-lg mb-4">Registered Chefs</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentChefs.map((chef) => (
              <tr key={chef._id}>
                <td className="px-6 py-4 whitespace-nowrap">{chef.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{chef.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{chef.businessName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* <button className="text-blue-600 hover:text-blue-900 mr-2">
                    Edit Details
                  </button> */}
                  {/* <button
                    className={`text-${chef.isActive ? 'red' : 'green'}-600 hover:text-${chef.isActive ? 'red' : 'green'}-900`}
                    onClick={() => toggleChefStatus(chef._id, chef.isActive)}
                  >
                    {chef.isActive ? 'Deactivate' : 'Activate'}
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(chefs.length / chefsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 border ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"
              } rounded-full`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChefManagement;
