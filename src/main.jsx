import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import {CartProvider} from './context/CartContext';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBGuj8t4bqdzjDGW8B_oPy1d7DD_4V5DBs",
  authDomain: "tienda-bicis-eb1c7.firebaseapp.com",
  projectId: "tienda-bicis-eb1c7",
  storageBucket: "tienda-bicis-eb1c7.appspot.com",
  messagingSenderId: "461748315674",
  appId: "1:461748315674:web:fe72b0eaa8fede882253a3",
  measurementId: "G-6WZVWY2B4Q"
};

// Initialize Firebase
initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
