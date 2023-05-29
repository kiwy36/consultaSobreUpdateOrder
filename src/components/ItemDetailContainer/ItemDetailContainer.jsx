import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocument } from "../../utils/getFirestore";
import ItemDetail from "../ItemDetail/ItemDetail";

export const ItemDetailContainer = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    const getProduct = async (id) => {
        try {
            const res = await getDocument("Items", id);
            return res;
        } catch (err) {return console.log(err);}
    };

    useEffect(() => {
        getProduct(id)
        .then((res) => setProduct(res))
        .catch((err) => console.log(err));
    }, [id]);

    return (
        <>
        {product && Object.keys(product).length ? (
            <ItemDetail product={product} />
        ) : (
            <h1>Cargando...</h1>
        )}
        </>
    );
};

export default ItemDetailContainer;
