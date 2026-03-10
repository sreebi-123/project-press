import { useState } from "react";
import { useCreateOrderMutation } from "../slices/orderSlice.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sizeOptions = [
  "A4", "A5", "A3", "Letter", "Legal", "B5", "B4", "DL", "Postcard",
  "8.5x11", "11x17", "12x18", "13x19", "16x20", "18x24", "20x30"
];

const materialOptions = [
  "Glossy Paper", "Matte Paper", "Card Stock", "Vinyl", "Canvas", "Fabric",
  "PVC", "Foam Board", "Acrylic", "Aluminum", "Sticker Paper", "Kraft Paper",
  "Transparent Sheet", "Synthetic Paper", "Corrugated Board"
];

const WalkInOrderForm = () => {
  const [CreateOrder] = useCreateOrderMutation();

  const [formData, setFormData] = useState({
    walkInCustomer: {
      name: "",
      phone: "",
      email: "",
    },
    jobType: "",
    jobDetails: "",
    amount: "",
    deliveryDate: "",
    orderType: "design",
    specifications: {
      size: "",
      quantity: "",
      material: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "walkInCustomer.name":
        if (!value.trim()) return "Customer name is required.";
        break;
      case "walkInCustomer.phone":
        if (!value.trim()) return "Phone number is required.";
        if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits.";
        break;
      default:
        return null;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("walkInCustomer.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        walkInCustomer: {
          ...prev.walkInCustomer,
          [key]: value,
        },
      }));
    } else if (name.startsWith("specifications.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const fieldsToValidate = [
      "walkInCustomer.name",
      "walkInCustomer.phone",
    ];

    fieldsToValidate.forEach((field) => {
      const keys = field.split(".");
      let value = formData;
      for (let key of keys) value = value[key];
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(
        fieldsToValidate.reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      return;
    }

    try {
      const result = await CreateOrder(formData).unwrap();
      toast.success("🎉 Order Confirmed Successfully!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      setFormData({
        walkInCustomer: {
          name: "",
          phone: "",
          email: "",
        },
        jobType: "",
        jobDetails: "",
        amount: "",
        deliveryDate: "",
        orderType: "design",
        specifications: {
          size: "",
          quantity: "",
          material: "",
        },
      });
      setErrors({});
      setTouched({});
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create order");
    }
  };

  const renderError = (field) =>
    touched[field] && errors[field] && (
      <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">
        Walk-In Customer Order
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Name */}
        {/* Customer Name */}
        <div>
          <label className="block mb-1 font-medium">Customer Name</label>
          <input
            type="text"
            name="walkInCustomer.name"
            value={formData.walkInCustomer.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border p-2 rounded-lg ${touched["walkInCustomer.name"] && errors["walkInCustomer.name"]
              ? "border-red-500"
              : "border-gray-300"
              }`}
          />
          {renderError("walkInCustomer.name")}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            name="walkInCustomer.phone"
            value={formData.walkInCustomer.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border p-2 rounded-lg ${touched["walkInCustomer.phone"] && errors["walkInCustomer.phone"]
              ? "border-red-500"
              : "border-gray-300"
              }`}
          />
          {renderError("walkInCustomer.phone")}
        </div>


        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="walkInCustomer.email"
            value={formData.walkInCustomer.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Job Type}
        <div>
          <label className="block mb-1 font-medium">Job Type</label>
          <input
            type="text"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div> */}
        <div>
          <label className="block mb-1 font-medium">Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="">Select Job Type</option>
            <option value="Brochure">Brochure</option>
            <option value="Banner">Banner</option>
            <option value="Visiting Card">Visiting Card</option>
            <option value="Flyer">Flyer</option>
            <option value="Poster">Poster</option>
            <option value="Sticker">Sticker</option>
            <option value="Invitation">Invitation</option>
            <option value="Other">Other</option>
          </select>
        </div>


        {/* Amount */}
        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Delivery Date */}
        <div>
          <label className="block mb-1 font-medium">Delivery Date</label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Order Type */}
        <div>
          <label className="block mb-1 font-medium">Order Type</label>
          <select
            name="orderType"
            value={formData.orderType}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="design">Design Only</option>
            <option value="design_print">Design + Print</option>
            <option value="design_print_production">Design + Print + Production</option>
          </select>
        </div>

        {/* Specifications - Size */}
        <div>
          <label className="block mb-1 font-medium">Size</label>
          <select
            name="specifications.size"
            value={formData.specifications.size}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg max-h-40 overflow-y-scroll"
          >
            <option value="">Select Size</option>
            {sizeOptions.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Specifications - Quantity */}
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="specifications.quantity"
            value={formData.specifications.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Specifications - Material */}
        <div>
          <label className="block mb-1 font-medium">Material</label>
          <select
            name="specifications.material"
            value={formData.specifications.material}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg max-h-40 overflow-y-scroll"
          >
            <option value="">Select Material</option>
            {materialOptions.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Job Details */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Job Details</label>
          <textarea
            name="jobDetails"
            value={formData.jobDetails}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg h-28"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl text-lg hover:bg-blue-700 transition"
          >
            Submit Order
          </button>
        </div>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default WalkInOrderForm;
