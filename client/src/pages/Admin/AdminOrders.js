import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import moment from "moment";
import { BASE_URL } from "../../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});

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
    try {
      const response = await fetch(`${BASE_URL}/api/v1/product/all-orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      alert(error);
    }
  };
  
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
              <div className="border shadow" key={order._id}>
                <table className="table">
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
                    <tr>
                      <td>{index + 1}</td>
                      <td>Processing</td>
                      <td>{order?.buyer?.name}</td>
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
                          width="200px"
                          height="200px"
                        />
                      </div>
                      <div className="col-md-8">
                        {productDetails[productId] ? (
                          <>
                            <p>Product name : {productDetails[productId].name}</p>
                            <p>Price : {productDetails[productId].price}</p>
                          </>
                        ) : (
                          <p>No product details available</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
