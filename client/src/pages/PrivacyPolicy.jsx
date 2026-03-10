
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
      <p className="text-gray-700 mb-6">
        <strong>Last Updated:</strong> October 6, 2025
      </p>

      <p className="mb-4">
        PrintPress (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li><strong>Personal Information:</strong> Name, email, phone, and address.</li>
        <li><strong>Usage Information:</strong> IP address, browser type, device info, pages visited.</li>
        <li><strong>Payment Information:</strong> Billing details and transaction history.</li>
        <li><strong>Cookies and Tracking Data:</strong> Cookies and similar technologies.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Provide and maintain our services</li>
        <li>Process transactions and send related information</li>
        <li>Respond to inquiries and provide support</li>
        <li>Personalize experience and improve services</li>
        <li>Send promotional emails (with consent)</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
      <p className="mb-4 text-gray-700">
        We do <strong>not</strong> sell your personal information. We may share your information with service providers, payment processors, or authorities when legally required.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-4 text-gray-700">
        We implement reasonable measures to protect your data. However, no online system is completely secure.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Privacy Rights</h2>
      <p className="mb-4 text-gray-700">
        You can access, update, or delete your personal information and opt-out of marketing. Contact us at <strong>email@example.com</strong> to exercise your rights.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Cookies</h2>
      <p className="mb-4 text-gray-700">
        We use cookies to enhance your experience. You can disable them in your browser, but some features may not work properly.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Third-Party Links</h2>
      <p className="mb-4 text-gray-700">
        Our website may contain links to third-party websites. We are not responsible for their privacy practices.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Changes to This Privacy Policy</h2>
      <p className="mb-4 text-gray-700">
        We may update this policy occasionally. Continued use of our services constitutes acceptance of the updated policy.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">9. Contact Us</h2>
      <p className="text-gray-700">
        <strong>PrintPress</strong><br />
        Email: email@example.com<br />
        Phone: [Your Phone Number]<br />
        Address: [Your Company Address]
      </p>
    </motion.div>
  );
};

export default PrivacyPolicy;
