import React, { useState, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../styles/About.css";
import Layout from "./../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import burger from "../assets/burger.jpeg";
import grill from "../assets/grill.jpeg";
import fries from "../assets/fries.jpeg";
import biriyani from "../assets/biriyani.jpeg";
import offer from "../assets/offer.jpeg";
import cutlery from "../assets/cutlery.png";
import motorbike from "../assets/motorbike.png";
import champagne from "../assets/champagne.png";
import noodles from "../assets/noodles.jpg";

import { useNavigate } from "react-router-dom";

const About = () => {
  const navig = useNavigate();

  return (
    <Layout title={"About us - Ecommer app"}>
      <Carousel>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={burger}
            alt="First slide"
            height={600}
          />
          <Carousel.Caption>
            <h1>Cheesy Chicken Burger</h1>
            <p className="h5">
              Indulge in crispy goodness with every bite of our Cheesy Chicken
              Burger!
            </p>
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
            <h1>Chicken Biryani</h1>
            <p className="h5">
              Experience a burst of aromatic flavors in every spoonful of our
              Chicken Biryani!
            </p>
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
            <h1>Grill Chicken</h1>
            <p className="h5">
              Sink your teeth into our juicy and tender grilled chicken,
              seasoned to perfection!
            </p>
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
            <h3>Sandwich</h3>
            <p className="h5">
              Get your sandwich fix with our wide selection of fresh
              ingredients, piled high and served to perfection!
            </p>
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
          The Spot in Kumarnagar, Tirupur is a top player in the category
          Inexpensive Restaurants (Below Rs 500) in the Tirupur. This well-known
          establishment acts as a one-stop destination servicing customers both
          local and from other parts of Tirupur. Over the course of its journey,
          this business has established a firm foothold in it's industry. The
          belief that customer satisfaction is as important as their products
          and services, have helped this establishment garner a vast base of
          customers, which continues to grow by the day. This business employs
          individuals that are dedicated towards their respective roles and put
          in a lot of effort to achieve the common vision and larger goals of
          the company. In the near future, this business aims to expand its line
          of products and services and cater to a larger client base. In
          Tirupur, this establishment occupies a prominent location in
          Kumarnagar. It is an effortless task in commuting to this
          establishment as there are various modes of transport readily
          available. It is known to provide top service in the following
          categories: Restaurants, Inexpensive Restaurants (Below Rs 500),
          Arabic Restaurants
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
            WHAT WE OFFER
          </h1>
          <p className="text-center card-text h5 p-5" style={{}}>
            The spot 42 offers the best, unique & mesmerizing flavors in
            Shawarmas & Kebabs to match the expectations of the taste buds of
            the people. At Street Arabiya, the best chefs with excellent
            culinary skills prepare the Authentic Shawarmas & Kebabs with
            unmatched taste, quality & flavors. Our Shawarmas & Kebabs are sure
            to tingle your taste buds. We accord guest satisfaction as our
            absolute priority and we constantly venture to offer innovative,
            trendy & seasonal varieties in Shawarmas & Kebabs to make the eating
            an amazing experience to cherish.
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
