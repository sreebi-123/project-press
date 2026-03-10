import { useState, useEffect } from "react";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

function EmployeeLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
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
      setTouched({ email: true, password: true });
      return;
    }
    try {
      const res = await login(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login Successfully");

      // Role-based navigation
      switch (res.role) {
        case "designer":
          navigate("/designer");
          break;
        case "printing":
          navigate("/printing");
          break;
        case "production":
          navigate("/production");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error(" Registration failed.");
    }
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="min-w-sm bg-white p-6 rounded-xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="text-gray-700 space-y-5 text-sm"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Employee Login
          </h2>

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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {errorText("password")}
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 cursor-pointer rounded-full transition"
          >
            Login
          </button>
        </form>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}

export default EmployeeLogin;
