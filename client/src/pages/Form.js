import React from "react";
import Layout from "./../components/Layout/Layout";

import '../styles/Form.css'

export default function Form() {
    return (
        <>
            <Layout>
                <br /><br /><br />
                <h3 className="text-center">Book Mobile Service Here</h3>

                <div id="feedback-form">
                    <h2 className="header">Service Booking Form</h2>
                    <div>
                        <form action="https://formspree.io/f/meqwdjkz" method="POST">
                            <label className="pure-material-textfield-standard">
                                <input type="name" name="name" placeholder="Your Name" required />
                            </label>
                            <label className="pure-material-textfield-standard">
                                <input type="email" name="email" placeholder="Your Email" required />
                            </label>
                            <label className="pure-material-textfield-standard">
                                <input type="tel" name="phone" pattern="[0-9]{10}" placeholder="Your Mobile Number" required />
                            </label>
                        
                            <label className="pure-material-textfield-standard">
                                <input type="name" name="address" placeholder=" Address" required />
                            </label><br></br>
                            <label className="pure-material-textfield-standard">
                                <input type="date" name="date" required />
                            </label>
                            <label className="pure-material-textfield-standard">
                                <input type="time" name="time" required />
                            </label>
                            <button type="submit">Book Service</button>
                        </form>
                    </div>
                </div>
                <br /><br />
            </Layout>
        </>
    )
}
