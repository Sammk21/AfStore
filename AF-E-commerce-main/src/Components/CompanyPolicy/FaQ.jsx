import React, { useEffect, useRef, useState } from "react";
import "./Policy.scss";
import { Link } from "react-router-dom";
import { BsFilePlus } from "react-icons/bs";

const FaQ = () => {
   
  const [active, setActive] = useState(false);

  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toggleAccordion = () => {
    setActive(!active);
  };

  return (

    <>
    <div className="App">
      <div>
        <button
          className={`question-section ${active}`}
          onClick={toggleAccordion}
        >
          <div>
            <div className="question-align">
              <h4 className="question-style">
              HOW TO PLACE AN RETURN REQUEST?
              </h4>
              <BsFilePlus
                className={active ? `question-icon rotate` : `question-icon`}
              />
            </div>
            <div
              ref={contentRef}
              className={active ? `answer answer-divider` : `answer`}
            >
              <p> Visit the returns section on the website or click here to raise a
         return request for your order</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  </>

    // <div className="container">
    //   <div className="heading">
    //     <h1>FAQ</h1>
    //     <h3>GENERAL QUERIES</h3>
    //   </div>
    //   <div className="main-content">
    //     <div className="subheading">
    //       <h4>IS CASH ON DELIVERY COD AVAILABLE?</h4>
    //     </div>
    //     <ol>
    //       <li>
    //         Yes! COD is available for orders below IN 5000 on all serviceable
    //         pincodes.
    //       </li>
    //     </ol>

    //     <div className="subheading">
    //       <h4>HOW TO PLACE AN RETURN REQUEST?</h4>
    //     </div>
    //     <ol>
    //       <li>
    //         Visit the returns section on the website or click here to raise a
    //         return request for your order
    //       </li>
    //       <li>Submit the required details in the empty fields</li>
    //       <li>
    //         Follow the instructions and select the item you would want to
    //         exchange
    //       </li>
    //       <li>Select the items you would want to exchange them with</li>
    //       <li>
    //         A confirmation email would be shared once the exchange request is
    //         approved.
    //       </li>
    //     </ol>
    //     <div className="paragraph">
    //       <p>
    //         Please note that the return request needs to be raised within 7 days
    //         of the delivery date. Reverse pickup will be done in 2-3 working
    //         days by our courier partner. Once we receive the product, we would
    //         get in touch with you to confirm your request. <br />
    //         In addition, all returned products must be unused or unwashed or
    //         undamaged and must be returned with the original packing and tags
    //         when we receive them. Items without tags will not be accepted. The
    //         new order will be on its way as soon as the exchange item is
    //         verified at our warehouse. The exchange process is subject to your
    //         exchange item meeting the above conditions.
    //       </p>
    //     </div>
    //     <div className="subheading">
    //       <h4> ARE THERE ANY ADDITIONAL CHARGES FOR RETURNS/EXCHANGE?</h4>
    //     </div>
    //     <ol>
    //       <li>Courier Fee For Returns Will Be Charged.</li>
    //     </ol>

    //     <div className="subheading">
    //       <h4> HOW LONG WILL MY ORDER TAKE TO ARRIVE?</h4>
    //     </div>
    //     <ol>
    //       <li>
    //         The order usually takes 7-10 working days to reach all the metros
    //         and tier I cities, however for some pin codes it might take a little
    //         more time. In case of delay please write to us at
    //         fereclaurus@gmail.com
    //       </li>
    //     </ol>
    //     <div className="subheading">
    //       <h4> HOW WOULD I KNOW IF MY ORDER IS PLACED?</h4>
    //     </div>
    //     <ol>
    //       <li>
    //         You will get a confirmation of the placed order on your registered
    //         email ID and phone number. Besides, we will further notify you once
    //         it is dispatched from our warehouse.
    //       </li>
    //     </ol>

    //     <div className="subheading">
    //       <h4> WHAT HAPPENS IF MY SHIPMENT DOES NOT GET DELIVERED ON TIME?</h4>
    //     </div>
    //     <ol>
    //       <li>
    //         In case the order does not get delivered within 7-10 working days,
    //         you can write to us at{" "}
    //         <Link className="links">fereclaurus@gmail.com</Link> We will do our
    //         best to get it delivered at the earliest.
    //       </li>
    //     </ol>

    //     <div className="subheading">
    //       <h4>ARE THERE ANY SHIPPING CHARGES ON DELIVERY?</h4>
    //     </div>
    //     <ol>
    //       <li>We charge a shipping fee of INR 100/- on all orders.</li>
    //     </ol>

    //     <div className="subheading">
    //       <h4>DO WE SHIP OUTSIDE INDIA?</h4>
    //     </div>
    //     <ol>
    //       <li>
    //         At the moment, we do not deliver items outside India. However, you
    //         can make a purchase from anywhere in the world as long as the
    //         shipping address is within India.
    //       </li>
    //     </ol>
    //   </div>
    // </div>
  );
};

export default FaQ;
