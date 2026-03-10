

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useShoploginMutation } from "../slices/shopSlice";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

function ShopLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [ShopLogin, { isLoading }] = useShoploginMutation();

  const validate = () => {
    const newErrors = {};
    const { email, password } = form;

    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format";

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const pwdErrors = [];
      if (password.length < 8) pwdErrors.push("at least 8 characters");
      if (!/[a-z]/.test(password)) pwdErrors.push("a lowercase letter");
      if (!/[A-Z]/.test(password)) pwdErrors.push("an uppercase letter");
      if (!/\d/.test(password)) pwdErrors.push("a number");
      if (!/[@$!%*?&]/.test(password)) pwdErrors.push("a special character (@$!%*?&)");
      if (pwdErrors.length > 0) {
        newErrors.password = "Password must include " + pwdErrors.join(", ");
      }
    }

    return newErrors;
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      setError(validate());
    }
  }, [form, touched]);

  



  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      setTouched({ email: true, password: true });
      return;
    }

    try {
      const res = await ShopLogin(form).unwrap();
      dispatch(setCredentials(res.user));
      navigate(redirect);
    } catch (err) {
      console.log("Login error:", err);

      const backendErrors = err?.data?.errors || {};
      const message = err?.data?.message || "";

      if (backendErrors.approval) {
        setError("Your account is not approved yet. Please wait.");
      } else if (backendErrors.email) {
        setError("Email not found.");
      } else if (backendErrors.password) {
        setError("Incorrect password.");
      } else if (message.includes("not approved")) {
        setError("Your account is not approved yet. Please wait.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  // const inputClass = (field) =>
  //   `w-full rounded-full border px-4 py-2.5 mt-1 transition bg-transparent outline-none text-sm ${error[field] && touched[field]
  //     ? "border-red-500"
  //     : "border-gray-300 focus:border-indigo-500"
  //   }`;

  const errorText = (field) =>
    error[field] && touched[field] ? (
      <p className="text-xs text-red-500 mt-1">{error[field]}</p>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[384px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white mx-auto mt-10 shadow-md"
    >
      <h1 className="text-gray-900 text-3xl mt-10 font-medium">Shop Login</h1>
      <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>

      {typeof error === "string" && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

    <div className="w-full mt-6">
  <div className="relative flex items-center bg-white border h-12 rounded-full pl-6 pr-4 gap-2 border-gray-300/80">
    <FiMail className="text-gray-500" />
    <input
      type="email"
      name="email"
      placeholder="Email id"
      value={form.email}
      onChange={handleChange}
      onBlur={handleBlur}
      autoComplete="email"
      aria-label="Email"
      className="w-full bg-transparent outline-none text-sm"
    />
  </div>
  {errorText("email")}
</div>



 <div className="w-full mt-4">
  <div className="relative flex items-center bg-white border h-12 rounded-full pl-6 pr-12 gap-2 border-gray-300/80">
    <FiLock className="text-gray-500" />
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Password"
      value={form.password}
      onChange={handleChange}
      onBlur={handleBlur}
      autoComplete="current-password"
      aria-label="Password"
      className="w-full bg-transparent outline-none text-sm"
    />
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-4 text-gray-500"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <FiEyeOff /> : <FiEye />}
    </button>
  </div>
  {errorText("password")}
</div>





      <div className="mt-5 text-left text-indigo-500">
        <Link to="/forgot-password" className="text-sm hover:underline">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <p className="text-gray-500 text-sm mt-3 mb-11">
        Don’t have an account?{" "}
        <Link to="/register-shop" className="text-indigo-500 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default ShopLogin;

