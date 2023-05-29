import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/Navbar/CustomNavbar';
import Root from './routes/Root';
import ItemDetailContainerRoot from './routes/ItemDetailContainerRoot';
import CartWidget from './components/CartWidget/CartWidget';
import Footer from './components/Footer/Footer';

function App() {

    return (
        <BrowserRouter>
            <CustomNavbar />
            <Footer/>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/category/:id" element={<Root />} />
                <Route path="/item/:id" element={<ItemDetailContainerRoot />} />
                <Route path="/cart" element={<CartWidget />} />
                <Route path="/checkout" element={<div/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

