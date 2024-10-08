import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://fooddel-backend-x1df.onrender.com";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    //Adding items to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev)=>({...prev, [itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev, [itemId]: prev[itemId]+1}));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", {itemId}, {headers: {token}});

        }
    };

    //Removing items from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId]-1}));
        if (token) {
            await axios.post(url + "/api/cart/remove", {itemId}, {headers: {token}});
        }
    }

   //Function to calculate total amount in cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems){
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    }

    //When we add item on home page & if we reload the data get lost. So to avoid that, we have written below function
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, {headers: {token}});
        setCartItems(response.data.cartData);
    }

    //To avoid getting logout even after refreshing
    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
