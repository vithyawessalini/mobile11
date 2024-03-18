import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
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
  //total price
  const totalPrice = () => {
    try {
        let total = 0;
        cart?.map((item) => {
            total = total + item.price;
        });
        return total; // Returning the total as a number
    } catch (error) {
        console.log(error);
        return 0; // Return 0 if an error occurs
    }
};

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${ BASE_URL }/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
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
    });
    // Clear the cart after storing the order
    setCart([]);
    localStorage.removeItem("cart");
  } catch (error) {
    console.error("Error storing order:", error);
    // Handle error if necessary
  }
};

  
  return (
    <Layout >
      <div className="cart-page card-img-overlay">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card1 flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top-cart"
                      alt={p.name}
                      width="60%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description && p.description.substring(0, 30)}...</p>

                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-primary"
                      onClick={() => removeCartItem(p._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
                <div>
              <h2>Razorpay</h2>
              {/* <input type = "text" placeholder="amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
              <button onClick={handleSubmit}>Submit</button> */}
            </div>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/user/profile")}
                    >
                      Update your Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/Exchange")}
                    >
                     Sell old phones 
                    </button>
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handleSubmit}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;