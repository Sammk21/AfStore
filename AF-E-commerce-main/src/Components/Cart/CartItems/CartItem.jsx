import React, { useContext } from "react";
import { Context } from "../../../Utils/Context";
import { MdClose } from "react-icons/md";
import "./CartItem.scss";
import { API_URL } from "../../../Utils/url";



const CartItem = () => {



  const { cartItems, handleRemoveFromCart, handleCartProductQuantity } =
    useContext(Context);


  return (
    <div className="cart-products">
      {cartItems?.map((item) => (
        <div className="search-result-item " key={item.id} onClick={() => {}}>
          <div className="image-container">
            <img src={API_URL + item.attributes.image.data[0].attributes.url} />
          </div>
          <div className="prod-details ">
            <span className="name d-flex justify-content-space-between">{item.attributes.name}</span>
            <div className="quantity-buttons">
              <span onClick={() => handleCartProductQuantity("dec", item)}>
                -
              </span>
              <span>{item.attributes.quantity}</span>
              <span onClick={() => handleCartProductQuantity("inc", item)}>
                +
              </span>
            </div>
            <div className="text">
              <span>{item.attributes.quantity}</span>
              <span>x</span>
              <span className="highlight">
                <span>&#8377;</span>
                {item.attributes.price * item.attributes.quantity}
              </span>
            </div>
          </div>
              <div>
                <MdClose
                  className="close-btn"
                  onClick={() => handleRemoveFromCart(item)}
                />
              </div>
        </div>
      ))}
    </div>
  );
}

export default CartItem;
