import { useState, useEffect } from "react";
import axios from "axios";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reports'); // Adjust the URL according to your backend setup
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="">
    <div className="  space-y-6">
      <h2 className="text-2xl  font-bold">Report Management</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold text-lg mb-4">User Reports</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Maker</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th> */}
            </tr>
          </thead>
          <tbody className="bg-white  divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report._id}>
                <td className="px-6 py-4 whitespace-nowrap">{report._id}</td>
                <td className="px-6 py-4">{report.reportDetails}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Reports;
