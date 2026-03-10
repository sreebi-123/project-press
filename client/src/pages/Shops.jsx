import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUnitByIdQuery } from '../slices/shopSlice';
import ReviewsSection from '../components/ReviewsSection';
import store from "../store.js"

const Shops = () => {
  const navigate = useNavigate();
  const state = store.getState()
  // const userName = state.auth?.userInfo?.data?.name
  const userInfo = state.auth?.userInfo;
  const userName = userInfo?.data?.name;
  const userRole = userInfo?.data?.role;

  console.log(userName)
  console.log(state)
  console.log(userRole)
  const { shopId } = useParams();
  console.log(shopId)
  const { data: shopDetails, isLoading, isError } = useGetUnitByIdQuery(shopId);
  const shopData = shopDetails?.data;
  console.log(shopData)
  if (isLoading) return <div className="p-4">Loading shop info...</div>;
  if (isError || !shopData) return <div className="p-4 text-red-500">Shop not found.</div>;
  const handleCreateOrder = () => {
    if (!userInfo || userRole !== "onlinecustomer") {
      navigate("/login-customer"); // Redirect if not logged in as online customer
    } else {
      navigate(`/online`);
      navigate(`/online/${shopId}`); // Navigate to order form
    }
  };
  return (
    <div className="relative min-h-screen pb-24 p-4 bg-gray-100 space-y-6 w-200">
      {/* Shop Image */}
      <div className="w-full h-60 sm:h-80 md:h-96 lg:h-[-24rem] bg-gray-200 rounded-xl overflow-hidden shadow">
        <img
          src={
            shopData.profilePic
              ? `http://localhost:3000/uploads/${shopData.profilePic}`
              : 'https://placehold.co/1200x400?text=No+Image'
          }
          alt={shopData.name || 'Shop'}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Shop Info */}
      <div className="max-w-5xl mx-auto mt-6 bg-white p-4 rounded-xl shadow space-y-3">
        <h2 className="text-2xl font-bold">{shopData.name || 'Unnamed Shop'}</h2>
        <p className="text-gray-600">📍 {shopData.address || 'Location not provided'}</p>
        <p className="text-gray-600">📞 {shopData.phone || 'Phone not available'}</p>
        <p className="text-gray-600">📧 {shopData.email || 'Email not available'}</p>
        <p className="text-gray-600">📝 {shopData.description || 'No description available'}</p> {/* ✅ DESCRIPTION */}
      </div>

      {/* Services */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">🛠 Services Offered</h3>
        {shopData.services && shopData.services.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {shopData.services.map((service, idx) => (
              <li key={idx}>{service}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No services listed.</p>
        )}
      </div>


      {/* Reviews */}
      <ReviewsSection shopId={shopId} userName={userName} />

      {/* Create Order Button */}
      <button
        onClick={handleCreateOrder}
        className="bottom-6 right-6 px-5 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
      >
        Create Order
      </button>
    </div>
  );
};

export default Shops;
