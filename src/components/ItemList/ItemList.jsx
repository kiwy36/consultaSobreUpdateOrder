import React from "react";
import Item from "../Item/Item";

const ItemList = ({ products, onSelectProduct  }) => {
    return (
        <div className="itemList">
            {products.map((product) => (
                <Item key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ItemList;
