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
  <br></br><br/>

           <iframe
            src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d11233.596469885939!2d77.4261110369194!3d11.155819088732374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3ba96d7810fe32d5%3A0x85cf49c5b26fb72e!2sKongu%20Engineering%20College%2C%20Thoppupalayam%2C%20Kumaran%20Nagar%2C%20Perundurai%2C%20Tamil%20Nadu%20638060!3m2!1d11.2741843!2d77.6070381!4m5!1s0x3ba909633deb170b%3A0xc862933b47ed2693!2sSun%20Cellular%2C%20Uthukuli%2C%20Tamil%20Nadu!3m2!1d11.155798599999999!2d77.4445652!5e1!3m2!1sen!2sin!4v1710859139763!5m2!1sen!2sin" 
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
            <BiMailSend /> : suncellular@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91 96773 41661 
           
          </p>
          <p>

          <IoLocationSharp/> : 8,K.S.M. Complex, Kunnathur Road, UTTUKULI R.S – 638752

          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;