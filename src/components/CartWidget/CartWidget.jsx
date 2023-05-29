import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./CartWidget.css";
import { createOrder, updateOrder } from "../../utils/createUpdatedFirestore";

const CartWidget = () => {
    const { cartItems, getCartTotal, removeItem, clearCart } = useContext(CartContext);
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleRemoveItem = (productId) => {
        removeItem(productId);
    };
    const navigate = useNavigate();
    const handleGoToHome = () => {
        navigate("/");
    };

    const handleFinishPurchase = () => {
        const total = getCartTotal();

        // Validar inputs
        if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
        setErrorMessage("El Nombre y apellido no están completados correctamente");
        return;
        }
        if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
        setErrorMessage(
            "El Número de tarjeta no está completado correctamente (debe contener 16 dígitos)"
        );
        return;
        }
        if (!securityCode || !/^\d{3}$/.test(securityCode)) {
        setErrorMessage(
            "El Código de seguridad no está completado correctamente (debe contener 3 dígitos)"
        );
        return;
        }
        setErrorMessage(""); // Limpiar el mensaje de error si todo está correcto

        // Lógica para crear la orden y finalizar la compra
        createOrder(cartItems, clearCart,{total}) // <-- Aquí es donde se llama a createOrder
            .then((orderId) => {
            cartItems.forEach((item) => {
                const productId = item.product.id;
                const finalStock = item.product.stock - item.quantity;
                updateOrder(productId, finalStock);
                });
                //updateOrder(orderId, total);
                clearCart();
                alert("¡Compra terminada!");
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage("Error al procesar la compra. Por favor, intenta nuevamente.");
            });
        };
    return (
        <div className="cartWidget">
            {cartItems.length > 0 ? (
                <>
                    <div className="productList">
                        {cartItems.map((item) => (
                            <div key={item.product.id} className="cartItem">
                                <Card className="productCard">
                                    <Card.Img
                                        variant="top"
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="productImage"
                                    />
                                    <Card.Body>
                                        <Card.Title>{item.product.name}</Card.Title>
                                        <Card.Text>
                                            <strong>Precio:</strong> ${item.product.price} kiwy pesos
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Cantidad:</strong> {item.quantity}
                                        </Card.Text>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleRemoveItem(item.product.id)}>
                                            Eliminar
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                    <p className="totalAmount">Total: ${getCartTotal()} kiwy pesos</p>
                    <div>
                        <div className="inputContainer">
                            <label htmlFor="nameInput">Nombre y Apellido:</label>
                            <input
                                type="text"
                                id="nameInput"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="cardNumberInput">Número de Tarjeta:</label>
                            <input
                                type="text"
                                id="cardNumberInput"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="securityCodeInput">Código de Seguridad:</label>
                            <input
                                type="text"
                                id="securityCodeInput"
                                value={securityCode}
                                onChange={(e) => setSecurityCode(e.target.value)}
                            />
                        </div>
                        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                        <Button variant="success" onClick={handleFinishPurchase}>
                            Terminar Compra
                        </Button>
                        <Button onClick={handleGoToHome}>Volver al Inicio</Button>
                    </div>
                </>
            ) : (
                <>
                    <p>No hay productos en el carrito</p>
                    <Button onClick={handleGoToHome}>Volver al Inicio</Button>
                </>
            )}
        </div>
    );
};

export default CartWidget;
