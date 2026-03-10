import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddReviewToShopMutation,
  useGetReviewsByShopIdQuery,
} from "../slices/shopSlice";

const ReviewsSection = ({ shopId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [addReviewToShop] = useAddReviewToShopMutation();
  const {
    data: reviews = [],
    refetch,
    isLoading,
    isError,
  } = useGetReviewsByShopIdQuery(shopId);

  const userInfo = useSelector((state) => state.auth?.userInfo);
  const name = userInfo?.data?.name;
  const handleSubmit = async () => {
    if (!userInfo) {
      alert("You must be logged in to leave a review.");
      return;
    }

    if (!rating || !comment.trim()) {
      alert("Please provide both rating and comment!");
      return;
    }

    try {
      await addReviewToShop({
        printingUnitId: shopId,
        rating,
        comment,
        name,
      }).unwrap();

      setRating(0);
      setComment("");
      refetch();
    } catch (err) {
      console.error("Error adding review:", err);
      alert("Something went wrong while submitting your review.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4 mt-4">
      <h3 className="text-xl font-semibold mb-2">⭐ Customer Reviews</h3>

      {/* Review List */}
      {isLoading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : isError ? (
        <p className="text-red-500">Error loading reviews.</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map((review, idx) => (
          <div key={idx} className="border-b pb-2">
            <div className="flex justify-between items-center">
              <p className="font-medium">
                {review.customerName || "Anonymous"}
              </p>
              <div className="text-yellow-500 text-sm">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))
      )}

      {/* Review Form (Only for logged-in users) */}
      {userInfo ? (
        <div className="pt-4 border-t">
          <p className="font-medium mb-1">Your Rating:</p>
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-2xl cursor-pointer ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            className="w-full p-2 border rounded mb-3"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Review
          </button>
        </div>
      ) : (
        <p className="text-gray-500 italic mt-4">Login to leave a review.</p>
      )}
    </div>
  );
};

export default ReviewsSection;
