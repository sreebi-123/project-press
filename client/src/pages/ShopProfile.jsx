import React, { useEffect, useState } from "react";
import { useShopProfileQuery, useUpdateAdminUnitMutation, useUploadShopProfilePicMutation, useDeleteOwnShopAccountMutation, useUploadShopLogoMutation } from "../slices/shopSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/default-profile.png.png";
import ResetPasswordForm from "./ResetPasswordModal.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";


const ShopProfile = () => {
  const { data, isLoading, error, refetch } = useShopProfileQuery();
  const [updateShop] = useUpdateAdminUnitMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    description: "",
    services: [],
  });
  const [profilePic, setProfilePic] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [newService, setNewService] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editServiceValue, setEditServiceValue] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [uploadShopProfilePic] = useUploadShopProfilePicMutation();
  const [deleteOwnShopAccount] = useDeleteOwnShopAccountMutation();
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [uploadShopLogo] = useUploadShopLogoMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const successNotify = (msg) => toast.success(msg, { position: "bottom-right" });
  const errorNotify = (msg) => toast.error(msg, { position: "bottom-right" });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        whatsapp: data.whatsapp || "",
        address: data.address || "",
        description: data.description || "",
        services: data.services || [],
      });
      if (data.profilePic) {
        setPreviewImage(`http://localhost:3000/uploads/${data.profilePic}?${Date.now()}`);
      }
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAddService = () => {
    const trimmed = newService.trim();
    if (trimmed && !formData.services.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, services: [...prev.services, trimmed] }));
    }
    setNewService("");
  };

  const handleEditService = (index) => {
    setEditIndex(index);
    setEditServiceValue(formData.services[index]);
  };

  const handleSaveEditedService = () => {
    const trimmed = editServiceValue.trim();
    const updated = [...formData.services];

    if (trimmed === "") {
      // If user saved with empty text, remove the service
      updated.splice(editIndex, 1);
    } else {
      updated[editIndex] = trimmed;
    }

    setFormData((prev) => ({ ...prev, services: updated }));
    setEditIndex(null);
    setEditServiceValue("");
  };


  const handleDeleteService = (index) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateShop(formData).unwrap();
      if (profilePic) {
        const formDataImg = new FormData();
        formDataImg.append("profilePic", profilePic);
        // await uploadShopProfilePic({ shopId: data._id, formData: formDataImg }).unwrap();
        const updatedPicData = await uploadShopProfilePic({ shopId: data._id, formData: formDataImg }).unwrap();
        dispatch(setCredentials(updatedPicData.data));  // <-- update Redux with new profilePic

      }
      if (logoFile) {
        const logoFormData = new FormData();
        logoFormData.append("logo", logoFile);
        // await uploadShopLogo({ shopId: data._id, formData: logoFormData }).unwrap();
        const updatedLogoData = await uploadShopLogo({ shopId: data._id, formData: logoFormData }).unwrap();
        dispatch(setCredentials(updatedLogoData.data));  // <-- update Redux with new logo
      }
      
      const updatedProfile = await refetch().unwrap(); // Fetch latest data
      dispatch(setCredentials(updatedProfile)); // Sync Redux + localStorage
      successNotify("Profile updated successfully");

    } catch (err) {
      errorNotify(err?.data?.message || "Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteOwnShopAccount(data._id).unwrap();
      successNotify("Account deleted successfully");
      dispatch(setCredentials(null));
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      errorNotify(err?.data?.message || "Error deleting account");
    }
  };


  if (isLoading) return <p className="text-center mt-10 font-medium">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10 font-medium">Error fetching profile</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-6 py-8 bg-white shadow-lg rounded-2xl">
      <ToastContainer position="bottom-right" />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Shop Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center">
          <img
            src={previewImage || defaultProfile}
            onError={(e) => (e.target.src = defaultProfile)}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow"
          />
          <label className="mt-3 text-sm font-medium text-gray-600">Change Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        {/* Shop Logo Section */}
        <div className="flex flex-col items-center">
          <img
            src={logoPreview || (data?.logo ? `http://localhost:3000/uploads/${data.logo}?${Date.now()}` : defaultProfile)}
            onError={(e) => (e.target.src = defaultProfile)}
            alt="Shop Logo"
            className="w-32 h-32 object-cover rounded shadow border-4 border-gray-200"
          />
          <label className="mt-3 text-sm font-medium text-gray-600">Upload Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setLogoFile(file);
                setLogoPreview(URL.createObjectURL(file));
              }
            }}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
          />
        </div>
      </div>



      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
        <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} type="email" />
        <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
        <InputField label="WhatsApp Number" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
        <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />
        {/* <InputField label="Shop Description" name="description" value={formData.description} onChange={handleChange} /> */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Shop Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-y"
            placeholder="Enter a detailed description about your shop"
          />
        </div>


        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Shop Services</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              // onKeyDown={(e) => e.key === "Enter" && handleAddService(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddService();
                }
              }}

              placeholder="Add new shop services.."
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              onClick={handleAddService}
              type="button"
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              Add
            </button>
          </div>
          <ul className="mt-3 space-y-2">
            {formData.services.map((service, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded-md">
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editServiceValue}
                      onChange={(e) => setEditServiceValue(e.target.value)}
                      className="mr-2 px-2 py-1 border rounded-md w-full"
                    />
                    <button onClick={handleSaveEditedService} className="text-green-600 mr-2 cursor-pointer">✔</button>
                  </>
                ) : (
                  <>
                    <span>{service}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditService(index)} type="button" className="text-blue-600 text-sm cursor-pointer">✏️</button>
                      <button onClick={() => handleDeleteService(index)} type="button" className="text-red-600 text-sm cursor-pointer">❌</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 flex flex-col gap-3 mt-6">
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition cursor-pointer">
            Update Profile
          </button>
          <button type="button" onClick={() => setShowDeleteModal(true)} className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition cursor-pointer">
            Delete My Account
          </button>
        </div>
      </form>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold text-red-600 mb-3 flex items-center">⚠️ Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete your account? This action <strong>cannot</strong> be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 cursor-pointer">Cancel</button>
              <button onClick={() => { setShowDeleteModal(false); handleDeleteAccount(); }} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}
      {/* 🔐 Reset Password Button */}
      <div className="mt-10 border-t pt-6 text-center">
        <button
          onClick={() => setShowResetPasswordModal(true)}
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition cursor-pointer"
        >
          Reset Password
        </button>
      </div>

      {/* 🔐 Reset Password Modal */}
      <AnimatePresence>
        {showResetPasswordModal && (
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-5 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 3 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setShowResetPasswordModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✖
              </button>
              <h3 className="text-xl font-bold mb-4 text-center">Reset Password</h3>
              <ResetPasswordForm email={data.email} role="admin" onSuccess={() => setShowResetPasswordModal(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />
  </div>
);

export default ShopProfile;
