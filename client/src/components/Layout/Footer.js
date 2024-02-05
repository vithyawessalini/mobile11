import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css"
const Footer = () => {
  return (
    <div className="footer">
      <br></br>
      <br></br>
      <h1 className="text-center">All Right Reserved &copy; Suncellular</h1>
      <p className="text-center mt-3">
        <Link to="/about">Home</Link>|<Link to="/contact">Contact</Link>
      </p>
    </div>
  );
};

export default Footer;
