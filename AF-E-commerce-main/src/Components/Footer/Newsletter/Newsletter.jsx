import React from "react";
import "./Newsletter.scss";
import { Link } from "react-router-dom";

const Newsletter = () => {
  return (
    <>
      {/* <div className="newsletter-section">
        <div className="newsletter-content">
          <span className="small-text">Newsletter</span>
          <span className="big-text">Sign up for latest update</span>
          <div className="form">
            <input type="text" placeholder="Email address" />
            <button>Subscribe</button>
          </div>
          <Link className="link" to="/"><div className="text">Read our privacy policy</div></Link>
          <div className="social-icons">
            <div className="icons">
                <Link className="link" to="/"> Instagram</Link>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Newsletter;
