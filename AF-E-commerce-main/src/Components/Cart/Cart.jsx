import { MdClose, MdShoppingBag } from "react-icons/md";
import CartItem from "../Cart/CartItems/CartItem";
import { Context } from "../../Utils/Context";
import "./Cart.scss";
import { useContext, useEffect } from "react";
import { BsCartX } from "react-icons/bs";
import { makePaymentRequest } from "../../Utils/api";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cartItems, setShowCart, cartSubTotal } = useContext(Context);
  
const navigate =useNavigate()

console.log(cartSubTotal)



  return (
    <div className="cart-panel">
      <div className="opac-layer" onClick={() => setShowCart(false)}></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose className="close-btn" />
          </span>
        </div>

        {!cartItems.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <button className="submit-button" style={{width:"60%", display:"flex", justifyContent:"center"}} onClick={() =>{ navigate("/") ||setShowCart(false) } }>
              RETURN TO SHOP
            </button>
          </div>
        )}

        {!!cartItems.length && (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal : &#8377;{cartSubTotal}</span>
              
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="submit-button" style={{width:"90%"}}
                  onClick={() => {navigate("/checkout") || setShowCart(false)}}

                >
                  Checkout
                </button>
                {/* <PaytmButton/> */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
