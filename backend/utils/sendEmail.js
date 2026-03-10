import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, message) => {
  const msg = {
    to,
    from: "printpress.scipy@gmail.com", // ✅ must be verified in SendGrid
    subject: "Your OTP for PrintPress Registration",
    text: message,
    html: `<strong>${message}</strong>`,
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Email sent to", to);
  } catch (error) {
    console.error("❌ SendGrid Error:", error.response?.body || error.message);
    throw new Error("Failed to send OTP email");
  }
};

export default sendEmail;
