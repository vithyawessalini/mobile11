import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios"; // Import axios for making HTTP requests
import { BASE_URL } from "../../config";

const OrderDetails = ({ order }) => {
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = [];
      for (const product of order.products) {
        const productDetails = await getProductDetails(product._id);
        details.push(productDetails);
      }
      setProductDetails(details);
    };

    fetchProductDetails();
  }, [order]);

  // Define getProductDetails function to fetch product details
  const getProductDetails = async (productId) => {
    try {
      console.log("ProductId:", productId); // Log productId to check its value
      if (!productId) return null; // Handle null or undefined productId
      const response = await axios.get(`${BASE_URL}/api/v1/product/get/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };

  return (
    <div className="border shadow" key={order._id}>
      <table className="table">
        {/* Table headers */}
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Status</th>
            <th scope="col">Buyer</th>
            <th scope="col">Date</th>
            <th scope="col">Payment</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {/* Table row */}
          <tr>
            <td>1</td>
            <td>{order.status}</td>
            <td>{order.buyer ? order.buyer.name : 'Unknown Buyer'}</td> {/* Add null check for order.buyer */}
            <td>{moment(order.createdAt).fromNow()}</td>
            <td>Success</td>
            <td>{order.products.length}</td>
          </tr>
        </tbody>
      </table>
      {/* Products */}
      <div className="container">
        {productDetails.map((product, idx) => (
          <div className="row mb-2 p-3 card flex-row" key={idx}>
            <div className="col-md-4">
              <img
                src={`${BASE_URL}/api/v1/product/product-photo/${product}`}
                className="card-img-top"
                alt="jjj"
                width="200px"
                height="200px"
              />
            </div>
            <div className="col-md-8">
              <p>{product ? product.name : 'Unknown Product'}</p> {/* Display product name */}
              <p>{product ? product.description : 'No description available'}</p> {/* Display product description */}
              <p>Price: {product ? product.price : 'Price not available'}</p> {/* Display product price */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
