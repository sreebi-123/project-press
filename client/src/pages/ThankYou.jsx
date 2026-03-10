import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-156 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white border border-gray-200 p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-extrabold text-indigo-600 mb-4">
          Registration Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Your account has been created and is currently pending approval by an
          admin. You will receive an email once your account is activated.
        </p>
        <Link
          to="/login-shop"
          className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-xl transition duration-300"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
