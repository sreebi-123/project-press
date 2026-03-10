import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useGetCustomerByIdQuery, useGetCustomerOrdersQuery, useGetCustomerReviewsQuery, useDeleteCustomerMutation } from "../slices/onlineSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";


const ViewCustomerProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const successNotify = (msg) => toast.success(msg, { position: "bottom-right" });
    const errorNotify = (msg) => toast.error(msg, { position: "bottom-right" });
    const { data, isLoading, error } = useGetCustomerByIdQuery(id);
    const { data: ordersData, isLoading: ordersLoading, error: ordersError, } = useGetCustomerOrdersQuery(id);
    const { data: reviewsData, isLoading: reviewsLoading, error: reviewsError, } = useGetCustomerReviewsQuery(id);
    const customer = data?.data;
    const orders = Array.isArray(ordersData) ? ordersData : ordersData?.orders || [];
    const reviews = Array.isArray(reviewsData) ? reviewsData : reviewsData?.reviews || [];
    const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();
    const [showConfirm, setShowConfirm] = useState(false);


    // Handle delete action
    const confirmDelete = async () => {
        try {
            await deleteCustomer(id).unwrap();
            successNotify("Customer deleted successfully");
            setShowConfirm(false);
            setTimeout(() => {
                navigate("/superadmin/customers-list");
            }, 1500);
        } catch (err) {
            console.error(err);
            errorNotify("Failed to delete customer");
            setShowConfirm(false);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto relative">
            <ToastContainer position="bottom-right" />
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Customer Profile</h2>
                <button
                    onClick={() => setShowConfirm(true)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 cursor-pointer"
                >
                    Delete Customer
                </button>
            </div>

            {isLoading ? (
                <p>Loading customer...</p>
            ) : error ? (
                <p className="text-red-500">Error loading customer profile</p>
            ) : (
                <div className="bg-white shadow p-4 rounded mb-6">
                    <p><strong>Name:</strong> {customer.name}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone:</strong> {customer.phone}</p>
                    <p><strong>WhatsApp:</strong> {customer.whatsapp}</p>
                    <p><strong>Address:</strong> {customer.address}</p>
                </div>
            )}

            {/* Orders Section */}
            <div className="bg-white shadow p-4 rounded mb-6">
                <h3 className="text-xl font-semibold mb-3">Orders Placed</h3>
                {ordersLoading ? (
                    <p>Loading orders...</p>
                ) : ordersError ? (
                    <p className="text-red-500">Error loading orders</p>
                ) : orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <ul className="space-y-2">
                        {orders.map((order) => (
                            <li key={order._id} className="border-b py-2">
                                <p><strong>Job Type:</strong> {order.jobType}</p>
                                <p><strong>Status:</strong> {order.status}</p>
                                <p><strong>Order Type:</strong> {order.orderType}</p>
                                <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Reviews Section */}
            <div className="bg-white shadow p-4 rounded">
                <h3 className="text-xl font-semibold mb-3">Reviews Given</h3>
                {reviewsLoading ? (
                    <p>Loading reviews...</p>
                ) : reviewsError ? (
                    <p className="text-red-500">Error loading reviews</p>
                ) : reviews.length === 0 ? (
                    <p>No reviews given yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {reviews.map((review) => (
                            <li key={review._id} className="border-b py-2">
                                <p><strong>Rating:</strong> ⭐ {review.rating}</p>
                                <p><strong>Comment:</strong> {review.comment}</p>
                                <p><strong>Printed At:</strong> {review.printingUnit?.name || "N/A"}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* AnimatePresence Delete Modal */}
            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        className="fixed inset-0 bg-white bg-opacity-40 z-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <h3 className="text-lg font-semibold mb-3 ">Confirm Deletion</h3>
                            <p className="mb-6">Are you sure you want to delete this customer?</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={isDeleting}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 cursor-pointer"
                                >
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ViewCustomerProfile;

