import { createContext, useReducer } from "react";


const CartContext = createContext({
    items:[],
    addItem: (item) => {},
    removeItem: (id) => {}

});

function cartReducer(state,action){
    if(action.type === 'ADD_ITEM'){
        const exisitigItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        
    const updatedItems = [...state.items];
       
    if(exisitigItemIndex > -1){
            const exisitigItem = state.items[exisitigItemIndex]
            const updatedItem ={
                ...exisitigItem,
                quantity: exisitigItem.quantity + 1
            };
            updatedItems[exisitigItemIndex] = updatedItem;
        }else{
            updatedItems.push({ ...action.item, quantity: 1});
        }
        return {...state,items:updatedItems};
    }
    if (action.type === 'REMOVE_ITEM') {
        const existingItemIndex = state.items.findIndex((item) => item.id === action.id); 
        const existingItem = state.items[existingItemIndex];
        const updatedItems = [...state.items];
        
        if (existingItem.quantity === 1) {
           
            updatedItems.splice(existingItemIndex, 1);
        } else {

            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1,
            };
            updatedItems[existingItemIndex] = updatedItem;
        }
        
        return { ...state, items: updatedItems };
    }
    
    return state;
}
 export function CartProvider ({children}){
   const [cart, dispatchCartAction]= useReducer(cartReducer,{items:[]});
   
    // const[cart,setCart] = useState(0);

    // const handleAddCart = () => {
    //     setCart((prevCount)=>prevCount + 1);
    // };
   function addItem(item){
    dispatchCartAction({type:'ADD_ITEM',item});
   }
   function removeItem(id){
    dispatchCartAction({type:'REMOVE_ITEM',id});
   }

   const cartContext = {
    items: cart.items,
    addItem,
    removeItem
   };
   console.log(addItem);

    return(
    <CartContext.Provider value={cartContext}>
    {children}
    </CartContext.Provider>
    );
}
export {CartContext};