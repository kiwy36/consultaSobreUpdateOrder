import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";

const ItemCount = ({ stock, onAdd, onGoToHome, onCount }) => {
    const [selectedQuantity, setSelectedQuantity] = useState(0);

    const handleQuantityChange = (quantity) => {
        if (quantity >= 0 && quantity <= stock) {
        setSelectedQuantity(quantity);
        }
    };

    const handleAddToCart = () => {
        if (selectedQuantity > 0 && selectedQuantity <= stock) {
        onAdd(selectedQuantity);
        onCount(selectedQuantity); // Llamar a la nueva prop onCount y pasar la cantidad seleccionada
        } else {
        alert("La cantidad seleccionada no es válida.");
        }
    };

    return (
        <div>
            <ButtonGroup>
                <Button
                color="secondary"
                onClick={() => handleQuantityChange(selectedQuantity - 1)}
                >
                -
                </Button>
                <Button
                color="secondary"
                onClick={() => handleQuantityChange(selectedQuantity + 1)}
                >
                +
                </Button>
            </ButtonGroup>
            <Button onClick={handleAddToCart}>Agregar al carrito</Button>
            <Button onClick={onGoToHome}>Volver al Inicio</Button>
            <p>Cantidad seleccionada: {selectedQuantity}</p>
        </div>
    );
};

export default ItemCount;
