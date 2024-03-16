import express from "express";
import {
   brainTreePaymentController,
   braintreeTokenController,
   createProductController,
   deleteProductController,
   getProductController,
   getSingleProductController,
   productCountController,
   productCategoryController,
   productFiltersController,
  productListController,
   productPhotoController,
   realtedProductController,
   searchProductController,
   updateProductController,
   generateRazorpayOrder, 
   handleRazorpayPayment ,
   storeOrder,
   productPriceFiltersController,
 } from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
 const router = express.Router();

//routes
router.post(
  "/create-product",
  // requireSignIn,
  // isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  // requireSignIn,
  // isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product


//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments  
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);
// Routes
router.post("/razorpay/order", generateRazorpayOrder);
router.post("/razorpay/payment", requireSignIn, handleRazorpayPayment);
router.post("/store-order", storeOrder);

router.post("/product-filters", productFiltersController);
router.post("/product-filters-price", productPriceFiltersController);

export default router;