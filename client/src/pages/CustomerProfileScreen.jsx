// import React, { useEffect, useState } from "react";
// import { useCustomerProfileQuery, useUpdateCustomerMutation } from "../slices/onlineSlice";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import defaultProfile from "../assets/default-profile.png";
// import { motion, AnimatePresence } from "framer-motion";
// import ResetPasswordForm from "./ResetPasswordModal";
// import { setCredentials } from "../slices/authSlice";
// import { useDispatch } from "react-redux";



// const CustomerProfileScreen = () => {
//   const { data, isLoading, error, refetch } = useCustomerProfileQuery();
//   const [updateCustomer] = useUpdateCustomerMutation();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     whatsapp: "",
//     address: "",
//   });
//   const [profilePic, setProfilePic] = useState(null);
//   const [previewImage, setPreviewImage] = useState("");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();


//   const successNotify = (msg) =>
//     toast.success(msg, { position: "bottom-right" });
//   const errorNotify = (msg) =>
//     toast.error(msg, { position: "bottom-right" });

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   useEffect(() => {
//     if (data) {
//       setFormData({
//         name: data.name || "",
//         email: data.email || "",
//         phone: data.phone || "",
//         whatsapp: data.whatsapp || "",
//         address: data.address || "",
//       });
//       if (data.profilePic) {
//         setPreviewImage(
//           `http://localhost:3000/uploads/${data.profilePic}?${Date.now()}`);
//       }
//     }
//   }, [data]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   //for uploading profile pic
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePic(file);
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await updateCustomer(formData).unwrap();
//       dispatch(setCredentials(res)); // 🧠 Sync Redux + localStorage
//       if (profilePic) {
//         const formDataImg = new FormData();
//         formDataImg.append("profilePic", profilePic);

//         //   await fetch(`/api/v1/onlineCustomer/upload-profilepic/${data._id}`, {
//         //     method: "PUT",
//         //     body: formDataImg,
//         //     credentials: "include",
//         //   });
//         //   if (!uploadRes.ok) throw new Error("Failed to upload profile picture");

//         //   const updatedProfile = await uploadRes.json();
//         //   dispatch(setCredentials(updatedProfile));
//         // }
//         const uploadRes = await fetch(`/api/v1/onlineCustomer/upload-profilepic/${data._id}`, {
//           method: "PUT",
//           body: formDataImg,
//           credentials: "include",
//         });

//         if (!uploadRes.ok) throw new Error("Failed to upload profile picture");

//         const updatedProfile = await uploadRes.json();
//         dispatch(setCredentials(updatedProfile));
//       }
//       successNotify("Profile updated successfully");
//       refetch();
//     } catch (err) {
//       errorNotify(err?.data?.message || "Failed to update profile");
//     }
//   };

//   //for deleting account
//   const confirmDelete = async () => {
//     try {
//       const response = await fetch(`/api/v1/onlineCustomer/deleteCustomer/${data._id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (!response.ok) throw new Error("Failed to delete account");

//       successNotify("Account deleted successfully");
//       setShowDeleteModal(false);
//       dispatch(setCredentials(null));
//       setTimeout(() => navigate("/"), 1000);
//     } catch (err) {
//       errorNotify(err.message || "Error deleting account");
//     }
//   };

//   if (isLoading)
//     return <p className="text-center mt-10 font-medium">Loading...</p>;
//   if (error)
//     return (
//       <p className="text-red-500 text-center mt-10 font-medium">
//         Error fetching profile
//       </p>
//     );

//   return (
//     <div className="max-w-2xl mx-auto mt-10 px-6 py-8 bg-white shadow-lg rounded-2xl">
//       <ToastContainer position="bottom-right" />
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Customer Profile
//       </h2>

//       {/* Profile Picture Section */}
//       <div className="flex flex-col items-center mb-6">
//         <img
//           src={previewImage || defaultProfile}
//           onError={(e) => (e.target.src = defaultProfile)}
//           alt="Profile"
//           className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow"
//         />
//         <label className="mt-3 text-sm font-medium text-gray-600">
//           Change Profile Picture
//         </label>
//         <input
//           type="file"
//           name="profilePic"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4
//                      file:rounded-full file:border-0 file:text-sm file:font-semibold
//                      file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
//         />
//       </div>

//       {/* Profile Form */}
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <InputField
//             label="Full Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <InputField
//             label="Email Address"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             type="email"
//           />
//           <InputField
//             label="Phone Number"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           <InputField
//             label="WhatsApp Number"
//             name="whatsapp"
//             value={formData.whatsapp}
//             onChange={handleChange}
//           />
//           <div className="md:col-span-2">
//             <InputField
//               label="Address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition cursor-pointer"
//         >
//           Update Profile
//         </button>

//         <button
//           type="button"
//           onClick={() => setShowDeleteModal(true)}
//           className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition cursor-pointer"
//         >
//           Delete My Account
//         </button>
//       </form>


//       {/* 🔐 Reset Password Button */}
//       <div className="mt-10 border-t pt-6 text-center">
//         <button
//           onClick={() => setShowResetPasswordModal(true)}
//           className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition cursor-pointer"
//         >
//           Reset Password
//         </button>
//       </div>

//       {/* 🔐 Reset Password Modal */}
//       <AnimatePresence>
//         {showResetPasswordModal && (
//           <motion.div
//             className="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <button
//                 onClick={() => setShowResetPasswordModal(false)}
//                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer "
//               >
//                 ✖
//               </button >
//               <h3 className="text-xl font-bold mb-4 text-center">Reset Password</h3>
//               <ResetPasswordForm email={data.email} role="customer" onSuccess={() => setShowResetPasswordModal(false)}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>



//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {showDeleteModal && (
//           <motion.div
//             className="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <h3 className="text-lg font-semibold mb-4">Confirm Account Deletion</h3>
//               <p className="text-sm text-gray-600 mb-6">
//                 Are you sure you want to delete your account? This action cannot be undone.
//               </p>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={confirmDelete}
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };


// // Reusable Input Field Component
// const InputField = ({ label, name, value, onChange, type = "text" }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <input
//       name={name}
//       type={type}
//       value={value}
//       onChange={onChange}
//       required
//       className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//     />
//   </div>
// );

// export default CustomerProfileScreen;





// import React, { useEffect, useState } from "react";
// import { useCustomerProfileQuery, useUpdateCustomerMutation } from "../slices/onlineSlice";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import defaultProfile from "../assets/default-profile.png.png";
// import { motion, AnimatePresence } from "framer-motion";
// import ResetPasswordForm from "./ResetPasswordModal";
// import { setCredentials } from "../slices/authSlice";
// import { useDispatch } from "react-redux";

// const CustomerProfileScreen = () => {
//   const { data, isLoading, error, refetch } = useCustomerProfileQuery();
//   const [updateCustomer] = useUpdateCustomerMutation();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     whatsapp: "",
//     address: "",
//   });
//   const [profilePic, setProfilePic] = useState(null);
//   const [previewImage, setPreviewImage] = useState("");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
//   const [errors, setErrors] = useState({});

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const successNotify = (msg) =>
//     toast.success(msg, { position: "bottom-right" });
//   const errorNotify = (msg) =>
//     toast.error(msg, { position: "bottom-right" });

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   useEffect(() => {
//     if (data) {
//       setFormData({
//         name: data.name || "",
//         email: data.email || "",
//         phone: data.phone || "",
//         whatsapp: data.whatsapp || "",
//         address: data.address || "",
//       });
//       if (data.profilePic) {
//         setPreviewImage(
//           `http://localhost:3000/uploads/${data.profilePic}?${Date.now()}`
//         );
//       }
//     }
//   }, [data]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Validate form fields
//   const validateForm = () => {
//     const newErrors = {};

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email || !emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     const phoneRegex = /^\d{10}$/;
//     if (!formData.phone || !phoneRegex.test(formData.phone)) {
//       newErrors.phone = "Please enter a valid 10-digit phone number";
//     }

//     if (formData.whatsapp && !phoneRegex.test(formData.whatsapp)) {
//       newErrors.whatsapp = "Please enter a valid 10-digit WhatsApp number";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle profile picture change
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePic(file);
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const res = await updateCustomer(formData).unwrap();
//       dispatch(setCredentials(res));

//       if (profilePic) {
//         const formDataImg = new FormData();
//         formDataImg.append("profilePic", profilePic);

//         const uploadRes = await fetch(
//           `/api/v1/onlineCustomer/upload-profilepic/${data._id}`,
//           {
//             method: "PUT",
//             body: formDataImg,
//             credentials: "include",
//           }
//         );

//         if (!uploadRes.ok) throw new Error("Failed to upload profile picture");

//         const updatedProfile = await uploadRes.json();
//         dispatch(setCredentials(updatedProfile));
//       }

//       successNotify("Profile updated successfully");
//       refetch();
//     } catch (err) {
//       errorNotify(err?.data?.message || "Failed to update profile");
//     }
//   };

//   // Delete account
//   const confirmDelete = async () => {
//     try {
//       const response = await fetch(
//         `/api/v1/onlineCustomer/deleteCustomer/${data._id}`,
//         {
//           method: "DELETE",
//           credentials: "include",
//         }
//       );

//       if (!response.ok) throw new Error("Failed to delete account");

//       successNotify("Account deleted successfully");
//       setShowDeleteModal(false);
//       dispatch(setCredentials(null));
//       setTimeout(() => navigate("/"), 1000);
//     } catch (err) {
//       errorNotify(err.message || "Error deleting account");
//     }
//   };

//   if (isLoading)
//     return <p className="text-center mt-10 font-medium">Loading...</p>;
//   if (error)
//     return (
//       <p className="text-red-500 text-center mt-10 font-medium">
//         Error fetching profile
//       </p>
//     );

//   return (
//     <div className="max-w-2xl mx-auto mt-10 px-6 py-8 bg-white shadow-lg rounded-2xl">
//       <ToastContainer position="bottom-right" />
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Customer Profile
//       </h2>

//       {/* Profile Picture */}
//       <div className="flex flex-col items-center mb-6">
//         <img
//           src={previewImage || defaultProfile}
//           onError={(e) => (e.target.src = defaultProfile)}
//           alt="Profile"
//           className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow"
//         />
//         <label className="mt-3 text-sm font-medium text-gray-600">
//           Change Profile Picture
//         </label>
//         <input
//           type="file"
//           name="profilePic"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4
//                      file:rounded-full file:border-0 file:text-sm file:font-semibold
//                      file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
//         />
//       </div>

//       {/* Profile Form */}
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <InputField
//             label="Full Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             error={errors.name}
//           />
//           <InputField
//             label="Email Address"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             type="email"
//             error={errors.email}
//           />
//           <InputField
//             label="Phone Number"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             error={errors.phone}
//           />
//           <InputField
//             label="WhatsApp Number"
//             name="whatsapp"
//             value={formData.whatsapp}
//             onChange={handleChange}
//             error={errors.whatsapp}
//           />
//           <div className="md:col-span-2">
//             <InputField
//               label="Address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               error={errors.address}
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition cursor-pointer"
//         >
//           Update Profile
//         </button>

//         <button
//           type="button"
//           onClick={() => setShowDeleteModal(true)}
//           className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition cursor-pointer"
//         >
//           Delete My Account
//         </button>
//       </form>

//       {/* Reset Password */}
//       <div className="mt-10 border-t pt-6 text-center">
//         <button
//           onClick={() => setShowResetPasswordModal(true)}
//           className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition cursor-pointer"
//         >
//           Reset Password
//         </button>
//       </div>

//       {/* Reset Password Modal */}
//       <AnimatePresence>
//         {showResetPasswordModal && (
//           <motion.div
//             className="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <button
//                 onClick={() => setShowResetPasswordModal(false)}
//                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer "
//               >
//                 ✖
//               </button>
//               <h3 className="text-xl font-bold mb-4 text-center">Reset Password</h3>
//               <ResetPasswordForm
//                 email={data.email}
//                 role="customer"
//                 onSuccess={() => setShowResetPasswordModal(false)}
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {showDeleteModal && (
//           <motion.div
//             className="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <h3 className="text-lg font-semibold mb-4">Confirm Account Deletion</h3>
//               <p className="text-sm text-gray-600 mb-6">
//                 Are you sure you want to delete your account? This action cannot be undone.
//               </p>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={confirmDelete}
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// // Reusable Input Field Component
// const InputField = ({ label, name, value, onChange, type = "text", error }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//     <input
//       name={name}
//       type={type}
//       value={value}
//       onChange={onChange}
//       required
//       className={`w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 transition
//         ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"}`}
//     />
//     {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//   </div>
// );

// export default CustomerProfileScreen;





import React, { useEffect, useState } from "react";
import {
  useCustomerProfileQuery,
  useUpdateCustomerMutation,
} from "../slices/onlineSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/default-profile.png.png";
import { motion, AnimatePresence } from "framer-motion";
import ResetPasswordForm from "./ResetPasswordModal";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";

const CustomerProfileScreen = () => {
  const { data, isLoading, error, refetch } = useCustomerProfileQuery();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const successNotify = (msg) =>
    toast.success(msg, { position: "bottom-right" });
  const errorNotify = (msg) =>
    toast.error(msg, { position: "bottom-right" });

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
      });
      if (data.profilePic) {
        setPreviewImage(
          `http://localhost:3000/uploads/${data.profilePic}?${Date.now()}`
        );
      }
    }
  }, [data]);

  // Improved email and phone regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{10}$/;

  // Live validation when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live validation
    if (name === "email") {
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }

    if (name === "phone") {
      if (!phoneRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phone: "Please enter a valid 10-digit phone number",
        }));
      } else {
        setErrors((prev) => ({ ...prev, phone: undefined }));
      }
    }

    if (name === "whatsapp") {
      if (value && !phoneRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          whatsapp: "Please enter a valid 10-digit WhatsApp number",
        }));
      } else {
        setErrors((prev) => ({ ...prev, whatsapp: undefined }));
      }
    }
  };

  // Validate form fields before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (formData.whatsapp && !phoneRegex.test(formData.whatsapp)) {
      newErrors.whatsapp = "Please enter a valid 10-digit WhatsApp number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await updateCustomer(formData).unwrap();
      dispatch(setCredentials(res));

      if (profilePic) {
        const formDataImg = new FormData();
        formDataImg.append("profilePic", profilePic);

        const uploadRes = await fetch(
          `/api/v1/onlineCustomer/upload-profilepic/${data._id}`,
          {
            method: "PUT",
            body: formDataImg,
            credentials: "include",
          }
        );

        if (!uploadRes.ok) throw new Error("Failed to upload profile picture");

        const updatedProfile = await uploadRes.json();
        dispatch(setCredentials(updatedProfile));
      }

      successNotify("Profile updated successfully");
      refetch();
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to update profile");
    }
  };

  // Delete account
  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `/api/v1/onlineCustomer/deleteCustomer/${data._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to delete account");

      successNotify("Account deleted successfully");
      setShowDeleteModal(false);
      dispatch(setCredentials(null));
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      errorNotify(err.message || "Error deleting account");
    }
  };

  if (isLoading)
    return <p className="text-center mt-10 font-medium">Loading...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10 font-medium">
        Error fetching profile
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 px-6 py-8 bg-white shadow-lg rounded-2xl">
      <ToastContainer position="bottom-right" />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Customer Profile
      </h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={previewImage || defaultProfile}
          onError={(e) => (e.target.src = defaultProfile)}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow"
        />
        <label className="mt-3 text-sm font-medium text-gray-600">
          Change Profile Picture
        </label>
        <input
          type="file"
          name="profilePic"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4
                     file:rounded-full file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <InputField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            error={errors.email}
          />
          <InputField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <InputField
            label="WhatsApp Number"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            error={errors.whatsapp}
          />
          <div className="md:col-span-2">
            <InputField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition cursor-pointer"
        >
          Update Profile
        </button>

        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition cursor-pointer"
        >
          Delete My Account
        </button>
      </form>

      {/* Reset Password */}
      <div className="mt-10 border-t pt-6 text-center">
        <button
          onClick={() => setShowResetPasswordModal(true)}
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition cursor-pointer"
        >
          Reset Password
        </button>
      </div>

      {/* Reset Password Modal */}
      <AnimatePresence>
        {showResetPasswordModal && (
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setShowResetPasswordModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer "
              >
                ✖
              </button>
              <h3 className="text-xl font-bold mb-4 text-center">
                Reset Password
              </h3>
              <ResetPasswordForm
                email={data.email}
                role="customer"
                onSuccess={() => setShowResetPasswordModal(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4">
                Confirm Account Deletion
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, type = "text", error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className={`w-full border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 transition
        ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-400"
        }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default CustomerProfileScreen;


