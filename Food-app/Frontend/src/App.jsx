
import { Home } from "./components/Home";
import  {CartProvider}  from "./store/CartContext";
import  { UserProgressContextProvider } from "./store/UserProgressContext";
function App() {
  return (
 
    <UserProgressContextProvider>
    <CartProvider>
     
      <Home/>
      
      </CartProvider>
       </UserProgressContextProvider>
 
  );
}

export default App;
