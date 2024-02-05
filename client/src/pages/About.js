import React, { useState, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../styles/About.css";
import Layout from "./../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import burger from "../assets/Redmi-Note-13-5G-Web-.jpg";
import grill from "../assets/Realme-12-pro-plus-Web-Banner.jpg";
import fries from "../assets/Samsung-Galaxy-S24.jpg";
import biriyani from "../assets/iPhone-15-Series-Web-Banner.jpg";
import offer from "../assets/shop.jpeg";
import cutlery from "../assets/cutlery.png";
import motorbike from "../assets/motorbike.png";
import champagne from "../assets/champagne.png";
import noodles from "../assets/noodles.jpg";

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
            src={burger}
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
            src={biriyani}
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
            src={grill}
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
            src={fries}
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
          <img src={noodles} height={400} width={750}></img>
        </div>
        <div class="text">
          <h1>WE UNDERTAKE ORDERS FROM ?</h1>
          <br></br>

          <p>
            The Spot can cater to party orders.Party halls can be pre booked for
            all kinds of functions like Party, Corporate Parties, Private Party,
            Birthday, Reunion etc to make it more interesting & impactful.
          </p>
          <br></br>
          <p>
            Make your parties more attractive & innovative by serving the best
            delicacies!!
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
                <img src={cutlery} className="img-fluid" width="80"></img>
              </div>

              <div className="user-content">
                <h5 className="mb-0">Fast Food</h5>
                {/* <span>Software Developer</span> */}
                <p>
                  Delicious quick food for any craving! Burgers, biryanis,
                  grilled chicken, sandwiches and more. Order online or in-store
                  for a satisfying meal today
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 text-center px-4">
              <div className="user-image">
                <img src={motorbike} className="image-fluid" width="80"></img>
              </div>

              <div className="user-content">
                {/* <h5 className="mb-0">Mark Smith</h5> */}
                <span>Fast Delivery</span>
                <p>
                  Experience the convenience of fast delivery without
                  sacrificing quality or taste. Our food is always hot, fresh,
                  and ready to be delivered straight to your doorstep{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 text-center px-4">
              <div className="user-image">
                <img src={champagne} className="img-fluid" width="80"></img>
              </div>

              <div className="user-content">
                {/* <h5 className="mb-0">Veera Duncan</h5> */}
                <span>Party Hall</span>
                <p>
                  Host your next small event in our beautiful party hall. The
                  perfect space for small gatherings and celebrations with
                  friends and family
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>

      <br></br>
    </Layout>
  );
};

export default About;