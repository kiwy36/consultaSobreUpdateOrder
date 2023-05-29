/*/ createUpdatedFirestore.jsx
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    updateDoc,
    writeBatch,
    } from "firebase/firestore";
import { Await } from "react-router-dom";
    export const createOrder = async (cartItems, clearCart) => {
        const order = {
        buyer: { name: "kiki", phone: "626", email: "mailfalso123@gmail.com" },
        items: cartItems,
        total: getTotal(cartItems),
        };
        const db = getFirestore();
        const orderCollection = collection(db, "orders");
        try {
        const docRef = await addDoc(orderCollection, order);
        const orderId = docRef.id;
        const batch = writeBatch(db);
        cartItems.forEach((product) => {
            const finalStock = product.product.stock - product.quantity;
            const itemRef = doc(db, "items", product.product.id);
            batch.update(itemRef, { stock: finalStock });
        });
        batch.commit().then(() => {
            clearCart();
        });
        } catch (error) {
        console.log(error);
        }
    };
    export async function updateOrder(id, finalStock) {
        if (id && finalStock) {
        const db = getFirestore();
        const itemRef = doc(db, "items", id);
        await updateDoc(itemRef, { stock: finalStock });
        }
    }
    function getTotal(cartItems) {
        if (!Array.isArray(cartItems)) {
        return 0;
        }
        return cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
        );
    }*/
//
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    updateDoc,
    writeBatch,
  } from "firebase/firestore";
  import { CartContext } from "../context/CartContext";
    
    export const createOrder = async (cartItems, clearCart, total) => {
        const order = {
        buyer: { name: "kiki", phone: "626", email: "mailfalso123@gmail.com" },
        items: cartItems,
        total: total,
        };
        const db = getFirestore();
        const orderCollection = collection(db, "orders");
    
        try {
        const docRef = await addDoc(orderCollection, order);
        const orderId = docRef.id;
    
        const batch = writeBatch(db);
    
        cartItems.forEach((item) => {
            const productId = item.product.id;
            const finalStock = item.product.stock - item.quantity;
            const itemRef = doc(db, "items", productId);
            batch.update(itemRef, { stock: finalStock });
        });
    
        batch.commit().then(() => {
            clearCart();
        });
        } catch (error) {
        console.log(error);
        }
    };
    
    export const updateOrder = async (productId, finalStock) => {
        if (id && finalStock) {
        const db = getFirestore();
        const itemRef = doc(db, "items", productId);
        await updateDoc(itemRef, { stock: finalStock });
        }else{
            console.log("algo salio mal")
        }
    };
    
    function getTotal(cartItems) {
        if (!Array.isArray(cartItems)) {
        return 0;
        }
    
        return cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
        );
    }

