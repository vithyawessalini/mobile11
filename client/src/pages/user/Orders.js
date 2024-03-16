import { BASE_URL } from "../../config";
import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/user/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

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
              <div key={index} className="border shadow mb-3 p-3">
                <h5>Order #{index + 1}</h5>
                <p>Status: {order.status}</p>
                <p>Buyer: {order.buyer?.name}</p>
                <p>Date: {moment(order.createdAt).format("MMMM Do YYYY, h:mm a")}</p>
                <p>Payment: {order.payment?.success ? "Success" : "Failed"}</p>
                <p>Quantity: {order.products?.length}</p>
                <div className="container">
                  {order.products?.map((product, pIndex) => (
                    <div key={pIndex} className="row mb-2 p-3 card flex-row">
                      <div className="col-md-4">
                        <img
                          src={`${BASE_URL}/api/v1/product/product-photo/${product._id}`}
                          className="card-img-top"
                          alt={product.name}
                          width="200px"
                          height="200px"
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{product.name}</p>
                        <p>{product.description}</p>
                        <p>Price: {product.price}</p>
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
