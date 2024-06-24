import React, { useState } from "react";
import { useContext } from "react";
import Modal from "./Modal";
import { CartContext } from "../store/CartContext";
import Input from "./AtomComponents/Input";
import { Button } from "./AtomComponents/Button";
import UserProgressContext from "../store/UserProgressContext";
import ApiResponse from "../utils/ApiResponse";
import "./Check.css";


export default function Checkout(){
    const cartctx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)
    const cartTotal = cartctx.items.reduce((totalPrice,item) => totalPrice + item.quantity*item.price,0)
    const [orderMessage, setOrderMessage] = useState(''); 

    
    function handleClose(){
        userProgressCtx.hideCheckout();
    }
     
    async function handleSubmit(event){
        event.preventDefault();
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const street = document.getElementById('street').value;
        const postalCode = document.getElementById('code').value;
        const city = document.getElementById('city').value;

        try {
            const response = await ApiResponse('post', 'orders', {
                order: {
                    items: cartctx.items,
                    customer: {
                        name: fullName,
                        email: email,
                        street: street,
                        'postal-code': postalCode,
                        city: city
                    }
                }
            });
            console.log(response);
            setOrderMessage('Order created successfully!');
        } catch (error) {
          
            console.error(error);
            setOrderMessage('Failed to create order');
        }
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'}>
            <form onSubmit={handleSubmit} className="checkout-form">
                <h2>Checkout</h2>
                <p>Total Amount: {cartTotal}</p>
                <Input label="Full Name" type="text" id="full-name"/>
                <Input label="Email" type="email" id="email"/>
                <Input label="Address" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="code"/>
                    <Input label="City" type="text" id="city"/>
                    <div className="button-container">
                        <button className="close-btn" onClick={handleClose}>Close</button>
                        <button className="submit-btn">Submit</button>
                    </div>
                </div>
                <p>{orderMessage}</p>
            </form>
        </Modal>
    );
    
}    
