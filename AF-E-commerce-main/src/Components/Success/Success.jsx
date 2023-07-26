import React, { useContext } from "react";
import "./Success.scss";
import { AiOutlineCheck } from "react-icons/ai";
import { Context } from "../../Utils/Context";
import { API_URL } from "../../Utils/url";
const Success = () => {
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
  return (
    <div>
      <div className="success-page-content">
        <div className="left">
          <div className="greeting">
            <h2>
              Thankyou for your order you'll recieve email of your order details shortly
            </h2>
            <span>
              <AiOutlineCheck />
            </span>
          </div>
          <div className="order-details">
            <p>Your order Id is <span style={{fontWeight:"600"}}>#11010101</span></p>
          </div>
        </div>
        <div className="right">
        <div className="order-info-content">
            <h3>
                Order Details
            </h3>
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
                            
                            <p className=" my-1">
                              price: &#8377;{item.attributes.price}
                            </p>
                            <div className="quantity-buttons my-1">
                              
                              <span>{item.attributes.quantity}</span>
                              
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
        </div>
      </div>
    </div>
  );
};

export default Success;
