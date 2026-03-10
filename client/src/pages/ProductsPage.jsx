import { useEffect } from "react";
import { motion } from "framer-motion";

const products = [
    {
        id: 1,
        name: "Business Cards",
        description: "High-quality business cards with custom designs and finishes.",
        image: "/uploads/business-cards.jpg",
    },
    {
        id: 2,
        name: "Posters",
        description: "Vibrant posters printed on premium paper with matte or glossy options.",
        image: "/uploads/poster.jpg",
    },
    {
        id: 3,
        name: "Flyers & Brochures",
        description: "Promote your business with attractive flyers and folded brochures.",
        image: "/uploads/flyer.jpg",
    },

    {
        id: 4,
        name: "Wedding Invitations",
        description: "Elegant invitation cards with luxury printing and paper textures.",
        image: "/uploads/invitation.jpg",
    },
    {
        id: 5,
        name: "Stickers & Labels",
        description: "Durable stickers and labels for branding, packaging, or personal use.",
        image: "/uploads/sticker.jpg",
    },
];

const ProductsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Our Products - Printing Press";
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <motion.h1
                className="text-4xl font-bold text-center text-blue-700 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Our Products
            </motion.h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                We offer a wide range of professional printing services and products — from business essentials to custom creations. Explore our selection below.
            </p>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-52 object-cover"
                            onError={(e) => (e.target.src = "/no-image.png")} // Place no-image.png in public folder
                        />

                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                            <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
                            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                                View Details
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
