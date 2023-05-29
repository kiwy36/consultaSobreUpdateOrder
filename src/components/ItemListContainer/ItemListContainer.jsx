import { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import { getCollection } from '../../utils/getFirestore';
import './ItemListContainer.css';
import { useParams } from 'react-router-dom';

function ItemListContainer({ isCategoryRoute }) {
    const { id: categoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const obtenerProductos = () => {
        getCollection("Items")
            .then((response) => {
            if (isCategoryRoute) {
                const productosFiltrados = response.filter(
                (product) => product.category === categoryId
                );
                setProducts(productosFiltrados);
            } else {
                setProducts(response);
            }
            })
            .catch((err) => console.log(err));
        };

        obtenerProductos();
    }, [isCategoryRoute, categoryId]);

    return (
        <div>
            <ItemList products={products} />
        </div>
    );
}

export default ItemListContainer;

