import { useEffect, useState } from "react";
import ApiResponse from "../utils/ApiResponse";
import { Food } from "./Food";
import { Header } from "./Header";
import Cart from "./CartModal";
import Checkout from "./Form";

const Home = () => {
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMeals() {
            try {
                const response = await ApiResponse("GET","meals",null);
                setMeals(response);
            } catch (error) {
                setError(error);
                console.log(error);
            }
        }
        fetchMeals();
    }, []);


    return (
        <>
        <Header/>
        <Food meal={meals}/>
        <Cart/>
        <Checkout/>
        </>
        
    );
};

export {Home};