// import React, { useState } from "react";
// import { useCreateOrderMutation } from "../slices/orderSlice";
// import { toast } from "react-toastify";

// const OnlineCustomerOrderForm = () => {
//   const [jobType, setJobType] = useState("");
//   const [orderType, setOrderType] = useState("design");
//   const [size, setSize] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [material, setMaterial] = useState("");
//   const [notes, setNotes] = useState("");
//   const [designFile, setDesignFile] = useState(null);

//   const [createOrder, { isLoading }] = useCreateOrderMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!jobType || !size || !quantity || !material) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("jobType", jobType);
//     formData.append("orderType", orderType);
//     formData.append("specifications[size]", size);
//     formData.append("specifications[quantity]", quantity);
//     formData.append("specifications[material]", material);
//     formData.append("notes", notes);
//     if (designFile) {
//       formData.append("design", designFile); // Must match multer fieldname
//     }

//     try {
//       const res = await createOrder(formData).unwrap();
//       toast.success("Order submitted successfully");
//       console.log(res);
//     } catch (err) {
//       toast.error(err?.data?.message || "Order creation failed");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-xl font-semibold mb-4 text-indigo-600">Create Online Order</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="font-medium">Job Type *</label>
//           <input
//             type="text"
//             value={jobType}
//             onChange={(e) => setJobType(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="font-medium">Order Type *</label>
//           <select
//             value={orderType}
//             onChange={(e) => setOrderType(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           >
//             <option value="design">Design Only</option>
//             <option value="design_print">Design + Print</option>
//             <option value="design_print_production">Full (Design + Print + Production)</option>
//           </select>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="font-medium">Size *</label>
//             <input
//               type="text"
//               value={size}
//               onChange={(e) => setSize(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="font-medium">Quantity *</label>
//             <input
//               type="number"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="font-medium">Material *</label>
//           <input
//             type="text"
//             value={material}
//             onChange={(e) => setMaterial(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="font-medium">Additional Notes</label>
//           <textarea
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             rows={3}
//           />
//         </div>

//         <div>
//           <label className="font-medium">Upload Design File (optional)</label>
//           <input
//             type="file"
//             accept=".jpg,.jpeg,.png,.webp,.pdf,.zip,.psd,.ai"
//             onChange={(e) => setDesignFile(e.target.files[0])}
//             className="block mt-1"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//         >
//           {isLoading ? "Submitting..." : "Submit Order"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OnlineCustomerOrderForm;

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useCreateOrderMutation } from "../slices/orderSlice";
// import { toast } from "react-toastify";
// import store from "../store";

// const OnlineCustomerOrderForm = () => {
//   const { shopId } = useParams();
//   const state = store.getState();
//   const onlineCustomer = state.auth?.userInfo?.data?._id;

//   const [jobType, setJobType] = useState("");
//   const [orderType, setOrderType] = useState("design");
//   const [size, setSize] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [material, setMaterial] = useState("");
//   const [notes, setNotes] = useState("");
//   const [designFile, setDesignFile] = useState(null);

//   const [createOrder, { isLoading }] = useCreateOrderMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!jobType || !size || !quantity || !material) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("jobType", jobType);
//     formData.append("orderType", orderType);
//     formData.append("specifications[size]", size);
//     formData.append("specifications[quantity]", quantity);
//     formData.append("specifications[material]", material);
//     formData.append("notes", notes);
//     formData.append("shopId", shopId);
//     formData.append("onlineCustomer", onlineCustomer);
//     if (designFile) {
//       formData.append("design", designFile);
//     }

//     try {
//       await createOrder(formData).unwrap();
//       toast.success("✅ Order submitted successfully");

//       // Reset form
//       setJobType("");
//       setOrderType("design");
//       setSize("");
//       setQuantity("");
//       setMaterial("");
//       setNotes("");
//       setDesignFile(null);
//     } catch (err) {
//       console.error("❌ Order creation failed:", err);
//       toast.error(err?.data?.message || "Order creation failed");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
//       <h2 className="text-xl font-semibold mb-4 text-indigo-600">Create Online Order</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="font-medium">Job Type *</label>
//           <input
//             type="text"
//             value={jobType}
//             onChange={(e) => setJobType(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="font-medium">Order Type *</label>
//           <select
//             value={orderType}
//             onChange={(e) => setOrderType(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           >
//             <option value="design">Design Only</option>
//             <option value="design_print">Design + Print</option>
//             <option value="design_print_production">Design + Print + Production</option>
//           </select>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="font-medium">Size *</label>
//             <input
//               type="text"
//               value={size}
//               onChange={(e) => setSize(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="font-medium">Quantity *</label>
//             <input
//               type="number"
//               min="1"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="font-medium">Material *</label>
//           <input
//             type="text"
//             value={material}
//             onChange={(e) => setMaterial(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="font-medium">Additional Notes</label>
//           <textarea
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//             rows={3}
//           />
//         </div>

//         <div>
//           <label className="font-medium">Upload Design File (optional)</label>
//           <input
//             type="file"
//             accept=".jpg,.jpeg,.png,.webp,.pdf,.zip,.psd,.ai"
//             onChange={(e) => setDesignFile(e.target.files[0])}
//             className="block mt-1"
//           />
//           {designFile && (
//             <p className="text-sm text-gray-600 mt-1">Selected: {designFile.name}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
//         >
//           {isLoading ? "Submitting..." : "Submit Order"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OnlineCustomerOrderForm;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const OnlineCustomerOrderForm = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(shopId)
  
  // Get auth state from Redux with multiple fallback paths
  const onlineCustomer = useSelector(state => state.auth.userInfo.data._id);
  // const {data} = userInfo
    // console.log(data)
  // console.log(userInfo)
  
  // Extract customer ID with multiple fallback paths
  // const onlineCustomer = userInfo?.data?._id 
  // console.log(onlineCustomer)

  // Form state
  const [jobType, setJobType] = useState("");
  const [orderType, setOrderType] = useState("design");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [material, setMaterial] = useState("");
  const [notes, setNotes] = useState("");
  const [designFile, setDesignFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createOrder, { isLoading, error, reset }] = useCreateOrderMutation();

  // Authentication check on component mount

  // useEffect(() => {
  //   console.log('🔍 Authentication Debug:', {
  //     hasToken: !!token,
  //     hasUserInfo: !!userInfo,
  //     onlineCustomer,
  //     userRole: userInfo?.data?.role || userInfo?.role,
  //     shopId,
  //     fullAuthState: authState,
  //     localStorage: localStorage.getItem('customerAuth')
  //   });

    // Redirect if not authenticated
    /*
    if (!token || !onlineCustomer) {
      console.warn("⚠️ Authentication missing, redirecting to login");
      toast.warn("Please login to create an order");
      navigate("/customer/login", { replace: true });
      return;
    }
*/
    // Check if user is online customer

    // const userRole = userInfo?.data?.role || userInfo?.role;
    // if (userRole !== "online-customer") {
    //   console.warn("⚠️ User is not an online customer:", userRole);
    //   toast.error("Access denied. Online customer account required.");
    //   navigate("/", { replace: true });
    //   return;
    // }

    // Validate shopId

  //   if (!shopId) {
  //     console.error("❌ No shopId in URL parameters");
  //     toast.error("Invalid shop. Please try again.");
  //     navigate("/", { replace: true });
  //   }
  // }, [token, userInfo, onlineCustomer, shopId, navigate]);

  // Handle API errors
  // useEffect(() => {
  //   if (error) {
  //     console.error("❌ Order API Error:", error);
      
      // Handle authentication errors
      
      // if (error.status === 401 || error.data?.isAuthError || error.data?.message?.includes('token')) {
      //   toast.error("Session expired. Please login again.");
      //   dispatch({ type: 'auth/logout' });
      //   navigate("/customer/login", { replace: true });
      //   return;
      // }
      
      // Handle validation errors
      // if (error.status === 400) {
      //   const message = error.data?.message || "Please check your input and try again.";
      //   toast.error(message);
      //   return;
      // }
      
      // Handle server errors
      // if (error.status >= 500) {
      //   toast.error("Server error. Please try again later.");
      //   return;
      // }
      
      // Handle other errors
  //     const errorMessage = error.data?.message || "Order creation failed. Please try again.";
  //     toast.error(errorMessage);
  //   }
  // }, [error, dispatch, navigate]);

  // Reset error when form changes
  // useEffect(() => {
  //   if (error) {
  //     reset();
  //   }
  // }, [jobType, orderType, size, quantity, material, notes, designFile, reset]);

  // Form validation
  // const validateForm = () => {
  //   const errors = [];
    
  //   if (!jobType.trim()) errors.push("Job Type is required");
  //   if (!size.trim()) errors.push("Size is required");
  //   if (!quantity || quantity < 1) errors.push("Valid quantity is required");
  //   if (!material.trim()) errors.push("Material is required");
    
    // File validation
    // if (designFile) {
    //   const allowedTypes = ['.jpg', '.jpeg', '.png', '.webp', '.pdf', '.zip', '.psd', '.ai'];
    //   const fileExtension = '.' + designFile.name.split('.').pop().toLowerCase();
      
    //   if (!allowedTypes.includes(fileExtension)) {
    //     errors.push("Invalid file type. Please upload JPG, PNG, PDF, ZIP, PSD, or AI files.");
    //   }
      
      // 10MB limit
  //     if (designFile.size > 10 * 1024 * 1024) {
  //       errors.push("File size must be less than 10MB.");
  //     }
  //   }
    
  //   return errors;
  // };
// ✅ Form validation function
const validateForm = () => {
  const errors = [];

  if (!jobType.trim()) errors.push("Job Type is required");
  if (!size.trim()) errors.push("Size is required");
  if (!quantity || quantity < 1) errors.push("Valid quantity is required");
  if (!material.trim()) errors.push("Material is required");

  // Optional: file validation
  if (designFile) {
    const allowedTypes = [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "pdf",
      "zip",
      "psd",
      "ai"
    ];
    const fileExtension = designFile.name.split(".").pop().toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      errors.push(
        "Invalid file type. Please upload JPG, PNG, PDF, ZIP, PSD, or AI files."
      );
    }

    if (designFile.size > 10 * 1024 * 1024) {
      errors.push("File size must be less than 10MB.");
    }
  }

  return errors;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting || isLoading) {
      return;
    }

    console.log('📝 Form submission started');

    // Final authentication check
    if ( !onlineCustomer) {
      toast.error("Authentication required. Please login again.");
      navigate("/online");
      return;
    }

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error));
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData();
      
      
      
      // Add form fields
      formData.append("jobType", jobType.trim());
      formData.append("orderType", orderType);
      formData.append("specifications[size]", size.trim());
      formData.append("specifications[quantity]", quantity.toString());
      formData.append("specifications[material]", material.trim());
      formData.append("notes", notes.trim());
      formData.append("shopId", shopId);
      formData.append("onlineCustomer", onlineCustomer);
      
      // Add design file if present
      if (designFile) {
        formData.append("design", designFile);
      }

      // Debug log (remove in production)
      console.log("📤 Submitting order:", {
        jobType: jobType.trim(),
        orderType,
        size: size.trim(),
        quantity: parseInt(quantity),
        material: material.trim(),
        notes: notes.trim(),
        shopId,
        onlineCustomer,
        hasDesignFile: !!designFile,
        designFileName: designFile?.name,
        formDataEntries: Array.from(formData.entries()).map(([key, value]) => 
          key === 'design' ? [key, `File: ${value.name}`] : [key, value]
        )
      });


      // Submit the order
      const result = await createOrder(formData).unwrap();
      
      console.log("✅ Order created successfully:", result);
      toast.success("🎉 Order submitted successfully! You will be notified when design is ready.");

      // Reset form
      resetForm();
      
      // Optional: Navigate to orders page or order details
      // navigate(`/customer/orders`);
      // navigate(`/customer/order/${result.order._id}`);
      
    } catch (err) {
      console.error("❌ Order submission failed:", err);
      
      // Additional error handling for unwrap() rejections
      if (!err.status) {
        toast.error("Network error. Please check your connection and try again.");
      }
      // Other errors are handled by the useEffect above
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setJobType("");
    setOrderType("design");
    setSize("");
    setQuantity("");
    setMaterial("");
    setNotes("");
    setDesignFile(null);
    
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Show loading screen if authentication is being checked
  // if (!token || !onlineCustomer) {
  //   return (
  //     <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
  //         <p className="text-gray-600">Checking authentication...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-2">Create New Order</h2>
        <p className="text-gray-600 text-sm">Fill in the details below to submit your design order</p>
      </div>
      
      {/* Debug info - only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-3 bg-gray-100 rounded text-xs font-mono">
          <strong>Debug Info:</strong><br />
          Customer: {onlineCustomer}<br />
          Shop: {shopId}<br />
          {/* Token: {token ? '✅ Present' : '❌ Missing'} */}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Job Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Business Cards, Flyers, Banners, Posters"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Describe what type of design/print job you need</p>
        </div>

        {/* Order Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Order Type <span className="text-red-500">*</span>
          </label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="design">Design Only</option>
            <option value="design_print">Design + Print</option>
            <option value="design_print_production">Design + Print + Production</option>
          </select>
        </div>

        {/* Size and Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Size <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g., A4, 8.5x11, 24x36"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              max="10000"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="100"
              required
            />
          </div>
        </div>

        {/* Material */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Material <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Glossy Paper, Matte Paper, Vinyl, Canvas, Card Stock"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Specify the material you want for your print job</p>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={4}
            placeholder="Any special requirements, color preferences, deadlines, or specific instructions for the designer..."
          />
          <p className="text-xs text-gray-500 mt-1">Optional: Provide any additional details that will help us create the perfect design</p>
        </div>

        {/* Design File Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Design File (Optional)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-400 transition-colors">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.pdf,.zip,.psd,.ai"
                    onChange={(e) => setDesignFile(e.target.files[0])}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                JPG, PNG, PDF, ZIP, PSD, AI up to 10MB
              </p>
            </div>
          </div>
          
          {designFile && (
            <div className="mt-3 p-3 bg-indigo-50 rounded-md">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-sm text-indigo-700 font-medium">{designFile.name}</span>
                <button
                  type="button"
                  onClick={() => setDesignFile(null)}
                  className="ml-auto text-indigo-400 hover:text-indigo-600"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-indigo-600 mt-1">
                Size: {(designFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
            isLoading || isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          {isLoading || isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting Order...
            </>
          ) : (
            'Submit Order'
          )}
        </button>
      </form>
      
      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">What happens next?</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Your order will be assigned to an available designer</li>
                <li>You'll receive updates on the design progress</li>
                <li>Once complete, you'll be notified to review and approve</li>
                <li>Billing details will be provided after design approval</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineCustomerOrderForm; 