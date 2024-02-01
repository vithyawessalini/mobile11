import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout title={"go back- page not found"}>
      <div className="pnf">
        <h1 className="pnf-title">Thanks</h1>
        <h2 className="pnf-heading">We will resolve it soon</h2>

      </div>
    </Layout>
  );
};

export default Pagenotfound;