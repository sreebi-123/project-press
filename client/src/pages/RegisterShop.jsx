import { useState, useEffect } from "react";
import { useShopRegisterMutation } from "../slices/shopSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSendOtpMutation } from "../slices/otpApiSlice.js";
import { VerifyOtp } from "../components/VerifyOtp.jsx";

function RegisterShop() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    whatsapp: "",
    address: "",
  });
  const [showOtp, setShowOtp] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const [ShopRegister] = useShopRegisterMutation();
  const [sendOtp] = useSendOtpMutation();

  const validate = () => {
    const newErrors = {};
    const { name, email, password, confirmPassword, phone, whatsapp, address } =
      form;

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Invalid email format";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!whatsapp) newErrors.whatsapp = "WhatsApp number is required";
    if (!address.trim()) newErrors.address = "Address is required";

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const pwdErrors = [];
      if (password.length < 8) pwdErrors.push("at least 8 characters");
      if (!/[a-z]/.test(password)) pwdErrors.push("a lowercase letter");
      if (!/[A-Z]/.test(password)) pwdErrors.push("an uppercase letter");
      if (!/\d/.test(password)) pwdErrors.push("a number");
      if (!/[@$!%*?&]/.test(password))
        pwdErrors.push("a special character (@$!%*?&)");
      if (pwdErrors.length > 0) {
        newErrors.password = "Password must include " + pwdErrors.join(", ");
      }
    }

    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      setErrors(validate());
    }
  }, [form, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        phone: true,
        whatsapp: true,
        address: true,
      });
      return;
    }

    try {
      const res = await ShopRegister({ ...form }).unwrap();
      console.log(res);

      await sendOtp({
        email: form.email,
        role: "admin",
      });
      setShowOtp(true);
    } catch (error) {
      console.log(error, "error");
      const backendMessage =
        error?.data?.message || error?.error || "❌ Failed to register shop!";

      toast.error(`❌ ${backendMessage}`, {
        position: "bottom-right",
        autoClose: 3000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // theme: "colored",
      });
    }
  };

  const handleOtpSuccess = () => {
    setShowOtp(false);
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      whatsapp: "",
      address: "",
    });
    toast.success("🎉 Shop registered successfully!");
    navigate("/thank-you");
  };

  const inputClass = (field) =>
    `w-full rounded-full border px-4 py-2.5 mt-1 transition ${
      errors[field] && touched[field]
        ? "border-red-500"
        : "border-gray-300 focus:border-indigo-500"
    }`;

  const errorText = (field) =>
    errors[field] && touched[field] ? (
      <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
    ) : null;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full mx-auto text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Register</h1>
        <p className="text-gray-500 text-sm mt-2 mb-4">
          Create your shop account
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("name")}
            />
            {errorText("name")}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("email")}
            />
            {errorText("email")}
          </div>

          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("phone")}
            />
            {errorText("phone")}
          </div>

          <div>
            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp"
              value={form.whatsapp}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("whatsapp")}
            />
            {errorText("whatsapp")}
          </div>

          <div className="md:col-span-2">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("address")}
            />
            {errorText("address")}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputClass("password")} pr-10`}
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </span>
              </div>
            </div>
            {errorText("password")}
          </div>

          {/* Confirm Password Field */}
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputClass("confirmPassword")} pr-10`}
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-gray-500 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </span>
              </div>
            </div>
            {errorText("confirmPassword")}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          Register
        </button>

        <p className="text-gray-500 text-sm mt-4 mb-10">
          Already have an account?{" "}
          <Link to="/login-shop" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
      {showOtp && (
        <VerifyOtp
          email={form.email}
          role="admin"
          onCancel={() => setShowOtp(false)}
          onSuccess={handleOtpSuccess}
        />
      )}
    </>
  );
}

export default RegisterShop;
