import { useContext } from "react";
import Logo from "../assets/logo.jpg"
import { Button } from "./AtomComponents/Button";
import { CartContext } from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";


const Header = () => {
  const cartctx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalCartItems = cartctx.items.reduce((totalNumberofitems, item) => {
    return totalNumberofitems + item.quantity;
  },0);

  function handleShowCart(){
    userProgressCtx.showCart();
  }
return(
    <header id="main-header">
       <title id="title">
        <img src={Logo} alt="Not-fount"/>
        SWIGGY 
      </title>
      <Button onClick={handleShowCart}>Cart ({totalCartItems})</Button>
    </header>
);
}

export {Header};