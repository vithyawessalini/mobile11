import React, { useState, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../styles/About.css";
import Layout from "./../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import redmi from "../assets/Redmi-Note-13-5G-Web-.jpg";
import realme from "../assets/Realme-12-pro-plus-Web-Banner.jpg";
import samsung from "../assets/Samsung-Galaxy-S24.jpg";
import iphone from "../assets/iPhone-15-Series-Web-Banner.jpg";
import offer from "../assets/shop.jpeg";
import mobile from "../assets/mobile.png";
import motorbike from "../assets/serv.png";
import exc from "../assets/exc.png";
import service from "../assets/service.png";

import { useNavigate } from "react-router-dom";

const About = () => {
  const navig = useNavigate();

  return (
    <Layout title={"About us - Ecommer app"}>
    <br/><br/>
      <Carousel>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={redmi}
            alt="First slide"
            height={600}
          />
          <Carousel.Caption>
            {/* <h1>Cheesy Chicken Burger</h1>
            <p className="h5">
              Indulge in crispy goodness with every bite of our Cheesy Chicken
              Burger!
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={iphone}
            alt="First slide"
            height={600}
          />
          <Carousel.Caption>
            {/* <h1>Chicken Biryani</h1>
            <p className="h5">
              Experience a burst of aromatic flavors in every spoonful of our
              Chicken Biryani!
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={realme}
            alt="Second slide"
            height={600}
          />
          <Carousel.Caption>
            {/* <h1>Grill Chicken</h1>
            <p className="h5">
              Sink your teeth into our juicy and tender grilled chicken,
              seasoned to perfection!
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={samsung}
            alt="Third slide"
            height={600}
          />
          <Carousel.Caption>
            {/* <h3>Sandwich</h3>
            <p className="h5">
              Get your sandwich fix with our wide selection of fresh
              ingredients, piled high and served to perfection!
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div class="about">
        <p>About Us</p>
      </div>
      <div class="about-text p-2">
        <p>
        At SUN CELLULAR, our mission is simple—elevate your mobile experience.
         We understand that your mobile device is not just a tool; 
         it's an essential part of your daily life. That's why we've made it our goal to offer a curated selection of top-tier smartphones,
          accessories, and gadgets that cater to your unique preferences and lifestyle.
          At SUN CELLULAR, our mission is simple—elevate your mobile experience. We understand that your mobile device is not just a tool; 
          it's an essential part of your daily life. That's why we've made it our 
          goal to offer a curated selection of top-tier smartphones, accessories, and
           gadgets that cater to your unique preferences and lifestyle.
           Going beyond the ordinary, we offer innovative solutions catering to
            diverse needs, ensuring that professionals find productivity tools and adventurers discover rugged gear.
             Our products not only boast cutting-edge technology 
           but also showcase inspired design, making a statement that complements your individual style.
        </p>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <br></br>
      {/* textover image */}
      <div className="card bg-dark text-white">
        <img
          src={offer}
          className="card-img"
          style={{ opacity: 0.2 }}
          alt="grill"
          height={500}
        ></img>
        <div className="card-img-overlay">
          <h1 className="text-center card-title p-5 mx-auto" style={{}}>
          Why SUN CELLULAR ?
          </h1>
          <p className="text-center card-text h5 p-5" style={{}}>
          At SUN CELLULAR, innovation is at your fingertips. We take pride in being ahead of the curve, curating an inventory that
           showcases the latest advancements in mobile technology. 
          This ensures you have access to the most innovative devices on the market.<br></br>
          <br>
          </br>
          Navigating the world of mobile technology is made easy with our expert guidance. 
          Our knowledgeable and friendly staff are here to assist you,
           providing expert advice tailored to your preferences—whether you're a tech enthusiast or a casual user.
           <br></br>
           <br></br>
           Unlock exclusive deals and promotions at SUN CELLULAR, making us your go-to destination for affordable, high-quality mobile devices.
            We understand the value of a good deal and strive to provide you with cost-effective options.

        
          </p>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>

      {/* image + text */}

      <div class="container">
        <div class="image">
          <img src={service} height={400} width={750}></img>
        </div>
        <div class="text">
          <h1>We cater to requests from?</h1>
          <br></br>

          <p>
          We offer top-quality mobile services including repairs, upgrades, accessories, unlocking, and trade-ins.
           Enjoy convenience with doorstep assistance, quality with genuine parts, and satisfaction guaranteed. 
           
          </p>
          <br></br>
          <p>
          Contact us today to stay connected effortlessly!
          </p>
          {/* <button className="button-30" role="button" onClick={()=>navig('/form')} style={{marginTop:'10px'}}>Book Now</button>    */}
          <div class="col-md-12 text-center">
            <button
              type="button"
              class="btn btn-dark"
              onClick={() => navig("/form")}
            >
              Book Here
            </button>
          </div>
        </div>
      </div>

      <br></br>

      {/* Testimonal */}
      <div className="container mt-5 mb-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card p-3 text-center px-4">
              <div className="user-image">
                <img src={mobile} className="img-fluid" width="158" ></img>
              </div>

              <div className="user-content">
                <h5 className="mb-0">MOBILE PHONES</h5>    
                {/* <span>MOBILE PHONES</span> */}
                <p style={{fontSize:'20px'}}>
                Discover an array of top-notch smartphones! . Catering to every taste and budget. 
                Shop online or visit our store for a seamless shopping experience today.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 text-center px-4">
              <div className="user-image">
                <img src={motorbike} className="image-fluid" width="150"></img>
              </div>

              <div className="user-content">
                <h5 className="mb-0">PHONEPRO SERVICE</h5>
                {/* <span>PHONEPRO SERVICE</span> */}
                <p style={{fontSize:'20px'}}>
                From repairs and upgrades to customization,
                 trust us to keep your devices running smoothly.
                 Visit us today for personalized service and peace of mind.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 text-center px-4">
              <div className="user-image">
                <img src={exc} className="img-fluid" width="150"></img>
              </div>

              <div className="user-content">
                <h5 className="mb-0">MOBILE EXCHANGE</h5>
                {/* <span>MOBILE EXCHANGE</span> */}
                <p style={{fontSize:'20px'}}>
                Ready to upgrade? Trade in your old phone with us! 
                Say goodbye to your old device and hello to the latest tech! 
                Sell your phone now and make room for the future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;