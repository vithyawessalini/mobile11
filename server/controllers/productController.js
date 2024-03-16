import productModel from "../models/productModel.js";
//  import categoryModel from "../models/categoryModel.js";
import categoryModel from "../models/categoryModel.js";
 import orderModel from "../models/orderModel.js";

 import fs from "fs";
 import slugify from "slugify";
 import braintree from "braintree";
 import dotenv from "dotenv";

 dotenv.config();

//payment gateway


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: 'xkg6ybm5jr7hs687',
  publicKey: 'bqwh6tvbq5xckm75',
  privateKey: '12cb6a74ffd944605cf7cb1faebe7105',
});



console.log("BRAINTREE_MERCHANT_ID:", process.env.BRAINTREE_MERCHANT_ID);
console.log("BRAINTREE_PUBLIC_KEY:", process.env.BRAINTREE_PUBLIC_KEY);
console.log("BRAINTREE_PRIVATE_KEY:", process.env.BRAINTREE_PRIVATE_KEY);

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
     const { photo } = req.files;
     //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !shipping:
        return res.status(500).send({ error: "Shipping is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// filters
export const productPriceFiltersController = async (req, res) => {
  try {
    const { checked, sortOrder } = req.body;

    // Determine min and max prices dynamically from the database
    const minMaxPrices = await productModel.aggregate([
      { $match: { category: { $in: checked } } },
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" }
        }
      }
    ]);

    // Extract minPrice and maxPrice from aggregation result
    const minPrice = minMaxPrices[0]?.minPrice || 0;
    const maxPrice = minMaxPrices[0]?.maxPrice || Number.MAX_VALUE;

    let query = { price: { $gte: minPrice, $lte: maxPrice } };
    // Add category filter if checked categories are provided
    if (checked && checked.length > 0) {
      query.category = { $in: checked };
    }
  
    let sortOptions = {};
    if (sortOrder === 'asc') {
      sortOptions.price = -1; // Sort in ascending order
    } else if (sortOrder === 'desc') {
      sortOptions.price = 1; // Sort in descending order
    }
  
    const products = await productModel.find(query).sort(sortOptions);
    // Limit the products to ensure they are only displayed up to the maximum price
    const limitedProducts = products.filter(product => product.price <= maxPrice);
    res.json({ success: true, products: limitedProducts, minPrice, maxPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
  };
  


// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

  // Controller to generate Razorpay order
  export const generateRazorpayOrder = async (req, res) => {
    try {
      const { amount } = req.body;
      // Create Razorpay order
      const razorpayOrder = await razorpay.orders.create({
        amount: amount,
        currency: "INR",
        payment_capture: 1, // Auto capture payment
      });
      res.status(200).json({ orderId: razorpayOrder.id });
    } catch (error) {
      console.error("Error generating Razorpay order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  // Controller to handle Razorpay payment


  export const handleRazorpayPayment = async (req, res) => {
    try {
      const { paymentId, orderId, amount } = req.body;
      // Verify Razorpay signature (recommended for security, but not shown here)
      
      // Process payment and save order to database
      // Example logic:
      const order = new orderModel({
        products: req.user.cart, // Assuming you have a user object with a cart field
        payment: { paymentId, orderId, amount }, // Save payment details
        buyer: req.user._id, // Assuming you have a user object with an _id field
      });
      await order.save();
      
      res.status(200).json({ success: true, message: "Payment success" });
    } catch (error) {
      console.error("Error processing Razorpay payment:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };

  export const storeOrder = async (req, res) => {
    try {
      const { cart } = req.body;
      // Create a new order instance
      const order = new orderModel({
        products: cart,
        // You can add other fields such as user ID, order status, etc.
      });
      // Save the order to the database
      await order.save();
      // Send success response
      res.status(200).json({ success: true, message: "Order stored successfully" });
    } catch (error) {
      console.error("Error storing order:", error);
      res.status(500).json({ success: false, message: "Error storing order" });
    }
  };
 