import express from "express";
import { registerController,
loginController,
testController,
forgotPasswordController,
   updateProfileController,
   getOrdersController,
   getAllOrdersController,
   orderStatusController,
   registerAdminController,
   loginAdminController,
   forgotPasswordAdminController
} from "../controllers/authController.js";
import { feedbackController,updateReviewController } from "../controllers/feedbackController.js";
 import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//get products
router.put("/getreview", requireSignIn,updateReviewController);

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);
router.post("/registerAdmin", registerAdminController);
//routing
//RFeedback || METHOD POST
router.post("/feedback", feedbackController);

//LOGIN || POST
router.post("/login", loginController);
router.post("/loginAdmin", loginAdminController);
//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);
router.post("/forgot-passwordAdmin", forgotPasswordAdminController);
//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
