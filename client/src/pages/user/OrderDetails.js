import React from "react";
import moment from "moment";
import { BASE_URL } from "../../config";

const OrderDetails = ({ order }) => {
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
            <td>{order.buyer.name}</td>
            <td>{moment(order.createdAt).fromNow()}</td>
            <td>{order.payment.success ? "Success" : "Failed"}</td>
            <td>{order.products.length}</td>
          </tr>
        </tbody>
      </table>
      {/* Products */}
      <div className="container">
        {order.products.map((product) => (
          <div className="row mb-2 p-3 card flex-row" key={product._id}>
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
  );
};

export default OrderDetails;
