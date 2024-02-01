import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport, BiLocationPlus } from "react-icons/bi";
import {IoLocationSharp} from "react-icons/io5";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <br></br>
      <div className="row contactus ">
        <div className="col-md-6 ">
          {/* <img
            src="/images/rice.jpg"
            alt="contactus"
            style={{ width: "100%",height:"400px" }}
          /> */}


<iframe
              src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d250482.176132797!2d77.30090633255107!3d11.203610960035027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d11.2738824!2d77.5967187!4m5!1s0x3ba90741891d97bd%3A0xef87ffcc90762199!2sthe%20spot%20tirupur!3m2!1d11.1166822!2d77.3338917!5e0!3m2!1sen!2sin!4v1683517722024!5m2!1sen!2sin"
              width="600"
              height="450"
              frameBorder="0"
              style={{border:0}}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
          We are always here to serve you !!
          </p>
          <p className="mt-3">
            <BiMailSend /> : thespotforfoodies@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91 9566738163
           
          </p>
          <p>

          <IoLocationSharp/> : The spot for foodies, Avinashi road, Kumar Nagar, Tirupur 641603
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;