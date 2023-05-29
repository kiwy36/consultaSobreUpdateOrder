import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
        setCartItems(JSON.parse(savedCartItems));
        }
    }, []);

    const addToCart = (product, quantity) => {
        const existingItem = cartItems.find((item) => item.product.id === product.id);

        if (existingItem) {
        const updatedItems = cartItems.map((item) => {
            if (item.product.id === product.id) {
            return {
                ...item,
                quantity: item.quantity + quantity,
            };
            }
            return item;
        });
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        } else {
        const newItem = {
            product: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            },
            quantity,
        };
        setCartItems([...cartItems, newItem]);
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, newItem]));
        }
    };

    const removeItem = (productId) => {
        const updatedItems = cartItems.filter((item) => item.product.id !== productId);
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const getCartTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
        total += item.product.price * item.quantity;
        });
        return total;
    };

    const value = {
        cartItems,
        addToCart,
        removeItem,
        clearCart,
        getCartTotal,
    };

    return (
        <CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>
    );
};
