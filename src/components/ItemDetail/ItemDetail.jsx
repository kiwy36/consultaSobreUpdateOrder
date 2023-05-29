import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { Button, ButtonGroup } from "reactstrap";
import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount";
import { createOrder, updateOrder } from "../../utils/createUpdatedFirestore";

const ItemDetail = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (quantity) => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  const handlerAddOrder = (items) => {
    createOrder(items);
  };

  const handlerCount = (count) => {
    if (count > 0) {
      handlerAddOrder({
        name: product.name,
        price: product.price,
        total: product.price * count,
      });
      updateOrder(product.productId, product.stock - count);
    }
  };

  return (
    <div className="container itemDetail">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Precio: ${product.price} kiwy pesos</p>
          <p>Stock: {product.stock} en disposición</p>
          <ItemCount
            stock={product.stock}
            onAdd={handleAddToCart}
            onGoToHome={handleGoToHome}
            onCount={handlerCount}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

