import { useState } from "react";
import { useVerifyOtpMutation } from "../slices/otpApiSlice";
import { ResendOtp } from "./ResendOtp";
import { toast, ToastContainer } from "react-toastify";

export const VerifyOtp = ({ email, role, onCancel, onSuccess }) => {
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const handleVerify = async () => {
    try {
      const res = await verifyOtp({ email, otp, role }).unwrap();
      console.log(res);

      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (err) {
      console.log(err);
      const message = err?.data?.message || "OTP verification failed";
      toast.error(message);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50">
      <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[400px] w-[300px] border border-gray-300">
        <h2 className="text-gray-900 font-semibold mt-2 text-xl">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Enter the OTP sent to <span className="font-medium">{email}</span>
        </p>

        <input
          className="w-full border border-gray-300 rounded-md py-2 px-4 mt-4 text-center text-lg tracking-widest"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <div className="flex items-center justify-center gap-4 mt-6 w-full">
          <button
            className="w-full md:w-36 h-10 cursor-pointer rounded-md text-white bg-indigo-600 font-medium text-sm hover:bg-indigo-700 active:scale-95 transition"
            onClick={handleVerify}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
          <button
            onClick={onCancel}
            className="w-full md:w-36 h-10 cursor-pointer rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
          >
            Cancel
          </button>
        </div>

        <ResendOtp email={email} role={role} />
      </div>
    </div>
  );
};
