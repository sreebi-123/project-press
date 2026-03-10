import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useCustomerLoginMutation } from "../slices/onlineSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [login] = useCustomerLoginMutation();

  // ✅ Real-time validation
  useEffect(() => {
    let passwordIssues = [];

    if (!password) {
      passwordIssues.push("Password is required.");
    } else {
      if (password.length < 8) {
        passwordIssues.push("at least 8 characters");
      }
      if (!/[A-Z]/.test(password)) {
        passwordIssues.push("an uppercase letter");
      }
      if (!/[0-9]/.test(password)) {
        passwordIssues.push("a number");
      }
      if (!/[@$!%*?&]/.test(password)) {
        passwordIssues.push("a special character (@$!%*?&)");
      }
    }

    if (!email) {
      setEmailError("Email is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email.");
    } else {
      setEmailError("");
    }

    if (password && passwordIssues.length > 0) {
      setPasswordError("Password must include " + passwordIssues.join(", ") + ".");
    } else {
      setPasswordError("");
    }
  }, [email, password]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (emailError || passwordError) {
    toast.error("Please fix all errors before submitting.");
    return;
  }

  try {
    const res = await login({ email, password }).unwrap();

    // ✅ Store correct user data in Redux + localStorage
    dispatch(setCredentials({...res}));

    toast.success(res.message || "Login successful");

    setTimeout(() => {
      navigate(redirect);
    }, 1500);
  } catch (err) {
    const errorData = err?.data;

    if (errorData?.email) {
      toast.error(errorData.email);
    } else if (errorData?.password) {
      toast.error(errorData.password);
    } else if (errorData?.message) {
      toast.error(errorData.message);
    } else {
      toast.error("Login failed. Please try again.");
    }
  }
};


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full text-center border border-gray-200 rounded-2xl px-8 bg-white mx-auto mt-10 shadow-md"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-semibold">Login</h1>
        <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>

        {/* Email Field */}
        <div className="flex flex-col items-start w-full mt-10">
          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col items-start w-full mt-4">
          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              {showPassword ? (
                // 👁️ Eye Open Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.458 12C3.732 7.943 7.522 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                // 🚫 Eye Closed Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3l18 18M10.477 10.477A3 3 0 0113.5 13.5M16.727 16.727C15.07 18.081 13.075 18.885 11 19c-4.478 0-8.268-2.943-9.542-7a9.957 9.957 0 012.073-3.302M9.88 9.88a3 3 0 004.24 4.24"
                  />
                </svg>
              )}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="mt-5 text-left text-indigo-500">
          <a className="text-sm hover:underline" href="#">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-3 w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition duration-200 ease-in-out cursor-pointer"
        >
          Login
        </button>

        {/* Sign up link */}
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Don't have an account?{" "}
          <Link
            to="/register-customer"
            className="text-indigo-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>

      {/* Toast container */}
      <ToastContainer position="bottom-right" autoClose={2500} />
    </>
  );
}

export default CustomerLogin;
