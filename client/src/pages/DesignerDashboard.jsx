import React, { useState } from "react";
import {
    useGetDesignerOrdersQuery,
    useUpdateDesignStatusMutation,
    useUploadDesignFileMutation,
} from "../slices/orderSlice";
import { useUpdateDesignerAvailabilityMutation } from "../slices/usersApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DesignerDashboard() {
    const [isAvailable, setIsAvailable] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadingOrderId, setUploadingOrderId] = useState(null);

    // RTK Query hooks
    const {
        data,
        isLoading: loadingOrders,
        refetch: refetchOrders,
    } = useGetDesignerOrdersQuery();
 console.log(data)
    const [updateDesignStatus] = useUpdateDesignStatusMutation();
    const [uploadDesignFile, { isLoading: uploading }] = useUploadDesignFileMutation();
    const [updateAvailability, { isLoading: isUpdatingAvailability }] =
        useUpdateDesignerAvailabilityMutation();

    const orders = data?.orders || [];

    // Toggle designer availability
    const toggleAvailability = async () => {
        try {
           const res = await updateAvailability({ isAvailable: !isAvailable }).unwrap();
           console.log(res)
        setIsAvailable((prev) => !prev);
        toast.success("Availability updated");
    } catch (error) {
        toast.error("Failed to update availability");
    }
};

// Start order
const startOrder = async (orderId) => {
    try {
        await updateDesignStatus({ id: orderId, status: "in_design" }).unwrap();
        refetchOrders();
        toast.success("Design work started");
    } catch (error) {
        toast.error(error.message || "Failed to start order");
    }
};

// Mark as complete
const markComplete = async (orderId) => {
    try {
        await updateDesignStatus({ id: orderId, status: "design_ready" }).unwrap();
        refetchOrders();
        setUploadingOrderId(orderId);
        toast.success("Design marked as ready");
    } catch (error) {
        toast.error(error.message || "Failed to complete design");
    }
};

// Upload design file
const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
};

const handleUpload = async (orderId) => {
    if (!uploadFile) {
        toast.error("Please select a file");
        return;
    }

    try {
        await uploadDesignFile({ id: orderId, file: uploadFile }).unwrap();
        toast.success("Design uploaded successfully");
        setUploadFile(null);
        setUploadingOrderId(null);
        refetchOrders();
    } catch (error) {
        toast.error("Upload failed");
    }
};

return (
    <div style={{ maxWidth: 900, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
        <ToastContainer position="top-right" autoClose={3000} />
        <h1>Designer Dashboard</h1>

        {/* Availability toggle */}
        <div style={{ marginBottom: 30 }}>
            <label>
                <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={toggleAvailability}
                    disabled={isUpdatingAvailability}
                />
                {" "}Available for work
            </label>
            {isUpdatingAvailability && <span style={{ marginLeft: 10 }}>Updating...</span>}
        </div>

        {/* Assigned orders */}
        <h2>Assigned Orders</h2>
        {loadingOrders ? (
            <p>Loading orders...</p>
        ) : orders.length === 0 ? (
            <p>No assigned orders.</p>
        ) : (
            orders.map((order) => (
                <div key={order._id} style={{ border: "1px solid #ccc", padding: 15, marginBottom: 15 }}>
                    <div><strong>Job Type:</strong> {order.jobType}</div>
                    <div><strong>Status:</strong> {order.status}</div>
                    <div><strong>Customer:</strong> {order.walkInCustomer?.name || order.onlineCustomer?.name || "N/A"}</div>
                    <div><strong>Specs:</strong> Size: {order.specifications?.size || "-"}, Quantity: {order.specifications?.quantity || "-"}, Material: {order.specifications?.material || "-"}</div>
                    <div><strong>Notes:</strong> {order.notes || "None"}</div>

                    {order.status === "pending_design" && (
                        <button onClick={() => startOrder(order._id)} style={{ marginTop: 10 }}>
                            Start
                        </button>
                    )}

                    {order.status === "in_design" && (
                        <button onClick={() => markComplete(order._id)} style={{ marginTop: 10 }}>
                            Mark as Complete
                        </button>
                    )}

                    {order.status === "design_ready" && uploadingOrderId === order._id && (
                        <div style={{ marginTop: 10 }}>
                            <input type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
                            <button
                                onClick={() => handleUpload(order._id)}
                                disabled={uploading || !uploadFile}
                                style={{ marginLeft: 10 }}
                            >
                                {uploading ? "Uploading..." : "Upload Design"}
                            </button>
                        </div>
                    )}
                </div>
            ))
        )}
    </div>
);
}
