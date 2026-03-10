// src/pages/ShopDetails.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUnitByIdQuery } from "../slices/shopSlice";
import defaultProfile from "../assets/default-profile.png.png";

const ShopDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetUnitByIdQuery(id);
  const shop = data?.data;

  useEffect(() => {
    document.title = shop?.name
      ? `${shop.name} - Shop Details`
      : "Shop Details";
  }, [shop]);

  if (isLoading)
    return <div className="text-center mt-10">Loading shop details...</div>;
  if (error)
    return (
      <div className="text-center mt-10 text-red-600">
        Error loading shop details.
      </div>
    );
  if (!shop)
    return (
      <div className="text-center mt-10 text-gray-500">Shop not found.</div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-lg rounded-xl mt-10">
      <div className="flex flex-col items-center mb-6">
        <img
          src={
            shop.profilePic
              ? `http://localhost:3000/uploads/${shop.profilePic}`
              : defaultProfile
          }
          onError={(e) => (e.target.src = defaultProfile)}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow"
        />

        <h2 className="text-2xl font-bold text-gray-800 mt-4">{shop.name}</h2>
        <p className="text-gray-600">{shop.email}</p>
      </div>

      <div className="space-y-4">
        <Detail label="Phone" value={shop.phone} />
        <Detail label="WhatsApp" value={shop.whatsapp} />
        <Detail label="Address" value={shop.address} />
        <Detail label="Verified" value={shop.verified ? "Yes" : "No"} />
        <Detail label="Approved" value={shop.approval ? "Yes" : "No"} />
        <Detail label="Rejected" value={shop.rejected ? "Yes" : "No"} />
        <Detail
          label="Subscription"
          value={shop.subscription?.isPaid ? "Paid" : "Unpaid"}
        />
      </div>

      {shop.reviews && shop.reviews.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Customer Reviews:</h3>
          <ul className="space-y-2">
            {shop.reviews.map((review, idx) => (
              <li key={idx} className="border p-3 rounded-md bg-gray-50">
                <p className="font-semibold">{review.customerName}</p>
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-yellow-600 text-sm">
                  Rating: {review.rating}/5
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="text-gray-700 font-medium">{label}:</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

export default ShopDetails;
