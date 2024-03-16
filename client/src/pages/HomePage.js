import React, { useState, useEffect } from "react";
import Layout from './../components/Layout/Layout'
import axios from "axios";
import { Checkbox, Slider, Select } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { BASE_URL } from "../config";
const { Option } = Select;
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [radio, setRadio] = useState([]);
  useEffect(() => {
    getAllCategory();
    getAllProducts();
    getTotal();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [sortOrder, setSortOrder] = useState('asc');

const filterProductPrice = async () => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/v1/product/product-filters-price`,
      {
        checked,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sortOrder // Pass sortOrder directly from the state
      }
    );
    setProducts(data?.products);
  } catch (error) {
    console.log(error);
  }
};

// Function to handle sorting order change
const handleSortOrderChange = (value) => {
  // Ensure that the value is either 'asc' or 'desc'
  if (value === 'asc' || value === 'desc') {
    setSortOrder(value);
    filterProductPrice(); // Call filterProductPrice with the selected sorting order
  } else {
    console.error('Invalid sorting order value');
  }
};

  
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);


 //get filterd product
 const filterProduct = async () => {
  try {
    const { data } = await axios.post(`${ BASE_URL }/api/v1/product/product-filters`, {
      checked,
      radio,
    });
    setProducts(data?.products);
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={"All Products - Best offers "}>
      <br></br>
      <br></br>
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
          {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <div className="d-flex flex-column">
            
          <h4 className="text-center mt-4">Sort By Price</h4>
          <Select defaultValue="asc" onChange={handleSortOrderChange}>
            <Option value="asc">Low to High</Option>
            <Option value="desc">High to Low</Option>
          </Select>
          </div>
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">Our Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div key={p._id} className="col-md-4 mb-4">
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top" style={{ height: "300px" }}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                    <p className="card-text"> ₹{p.price}</p>
                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ?
                  "Loading ..."
                  :
                  "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
