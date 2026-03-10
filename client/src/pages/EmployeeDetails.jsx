import { useParams, useNavigate } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useDeleteUserMutation,
} from "../slices/usersApiSlice";
import { useGetEmployeeStatsQuery } from "../slices/orderSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const EmployeeDetails = () => {
  const { id } = useParams(); // get employee ID from route param
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const { data: user, isLoading: loadingUser, error } = useGetUserDetailsQuery(id);
  const { data: stats, isLoading: loadingStats } = useGetEmployeeStatsQuery(id);
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(id).unwrap();
      toast.success("Employee deleted successfully");
      navigate("/admin/staffs");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete employee");
    }
  };

  if (loadingUser || loadingStats) return <div>Loading...</div>;
  if (error)
    return (
      <div className="text-red-500">
        Error: {error?.data?.message || "Failed to load employee"}
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded-lg relative">
      <div className="flex items-center gap-6">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-500 text-sm capitalize">Role: {user?.role}</p>
          <p className="text-gray-500 text-sm">
            Joined on: {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Completed Orders</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center bg-blue-100 p-3 rounded">
            <p className="text-xl font-bold">{stats?.daily || 0}</p>
            <p className="text-sm">Today</p>
          </div>
          <div className="text-center bg-green-100 p-3 rounded">
            <p className="text-xl font-bold">{stats?.monthly || 0}</p>
            <p className="text-sm">This Month</p>
          </div>
          <div className="text-center bg-yellow-100 p-3 rounded">
            <p className="text-xl font-bold">{stats?.total || 0}</p>
            <p className="text-sm">Total</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowConfirm(true)}
        className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 cursor-pointer"
      >
        Delete Employee
      </button>

      {/* ✅ Custom Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
            <p className="text-lg font-medium mb-4">
              Are you sure you want to delete this employee?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
