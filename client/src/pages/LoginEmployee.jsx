import { useState, useEffect } from "react";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
// import {  useSearchParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../slices/authSlice";

function LoginEmployee() {
  const [formData, setFormData] = useState({
    email: "superadmin@yourcompany.com",
    password: "supersecurepassword",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const redirect = searchParams.get("redirect") || "/";
  // const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const validate = () => {
    const newErrors = {};

    // if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    // else if (formData.password.length < 6)
    // newErrors.password = "Password must be at least 6 characters";

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
        // name: true,
        email: true,
        password: true,
      });
      return;
    }

    try {
      console.log(formData);
      const res = await login(formData).unwrap();
      console.log(res);

      dispatch(setCredentials({ ...res }));
      // navigate(redirect);
    } catch (error) {
      console.error(error);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-700 w-full max-w-sm mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10 space-y-4"
      >
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          Login
        </h2>

        {/* <div>
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
        </div> */}

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

        <div>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass("password")}
          />
          {errorText("password")}
        </div>

        {/* <div>
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
        </div> */}

        <button
          type="submit"
          className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-full transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginEmployee;
