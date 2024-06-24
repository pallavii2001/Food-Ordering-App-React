import React, { useContext } from "react";
import Modal from "./Modal";
import { CartContext } from "../store/CartContext";
import { Button } from "./AtomComponents/Button";
import UserProgressContext from "../store/UserProgressContext";
import "./CartModal.css"; 

export default function Cart() {
  const cartctx = useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartctx.items.reduce((totalPrice,item) => totalPrice + item.quantity*item.price,0)
  
  function handleCloseCart() {
    userProgressCtx.hideCart(); 
    
  }

  function handleCheckout() {
   
    userProgressCtx.showCheckout(); 
  }

  function handleIncreaseQuantity(item) {
    cartctx.addItem(item);
  }

  function handleDecreaseQuantity(itemId) {
    cartctx.removeItem(itemId);
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === 'cart' ? true : false}>
      {console.log(userProgressCtx.progress === 'cart')}
      <h2>Your Cart</h2> 
      <ul>
        {cartctx.items.map((item) => ( 
          <li key={item.id} className="card-item">
            <p>
              {item.name} - {item.quantity} * {item.price} 
            </p>
            <p className="cart-items-actions">
              <button className="quantity-btn" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
              <span>  {item.quantity}  </span>
              <button className="quantity-btn" onClick={() => handleIncreaseQuantity(item)}>+</button>
            </p>
          </li>
        ))}
      </ul>

      <p className="cart-total">{cartTotal}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart}>Close</Button> 
        <Button onClick={handleCheckout}>CheckOut</Button> 
      </p>
    </Modal>
  );
}
