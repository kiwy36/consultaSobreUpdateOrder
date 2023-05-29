import React, { createContext, useState, useEffect } from "react";
import MocksProducts from "../mocks/mocksProducts";

export const CartContext = createContext();

const GlobalContex  = ({ children }) => {
    const productos = MocksProducts
    const [carrito, setCarrito]= useState([])
    function addCarrito(id){
        console.log
    }

    return (
        <GlobalContex.Provider value={productos}>{children}</GlobalContex.Provider>
    );
}
export default GlobalProvider;