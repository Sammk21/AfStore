import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Checkout.scss";
import { Context } from "../../Utils/Context";
import { API_URL } from "../../Utils/url";
import { Helmet } from "react-helmet";
import swal from "sweetalert";
import { useUserAuth } from "../../Utils/AuthContext";
import { MdClose, MdDelete, MdRemove } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const { user } = useUserAuth();
  const {
    cartItems,
    cartSubTotal,
    gstAmount,
    deliveryCharge,
    remainingAmount,
    handleRemoveFromCart,
    handleCartProductQuantity,
    handleInventoryUpdate,
  } = useContext(Context);

  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const apiUrl = process.env.REACT_APP_PAYMENT_GATEWAY_URL; //Payment gateway server url
    const endpoint = "/payment/create_order"; //endpoint for creating order

    const requestBody = {
      subtotal: cartSubTotal,
      info: "order_request",
    };

    // Make the POST request to razorpay
    axios
      .post(apiUrl + endpoint, requestBody)
      .then((response) => {
        // got the response now Handle the response

        if (response.data.status === "created") {
          let options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            amount: response.data.amount,
            currency: "INR",
            name: "Almost Famous",
            image:
              "http://localhost:3000/static/media/logo.ce41834a97195cdf961f.png",
            order_id: response.data.id,
            handler: function (response) {
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_order_signature);

              axios
                .post(API_URL + "/api/orders", {
                  data: {
                    customerName: data.name,
                    PaymentStatus: "paid",
                    product: cartItems,
                    customerPhone: data.phoneNo,
                    customerEmail: data.email,
                    customerAddress: data.address1,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_order_signature,
                    subtotal: cartSubTotal,
                  },
                  headers: {
                    Authorization:
                      "bearer " + process.env.REACT_APP_STRAPI_API_TOKEN,
                  },
                })
                .then((response) => {
                  console.log("POST RESPONSE : ", response);
                  swal(
                    "Payment Sucessful",
                    "Your order id is " + response.data.data.id,
                    "success"
                  );
                });

              const updatePromise = cartItems.map((item) => {
                // to update the inventory quantity created a function for multiple items
                console.log(item);
                const productId = item.id;
                const purchasedQuantity = item.attributes.quantity;
                const initalQuantity = item.attributes.inventoryquantity;
                const remainingQuantity = initalQuantity - purchasedQuantity;
                return axios.put(API_URL + `/api/products/${productId}`, {
                  data: {
                    inventoryquantity: remainingQuantity,
                  },
                  headers: {
                    Authorization:
                      "bearer " + process.env.REACT_APP_STRAPI_API_TOKEN,
                  },
                });
              });
              Promise.all(updatePromise).then((results) => {
                console.log("quantity updated", results);
              });

              localStorage.removeItem("cart");
            },

            prefill: {
              name: data.name, // customer's name
              email: data.email,
              contact: data.phoneNo, // customer's phone number for better conversion rates
            },
            theme: {
              color: "#f5f5f5",
            },
          };

          var rzp1 = new window.Razorpay(options);
          rzp1.on("payment.failed", function (response) {
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
            swal("Oops...", "Something went wrong!", "error");
          });
          rzp1.open();
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  };

  //for cod accordion

  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toggleAccordion = () => {
    setActive(!active);
  };

  const tolerance = 0.01;
  // const readOnly = user ? true : false;

  return (
    <>
      <Helmet>
        <script
          type="text/javascript"
          src="https://checkout.razorpay.com/v1/checkout.js"
        ></script>
      </Helmet>
      <div className="container">
        <div className="window">
          <div className="order-info">
            <div className="left-window">
              <h2>Order Summary</h2>
              <h4>Total Products : {cartItems?.length}</h4>
              <p style={{ fontSize: "11px", color: "#4BB543" }}>
                {Math.abs(remainingAmount) > tolerance &&
                Math.abs(cartItems) > tolerance ? (
                  <>
                    Add products worth{" "}
                    <span
                      style={{
                        color: "green",
                        fontWeight: 700,
                        fontSize: "13px",
                      }}
                    >
                      {remainingAmount}
                    </span>{" "}
                    to get free delivery
                  </>
                ) : (
                  <>
                    {Math.abs(remainingAmount) <= tolerance ? (
                      "You're eligible for free delivery"
                    ) : (
                      <>
                        Add products worth{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {remainingAmount}
                        </span>{" "}
                        to get free delivery
                      </>
                    )}
                  </>
                )}
              </p>

              <div className="order-info-content">
                <div className="line"></div>
                {cartItems?.map((item) => (
                  <div className="main-table" style={{ height: "" }}>
                    <table className="order-table">
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src={
                                API_URL +
                                item.attributes.image.data[0].attributes.url
                              }
                              className="full-width"
                            ></img>
                          </td>
                          <td>
                            <p className="thin">{item.attributes.title}</p>
                            <p className="thin">
                              Category:
                              {
                                item?.attributes?.category?.data?.attributes
                                  ?.name
                              }
                            </p>
                            <p classNameName="thin">
                              Size: <br /> M{" "}
                            </p>
                          </td>
                        </tr>
                      </tbody>

                      <tr>
                        <td>
                          <div className="checkout-price">
                            <span className="helper ">
                              <div className="my-1">
                                <MdDelete
                                  color="red"
                                  className="close-btn"
                                  onClick={() => handleRemoveFromCart(item)}
                                />
                              </div>
                              <p className=" my-1">
                                price: &#8377;{item.attributes.price}
                              </p>
                              <div className="quantity-buttons my-1">
                                <span
                                  onClick={() =>
                                    handleCartProductQuantity("dec", item)
                                  }
                                >
                                  -
                                </span>
                                <span>{item.attributes.quantity}</span>
                                <span
                                  onClick={() =>
                                    handleCartProductQuantity("inc", item)
                                  }
                                >
                                  +
                                </span>
                              </div>
                            </span>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                ))}
                <div className="line"></div>
              </div>
              <div className="total">
                <div className="namess">
                  <span className="">
                    <p>gst : </p>
                  </span>
                  <span className="">
                    <p>delivery : </p>
                  </span>

                  <span className="">
                    <p>total : </p>
                  </span>
                </div>
                <div className="">
                  <span className=" checkout-prices">
                    <p>&#8377;{gstAmount}</p>
                  </span>
                  <span className="  checkout-prices">
                    <p>&#8377;{deliveryCharge}</p>
                  </span>

                  <span
                    style={{ color: "##00ca00" }}
                    className=" Total checkout-prices"
                  >
                    <p> &#8377;{cartSubTotal}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="credit-info">
            <div className="credit-info-content">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">FullName:</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="errorval">This field is required</p>
                )}

                <label htmlFor="email">Email Address:</label>
                <input
                  // value={user ? user.email : ""}
                  placeholder={user? user.email : ""}
                  type="email"
                  id="email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  disabled={user ? true : false} // Disable the input if "user" is available
                />
                {errors.email && (
                  <p className="errorval">
                    This field is required and must be a valid email address
                  </p>
                )}

                <label htmlFor="phoneNo">Phone Number:</label>
                <input
                  className="phoneNo"
                  type="tel"
                  id="phoneNo"
                  {...register("phoneNo", {
                    required: true,
                    pattern: /^(0|91)?[6-9][0-9]{9}$/,
                  })}
                />
                {errors.phoneNo && (
                  <p className="errorval">Enter valid mobile number</p>
                )}

                <label htmlFor="address1">Address Line 1:</label>
                <input
                  type="text"
                  id="address1"
                  {...register("address1", { required: true })}
                />
                {errors.address1 && (
                  <p className="errorval">This field is required</p>
                )}

                <label htmlFor="address2">Address Line 2:</label>
                <input
                  type="text"
                  id="address2"
                  {...register("address2", { required: true })}
                />
                {errors.address2 && (
                  <p className="errorval">This field is required</p>
                )}

                <label htmlFor="pincode">Pincode:</label>
                <input
                  type="text"
                  id="pincode"
                  {...register("pincode", {
                    required: true,
                    pattern: /^[0-9]{6}$/,
                  })}
                />
                {errors.pincode && (
                  <p className="errorval">
                    This field is required and must be a 6-digit code
                  </p>
                )}

                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  {...register("city", { required: true })}
                />
                {errors.city && (
                  <p className="errorval">This field is required</p>
                )}

                <button className="submit-button" type="submit">
                  Pay now{" "}
                  <span className="if-paynow">get 5% off instantly</span>
                </button>
              </form>
              <div>
                <button
                  className={`question-section ${active}`}
                  onClick={toggleAccordion}
                >
                  <div>
                    <div className="question-align">
                      <h4 className="question-style">Cash on delivery</h4>
                      <span
                        className={
                          active ? `question-icon rotate` : `question-icon`
                        }
                      ></span>
                    </div>
                    <div
                      ref={contentRef}
                      className={active ? `answer answer-divider` : `answer`}
                    >
                      <button
                        className="submit-button"
                        onClick={() => navigate("/test")}
                      >
                        Pay on delivery
                      </button>
                    </div>
                  </div>
                </button>
              </div>
              <div className="App"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
