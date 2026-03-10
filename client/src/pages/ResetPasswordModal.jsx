import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useChangePasswordMutation } from "../slices/changePasswordSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// You can pass `email` and `role` as props or fetch from Redux
const ResetPasswordForm = ({ email, role, onSuccess }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [touched, setTouched] = useState({});

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const validate = () => {
    const errors = {};
    const { newPassword } = formData;

    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else {
      const pwdErrors = [];
      if (newPassword.length < 10) pwdErrors.push("at least 10 characters");
      if (!/[a-z]/.test(newPassword)) pwdErrors.push("a lowercase letter");
      if (!/[A-Z]/.test(newPassword)) pwdErrors.push("an uppercase letter");
      if (!/\d/.test(newPassword)) pwdErrors.push("a number");
      if (!/[@$!%*?&]/.test(newPassword)) pwdErrors.push("a special character (@$!%*?&)");
      if (pwdErrors.length > 0) {
        errors.newPassword = "Password must include " + pwdErrors.join(", ");
      }
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      setFormError(validate());
    }
  }, [formData, touched]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      setTouched({ newPassword: true });
      return;
    }

    try {
      const payload = {
        ...formData,
        email,
        role,
      };

      const res = await changePassword(payload).unwrap();
      toast.success(res.message || "Password updated successfully");
      setFormData({ oldPassword: "", newPassword: "" });
      setFormError({});
      setTouched({});
      //  Close modal after success
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err?.data?.message || "Password update failed");
    }
  };



  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg max-w-md bg-white shadow-md"
    >
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>

      {/* Old Password */}
      <div className="mb-3 relative">
        <label htmlFor="oldPassword" className="block text-sm font-medium">
          Old Password
        </label>
        <input
          type={showOldPassword ? "text" : "password"}
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className="mt-1 w-full p-2 pr-10 border rounded"
          required
        />
        <button
          type="button"
          onClick={() => setShowOldPassword((prev) => !prev)}
          className="absolute right-3 top-9 text-gray-500 cursor-pointer"
        >
          {showOldPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* New Password */}
      <div className="mb-4 relative">
        <label htmlFor="newPassword" className="block text-sm font-medium">
          New Password
        </label>
        <input
          type={showNewPassword ? "text" : "password"}
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`mt-1 w-full p-2 pr-10 border rounded ${formError.newPassword && touched.newPassword ? "border-red-500" : ""
            }`}
          required
        />
        <button
          type="button"
          onClick={() => setShowNewPassword((prev) => !prev)}
          className="absolute right-3 top-9 text-gray-500 cursor-pointer"
        >
          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        {formError.newPassword && touched.newPassword && (
          <p className="text-xs text-red-500 mt-1">{formError.newPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;


