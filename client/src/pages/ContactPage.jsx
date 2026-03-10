import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us - Printing Press";
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your message has been sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex flex-col items-center">
      <Helmet>
  <title>Contact Printing Services | Printing Press Kerala</title>
  <meta
    name="description"
    content="Contact our printing press in Thiruvananthapuram for banners, brochures, business cards, and digital printing services."
  />
  <meta
    name="keywords"
    content="printing press kerala, printing services trivandrum, banner printing, brochure printing"
  />
  <meta property="og:title" content="Contact Printing Press Kerala" />
  <meta
    property="og:description"
    content="Reach out to our printing experts for high-quality printing services."
  />
</Helmet>
      <motion.div
        className="max-w-5xl w-full bg-white shadow-lg rounded-2xl p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
          Contact Us
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Have a question or need help with your printing requirements?  
          We’re here to help! Fill out the form or reach us directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Get in Touch
            </h2>
            <p className="text-gray-600">
              <strong>Address:</strong><br />
              XYZ Printing Press, MG Road, Thiruvananthapuram, Kerala - 695001
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> +91 98765****
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> contact@printingpress.com
            </p>
            <div className="flex space-x-4 pt-3">
              <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
              <a href="#" className="text-pink-500 hover:text-pink-700">Instagram</a>
              <a href="#" className="text-sky-500 hover:text-sky-700">Twitter</a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-6 rounded-xl shadow-inner space-y-4"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                placeholder="Type your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};


export default ContactPage;
