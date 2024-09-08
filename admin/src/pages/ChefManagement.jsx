import { useState, useEffect } from "react";
import axios from "axios";

const ChefManagement = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const chefsPerPage = 3;

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

  const handleToggleActive = async (chefId) => {
    try {
      await axios.put(`http://localhost:3000/api/chefs/${chefId}/toggle`);
      setChefs(chefs.map(chef =>
        chef._id === chefId ? { ...chef, isActive: !chef.isActive } : chef
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const indexOfLastChef = currentPage * chefsPerPage;
  const indexOfFirstChef = indexOfLastChef - chefsPerPage;
  const currentChefs = chefs.slice(indexOfFirstChef, indexOfLastChef);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#c98d83]">Chef Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f0e4e2]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4a4a4a] uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4a4a4a] uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4a4a4a] uppercase tracking-wider">Business Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4a4a4a] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentChefs.map((chef) => (
              <tr key={chef._id} className="hover:bg-[#f8f4f3] transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">{chef.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{chef.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{chef.businessName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleActive(chef._id)}
                    className={`px-3 py-1 rounded-full transition duration-200 ease-in-out ${
                      chef.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {chef.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(chefs.length / chefsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded-full transition duration-200 ease-in-out ${
                currentPage === i + 1 ? "bg-[#c98d83] text-white" : "bg-[#f0e4e2] text-[#4a4a4a] hover:bg-[#e0d4d2]"
              }`}
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
