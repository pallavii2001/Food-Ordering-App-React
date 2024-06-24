import { useContext } from "react";

import { Button } from "./AtomComponents/Button";
import { CartContext } from "../store/CartContext";

const Food = ({ meal }) => {
    const cartCtx = useContext(CartContext);

    function handleAddToCart(foodItem) {
        cartCtx.addItem(foodItem);
    }

    return (
        <div id="meals">
            {meal.map((food) => (
                <div key={food.id} className="meal-item">
                    <img src={`http://localhost:3000/${food.image}`} alt='not-found' />
                    <div className="meal-details">
                        <h3>{food.name}</h3>
                        <p className="meal-item-price">Price: ${food.price}</p>
                        <p className="meal-item-description">{food.description}</p>
                        <Button onClick={() => handleAddToCart(food)}>Add to Cart</Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export { Food };