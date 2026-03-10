// testSendGrid.js
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sgMail
  .send({
    to: "sibilr1016@gmail.com",
    from: "printpress.scipy@gmail.com", // must be verified
    subject: "SendGrid Test",
    text: "This is a test message.",
  })
  .then(() => console.log("✅ Email sent"))
  .catch((error) =>
    console.error("❌ Error:", error.response?.body || error.message)
  );
