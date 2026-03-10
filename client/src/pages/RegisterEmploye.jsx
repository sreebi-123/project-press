import { useState, useEffect } from "react";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast, ToastContainer } from "react-toastify";
import { VerifyOtp } from "../components/VerifyOtp";
import { useSendOtpMutation } from "../slices/otpApiSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// import {  useSearchParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../slices/authSlice";

function RegisterEmploye() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "designer",
  });
  const [showOtp, setShowOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const redirect = searchParams.get("redirect") || "/";
  const [register] = useRegisterMutation();
  const [sendOtp] = useSendOtpMutation();

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      setErrors(validate());
    }
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      });
      return;
    }

    try {
      // console.log(formData);
      await register(formData).unwrap();
      // console.log(res);

      await sendOtp({
        email: formData.email,
        role: "user",
      });
      // console.log(response);
      setShowOtp(true);
      setTouched({});
      setErrors({});

      // dispatch(setCredentials({ ...res }));
      // navigate(redirect);
    } catch (error) {
      console.error(error);
      toast.error(" Registration failed.");
    }
  };

  const handleOtpSuccess = () => {
    setShowOtp(false);
    toast.success(" Employee registered");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "designer",
    });
    navigate("/admin/staffs");
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

  // return (
  //   <div className="flex justify-center min-h-lvh">
  //     <form
  //       onSubmit={handleSubmit}
  //       className=" text-gray-700 text-sm space-y-4"
  //     >
  //       <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">
  //         Register Now
  //       </h2>

  //       <div>
  //         <input
  //           name="name"
  //           type="text"
  //           placeholder="Enter your name"
  //           value={formData.name}
  //           onChange={handleChange}
  //           onBlur={handleBlur}
  //           className={inputClass("name")}
  //         />
  //         {errorText("name")}
  //       </div>

  //       <div>
  //         <input
  //           name="email"
  //           type="email"
  //           placeholder="Enter your email"
  //           value={formData.email}
  //           onChange={handleChange}
  //           onBlur={handleBlur}
  //           className={inputClass("email")}
  //         />
  //         {errorText("email")}
  //       </div>

  //       <div>
  //         <input
  //           name="password"
  //           type="password"
  //           placeholder="Enter your password"
  //           value={formData.password}
  //           onChange={handleChange}
  //           onBlur={handleBlur}
  //           className={inputClass("password")}
  //         />
  //         {errorText("password")}
  //       </div>

  //       <div>
  //         <input
  //           name="confirmPassword"
  //           type="password"
  //           placeholder="Confirm your password"
  //           value={formData.confirmPassword}
  //           onChange={handleChange}
  //           onBlur={handleBlur}
  //           className={inputClass("confirmPassword")}
  //         />
  //         {errorText("confirmPassword")}
  //       </div>

  //       <div>
  //         <select
  //           name="role"
  //           value={formData.role}
  //           onChange={handleChange}
  //           className="w-full border border-gray-300 rounded-full py-2.5 px-4 mt-1"
  //         >
  //           <option value="designer">Designer</option>
  //           <option value="printing">Printing</option>
  //           <option value="production">Production</option>
  //         </select>
  //       </div>

  //       <button
  //         type="submit"
  //         className="w-full mt-4 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-full transition"
  //       >
  //         Register
  //       </button>
  //     </form>
  //     {showOtp && (
  //       <VerifyOtp
  //         email={formData.email}
  //         role="user"
  //         onCancel={() => setShowOtp(false)}
  //         onSuccess={handleOtpSuccess}
  //       />
  //     )}
  //     <ToastContainer position="bottom-right" />
  //   </div>
  // );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="text-gray-700 space-y-5 text-sm"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Register Now
          </h2>

          <div>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("name")}
            />
            {errorText("name")}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("email")}
            />
            {errorText("email")}
          </div>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("password") + " pr-10"}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errorText("password")}
          </div>

          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("confirmPassword") + " pr-10"}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errorText("confirmPassword")}
          </div>

          <div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full py-2.5 px-4 mt-1"
            >
              <option value="designer">Designer</option>
              <option value="printing">Printing</option>
              <option value="production">Production</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white py-2.5 rounded-full transition"
          >
            Register
          </button>
        </form>

        {showOtp && (
          <VerifyOtp
            email={formData.email}
            role="user"
            onCancel={() => setShowOtp(false)}
            onSuccess={handleOtpSuccess}
          />
        )}

        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}

export default RegisterEmploye;
