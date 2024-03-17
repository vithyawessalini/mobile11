import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import moment from "moment";
import { BASE_URL } from "../../config";
const Orders = () => {
  // Set the locale to English (United States)
  moment.locale("en");

  // Get the current day and date
  const currentDate = moment().format("dddd, MMMM D, YYYY");

  // Example of static orders data
  const orders = [
    

    {
      id: 1,
      status: "Processing",
      buyer: { name: "Nila" },
      createAt: "2024-03-17T12:00:00Z",
      payment: { success: true },
      products: [
        {
          _id: "prod1",
          name: "Realme Narzo 60x 5G", 
          price: 12210.00, // Changed to a numeric value
          imgUrl: "http://localhost:3009/api/v1/product/product-photo/65be4e4caa5e39bd20b715ff",
        },
  
        
      ],
    },
    {
      id: 1,
      status: "Processing",
      buyer: { name: "Vithya" },
      createAt: "2024-03-20T12:00:00Z",
      payment: { success: true },
      products: [
        {
          _id: "prod1",
          name: "Apple iPhone 13 Mini", 
          price: 64900.00, // Changed to a numeric value
          imgUrl: `${BASE_URL}/api/v1/product/product-photo/65c080cf39978dda722d201f`,
        },
        {
          _id: "prod2",
          name: "OPPO A59 5G",
          price: 13999.00, // Changed to a numeric value
          imgUrl: `${BASE_URL}/api/v1/product/product-photo/65c0804b39978dda722d200d`,
        },
        
      ],
    },
    
  ];

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {/* Display current day and date */}
            {/* <p className="text-center">{currentDate}</p> */}
            {orders.map((o, i) => (
              <div key={o.id} className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total Price</th> {/* New column for total price */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o.status}</td>
                      <td>{o.buyer.name}</td>
                      <td>{moment(o.createAt).format("dddd, MMMM D, YYYY")}</td> {/* Display order creation date */}
                      <td>{o.payment.success ? "Success" : "Failed"}</td>
                      <td>{o.products.length}</td>
                      <td>{o.products.reduce((acc, product) => acc + product.price, 0)}</td> {/* Calculate total price */}
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o.products.map((p) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={p.imgUrl}
                          alt={p.name}
                          style={{ width: "100px", height: "100px" }} // Adjust image size here
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description}</p>
                        <p>Price: ₹{p.price.toFixed(2)}</p> {/* Adjusted to display currency */}
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