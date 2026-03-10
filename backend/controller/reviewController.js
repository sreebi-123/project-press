import { Review } from "../model/reviewSchema.js";
import { printingPressunit } from "../model/printingPressunit.js";

const addReview = async (req, res) => {
  try {
    const { comment, rating, name } = req.body;
    // console.log(name,comment, rating);
    const { printingUnitId } = req.params;

    console.log(req.user, "Addreview");

    // if (!req.user || req.user.role !== "onlinecustomer") {
    //   return res
    //     .status(403)
    //     .json({ message: "Only logged-in customers can post reviews" });
    // }
    console.log(name, comment, rating, printingUnitId, req.user.userId);
    const newReview = await Review.create({
      customer: req.user.userId,
      customerName: name,
      comment,
      rating,
      printingUnit: printingUnitId,
    });

    await printingPressunit.findByIdAndUpdate(printingUnitId, {
      $push: { reviews: newReview._id },
    });

    res.status(201).json(newReview);
  } catch (err) {
    console.error("Review error:", err);
    res
      .status(500)
      .json({ error: "Error creating review", details: err.message });
  }
};

const getReviewsByShopId = async (req, res) => {
  try {
    const { printingUnitId } = req.params;

    const reviews = await Review.find({ printingUnit: printingUnitId }).sort({
      createdAt: -1,
    });

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Fetch reviews error:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch reviews", details: err.message });
  }
};

export { addReview, getReviewsByShopId };
