import React from "react";
import Layout from "./../components/Layout/Layout";

import '../styles/Form.css'

export default function Form()
{
    return(<>
    <Layout>
        <br/><br/><br/>
        <h3 className="text-center">Reserve Party Hall here!!</h3>

        <div id="feedback-form">
              <h2 class="header">Reservation Form</h2>
              <div>
                <form action="https://formspree.io/f/meqwdjkz" method="POST">
                <label class="pure-material-textfield-standard">
                      <input placeholder="Your Name"/>
                      {/* <span>Your Name</span> */}
                </label> 
                <label class="pure-material-textfield-standard"> 
                <input type="number" class="pure-material-textfield-standard" name="date" placeholder="Members Count"/>
                      {/* <span>Select Date</span> */}
                </label> 
                <label class="pure-material-textfield-standard"> 
                <input type="email" class="pure-material-textfield-standard" name="date" placeholder="Your Email"/>
                      {/* <span>Select Date</span> */}
                </label> 
                <label class="pure-material-textfield-standard"> 
                <input type="number" class="pure-material-textfield-standard" name="date" placeholder="Your Mobile Number"/>
                      {/* <span>Select Date</span> */}
                </label> 
                <br></br>
                <label class="pure-material-textfield-standard"> 
                <input type="date" class="pure-material-textfield-standard" name="date" placeholder="Pick a Date"/>
                      {/* <span>Select Date</span> */}
                </label> 


                {/* <label class="pure-material-textfield-standard">
                      <input placeholder=" "/>
                      <span>About Customizing halls</span>
                </label><br/>                  
                  <label for="feedback-notify">Remind me about event via SMS</label>
                  <input type="checkbox" id="feedback-notify" name="notify"/>
                  <input type="text" id="feedback-phone" name="phone" placeholder="Phone number"></input> */}
                  <button type="submit">Register</button>
                </form>
              </div>
        </div>
        <br/><br/>

    </Layout>
   
   </>)

}