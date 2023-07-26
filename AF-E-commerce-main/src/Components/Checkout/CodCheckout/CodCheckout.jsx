import React, { useContext, useEffect, useRef, useState } from "react";
import FormInput from "../InputComponents/FormInput";
import axios from "axios";
import "../InputComponents/FormInput.scss";
import "../Checkout.scss"
import { API_URL } from "../../../Utils/url";
import { Context } from "../../../Utils/Context";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import { Helmet } from "react-helmet";
import { useUserAuth } from "../../../Utils/AuthContext";

const CodCheckout = () => {
  const [address, setAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pincode, setPincode] = useState("");
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



  const [values, setValues] = useState({
    fullname: "",
    email: "",
    phone: "",
    pincode: "",
    address: "",
    town: "",
    city: "",
    district: "",
    state: "",
  });

  useEffect(() => {
    if (pincode.length >= 4) {
      getAddress();
    } else {
      setAddress({});
    }
  }, [pincode]);

  const getAddress = async () => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`  // put it in env
      );
      const data = response.data;
      if (data && data.length > 0 && data[0].Status === "Success") {
        const addressData = data[0].PostOffice[0];
        setAddress({
          city: addressData.Division,
          district: addressData.District,
          state: addressData.Circle,
          town: addressData.Name,
          status: "Success",
        });
        console.log(addressData);
      } else {
        setAddress({ status: "not found" });
      }
    } catch (error) {
      console.log("Error fetching data", error);
      setAddress({ status: "not found" });
    }
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };





  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      pincode: pincode,
      city: address.city,
      district: address.district,
      state: address.state,
      town: address.town,
    }));
    console.log(values)
  }, [address, pincode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "cod") {
      axios
        .post(API_URL + "/api/orders", {
          data: {
            customerName: values.fullname,
            PaymentStatus: "not verified",
            product: cartItems,
            customerPhone: values.phone,
            customerEmail: values.email,
            customerAddress: values.address,
            razorpayOrderId: "null",
            razorpaySignature: "null",
            paymentMode: "cod",
            city: values.city,
            pincode: values.pincode,
            state: values.state,
            district: values.district,
            town: values.town,
            subtotal: cartSubTotal,
          },
          headers: {
            Authorization: "bearer " + process.env.REACT_APP_STRAPI_API_TOKEN,
          },
        })
        .then((response) => {
          console.log("POST RESPONSE : ", response);

          localStorage.removeItem("cart")
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

    } else if (paymentMethod === "online") {
      //RazorPay Integration Code Here
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
                      customerName: values.name,
                      PaymentStatus: "paid",
                      product: cartItems,
                      customerPhone: values.phone,
                      customerEmail: values.email,
                      customerAddress: values.address,
                      razorpayOrderId: response.razorpay_payment_id,
                      razorpaySignature: "null",
                      paymentMode: "online",
                      city: values.city,
                      pincode: values.pincode,
                      state: values.state,
                      district: values.district,
                      town: values.town,
                      subtotal: cartSubTotal,
                    },
                    headers: {
                      Authorization:
                        "bearer " + process.env.REACT_APP_STRAPI_API_TOKEN,
                    },
                  })
                  .then((response) => {
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
                name: values.name, // customer's name
                email: values.email,
                contact: values.phone, // customer's phone number for better conversion rates
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
    }
  };

  const handlePayment = (method) => {
    setPaymentMethod(method);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  const tolerance = 0.01;

  return (
    <div className="container">
        <Helmet>
        <script
          type="text/javascript"
          src="https://checkout.razorpay.com/v1/checkout.js"
        ></script>
      </Helmet>
      <div className="sub-container">
        <div className="address" >
          <h1>Fill your address</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullname">Fullname:*</label>
              <input
                name="fullname"
                type="text"
                label="fullname"
                placeholder="Enter full name"
                onBlur={ handleFocus }
                focused={focused.toString()}
                onChange={onChange}
              />
              <span className="errormessage" style={{ color: "red" }}>
                This feild is required.
              </span>
            </div>
            <div>
              <label htmlFor="email">email:*</label>
              <input
                name="email"
                type="email"
                label="Email"
              
                placeholder={ "Enter your email"}
                onBlur={ handleFocus }
                focused={focused.toString()}
                onChange={onChange}
               // Disable the input if "user" is available
              />
              <span className="errormessage" style={{ color: "red" }}>
                Please enter a valid email
              </span>
            </div>
            <div>
              <label htmlFor="phone">phone:*</label>
              <input
                name="phone"
                type="number"
                id="phone"
                placeholder="Enter your phone number"
                onBlur={handleFocus}
                focused={focused.toString()}
                onChange={onChange}
              />

              <span className="errormessage" style={{ color: "red" }}>
                Please enter a valid phone number.
              </span>
            </div>
            <div>
              <label htmlFor="address">address:*</label>
              <input
                name="address"
                type="text"
                id="state"
                placeholder="eg:flat no, building name"
                onBlur={handleFocus}
                focused={focused.toString()}
                onChange={onChange}
              />
            </div>
            <div className="address-section">
              <div className="input-box1">
                <label htmlFor="pincode">Pincode:*</label>
                <input
                  name="pincode"
                  type=""
                  id="pincode"
                  placeholder="pincode"
                  value={pincode}
                  onChange={handlePincodeChange}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                />
                {address.status === "not found" && (
                  <span className="errormessage" style={{ color: "red" }}>
                    Please enter a valid pin code.
                  </span>
                )}
              </div>
              <div className="input-box">
                <label htmlFor="city">City:</label>
                <input
                  name="city"
                  type="text"
                  id="city"
                  placeholder="City"
                  value={address.city || ""}
                  readOnly
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="address-section">
              <div className="input-box1">
                <label htmlFor="district">District:</label>
                <input
                  type="text"
                  id="district"
                  placeholder="District"
                  value={address.district || ""}
                  readOnly
                  onChange={onChange}
                />
              </div>
              <div className="input-box">
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  id="state"
                  placeholder="State"
                  value={address.state || ""}
                  readOnly
                  onChange={onChange}
                />
              </div>
            </div>
            <span style={{color:"#420D09", fontSize:"12px"}}>*Note city, district, state is autofill values  </span>
            <span style={{color:"#420D09", fontSize:"12px"}}> We are currently only shipping in india</span>
            <h4>Select payment mode</h4>
            <div className="payment-method-container">
              {/* Button for Online Payment */}
              
              <input
                type="radio"
                id="online"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => handlePayment("online")}
              />
              <label htmlFor="online">Online Payment</label>

              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => handlePayment("cod")}
              />
              <label htmlFor="cod">Cash on Delivery (COD)</label>
            </div>
            <button className="submit-button">Submit</button>
          </form>
        </div>
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
                            {item?.attributes?.category?.data?.attributes?.name}
                          </p>
                          <p classNameName="thin">
                            Size: <br /> {item.attributes.size}
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
      </div>
    </div>
  );
};

export default CodCheckout;

{
  /* <div>
  <label htmlFor="pincode">Pincode:</label>
  <input
  type="text"
  id="pincode"
  value={pincode}
    onChange={handlePincodeChange}
  />
</div>
{address.status === "not found" && (
  <p style={{ color: "red" }}>Please enter a valid pin code.</p>
)}
<div>
  <label htmlFor="city">City:</label>
  <input type="text" id="city" value={address.city || ""} readOnly />
</div>
<div>
  <label htmlFor="district">District:</label>
  <input
    type="text"
    id="district"
    value={address.district || ""}
    readOnly
  />
</div>
<div>
  <label htmlFor="state">State:</label>
  <input type="text" id="state" value={address.state || ""} readOnly />
</div> */
}

// {
//   id: 4,
//   name: "pincode",
//   type: "text",
//   errorMessage: "Enter valid pincode",
//   placeholder: "Pincode",
//   label: "Pincode",
//   onChange:{handlePincodeChange}
// },
// {
//   id: 5,
//   name: "address",
//   type: "text",
//   errorMessage: "Enter valid address",
//   placeholder: "Enter your address eg:flat no , building name",
//   label: "Address",
// },
// {
//   id: 6,
//   name: "town",
//   type: "text",
//   errorMessage: "",
//   placeholder: "Town",
//   label: "Town",
// },
// {
//   id: 7,
//   name: "city",
//   type: "text",
//   errorMessage: "",
//   placeholder: "City",
//   label: "City",
// },
// {
//   id: 8,
//   name: "state",
//   type: "text",
//   errorMessage: "",
//   placeholder: "State",
//   label: "State",
// },
