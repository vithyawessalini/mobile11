import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import DashboardAdmin from "./DashboardAdmin";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../config";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
          <DashboardAdmin />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {currentProducts.map((p) => (
              <Link key={p._id} to={`/admin/product/${p.slug}`} className="product-link">
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    {/* <p className="card-text">{p.description}</p> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="pagination">
            {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((number) => (
              <span key={number + 1} onClick={() => paginate(number + 1)}>
                {number + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
