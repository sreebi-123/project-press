import { Router } from 'express';
import { addReview, getReviewsByShopId } from '../controller/reviewController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const reviewRouter = Router();

// ✅ Protected: Only logged-in users can add review
reviewRouter.route('/:printingUnitId').post(authenticateToken, addReview);

// ✅ Public: Anyone can see reviews
reviewRouter.route('/:printingUnitId').get(getReviewsByShopId);

export default reviewRouter;
