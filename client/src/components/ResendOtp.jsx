import { toast } from "react-toastify";
import { useResendOtpMutation } from "../slices/otpApiSlice";

export const ResendOtp = ({ email, role }) => {
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const handleResend = async () => {
    try {
      await resendOtp({ email, role }).unwrap();
      toast.success("OTP resent");
    } catch (err) {
      console.error("❌ Resend failed", err);
    }
  };

  return (
    <button
      onClick={handleResend}
      className="text-sm text-blue-600 mt-2 cursor-pointer"
      disabled={isResending}
    >
      {isResending ? "Resending..." : "Resend OTP"}
    </button>
  );
};
