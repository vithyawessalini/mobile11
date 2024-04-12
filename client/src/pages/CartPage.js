import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
<<<<<<< HEAD
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import { BASE_URL } from "../config";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const userName = auth?.user?.name;
  
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * quantity; // Consider quantity for total price calculation
      });
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItemQuantity = (pid, quantity) => {
    try {
      const updatedCart = cart.map((item) => {
        if (item._id === pid) {
          return { ...item, quantity };
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };


  //get payment gateway token
  const getToken = async () => {
=======
import moment from "moment";
import { BASE_URL } from "../../config";
import { useAuth } from "../../context/auth";
const Orders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const userName = auth?.user?.name;
  const getProductDetails = async (productId) => {
    try {
      if (!productId) return null;
      const response = await axios.get(`${BASE_URL}/api/v1/product/get/${productId}`);
      return response.data.product; // Assuming the product data is nested under 'product' key
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };

  const getOrders = async () => {
>>>>>>> 01acd386b589db9caf26e986112c16eac6db2f3c
    try {
      const response = await fetch(`${BASE_URL}/api/v1/product/orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      alert(error);
    }
  };
<<<<<<< HEAD
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMethod();
  //     const { data } = await axios.post(`${ BASE_URL }/api/v1/product/braintree/payment`, {
  //       nonce,
  //       cart,
  //     });
  //     setLoading(false);
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     navigate("/user/orders");
  //     toast.success("Payment Completed Successfully ");
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  // ...




  //handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!totalPrice()) {
      alert("Please enter amount");
    } else {
      const amount1 = totalPrice()
      const options = {
        key: "rzp_test_eEW3HjJqRPK9MK",
        key_secret: "lNGq7yzeXN29UC5V3jC5ylkK",
        amount: amount1 * 100, // Amount in paisa
        currency: "INR",
        name: "SUNCELLULAR",
        description: "let's pay",

        handler: function (response) {
          // Handle Razorpay success response
          alert("Payment successful: " + response.razorpay_payment_id);
          // Call backend to process the payment and save order
          processRazorpayPayment(response);
        },
        prefill: {
          name: "vithya",
          email: "revathip.21it@kongu.edu",
          contact: "5755875690",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };
  // handles payments
const handlePayment = async () => {
  try {
    setLoading(true);

    // Make a request to your backend to create a Razorpay order
    const { data } = await axios.post(`${BASE_URL}/api/v1/product/razorpay/order`, {
      amount: totalPrice() * 100, // Convert amount to paisa
    });

    const options = {
      key: "rzp_test_eEW3HjJqRPK9MK",
        key_secret: "lNGq7yzeXN29UC5V3jC5ylkK",
      amount: totalPrice()*100,
      currency: "INR",
      name: "SUNCELLULAR",
      description: "Let's pay",
      order_id: data.orderId,
      handler: function (response) {
        // Handle Razorpay success response
        alert("Payment successful: " + response.razorpay_payment_id);
        // Call backend to process the payment and save order
        processRazorpayPayment(response);
      },
      prefill: {
        name: "vithya",
        email: "revathip.21it@kongu.edu",
        contact: "5755875690",
      },
      notes: {
        address: "Customer Address",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

// Function to process Razorpay payment
const processRazorpayPayment = async (response) => {
  try {
    // Send payment details to backend for processing
    const { data } = await axios.post(`${BASE_URL}/api/v1/product/razorpay/payment`, {
      paymentId: response.razorpay_payment_id,
      orderId: response.razorpay_order_id,
      amount: totalPrice() * 100, // Convert amount to paisa
      // Add any additional data you need for order processing
    });
    // Handle success/failure response from backend
    if (data.success) {
      // Payment success logic
      toast.success("Payment completed successfully");
    } else {
      // Payment failed logic
      toast.success("Payment completed successfully");

      // Store cart in the database
      storeOrderInDB();
    }
  } catch (error) {
    storeOrderInDB();
    console.error("Error processing Razorpay payment:", error);
    toast.success("Payment completed successfully");
    setLoading(false);
  }
};

// Function to store cart in the database
const storeOrderInDB = async () => {
  try {
    // Make a request to your backend to store the order
    const response = await axios.post(`${BASE_URL}/api/v1/product/store-order`, {
      cart,
      userName // Include user's name
    });
    // Clear the cart after storing the order
    setCart([]);
    localStorage.removeItem("cart");
  } catch (error) {
    console.error("Error storing order:", error);
    // Handle error if necessary
  }
};

=======
>>>>>>> 01acd386b589db9caf26e986112c16eac6db2f3c
  
  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const details = {};
      for (const order of orders) {
        for (const productId of order.products) {
          if (!details[productId]) {
            const productDetails = await getProductDetails(productId);
            details[productId] = productDetails;
          }
        }
      }
      setProductDetails(details);
    };
    fetchData();
  }, [orders]);
 
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.map((order, index) => (
               order.userName === auth?.user?.name && (
              <div className="border shadow" key={order._id}>
                <table className="table">
                  <thead>
                    <tr>
                      {/* <th scope="col">#</th> */}
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* <td>{index + 1}</td> */}
                      <td>Processing</td>
                      <td>{order.userName}</td>

<<<<<<< HEAD
                    <p>Price : {p.price}</p>
                    </div>
                  <div className="col-md-4 cart-remove-btn">
                  <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      style={{ width: '30px' }}
                    />
                  &emsp;&emsp;
                    <button
                      className="btn btn-primary"
                      onClick={() => removeCartItem(p._id)}>
                      Remove
                    </button>
                  </div>
=======
                      <td>{moment(order?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
                      <td>{order?.payment?.success ? "Success" : "Success"}</td>
                      <td>{order?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {order.products.map((productId, idx) => (
                    
                    <div className="row mb-2 p-3 card flex-row" key={idx}>
                      <div className="col-md-4">
                        <img
                          src={`${BASE_URL}/api/v1/product/product-photo/${productId}`}
                          className="card-img-top"
                          alt={`Product ${idx}`}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                      <div className="col-md-8">
                        {productDetails[productId] ? (
                          <>
                            <p> {productDetails[productId].name}</p>
                            <p>Price : {productDetails[productId].price}</p>
                          </>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                  ))}
>>>>>>> 01acd386b589db9caf26e986112c16eac6db2f3c
                </div>
              </div>
              )
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

<<<<<<< HEAD
export default CartPage;
=======
export default Orders;
>>>>>>> 01acd386b589db9caf26e986112c16eac6db2f3c
