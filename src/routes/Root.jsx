import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import { getCollection } from '../utils/getFirestore';

function Root() {
  const { id: categoryId } = useParams();
  const isCategoryRoute = Boolean(categoryId);
  const ContextValue = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getListItem = () => {
      getCollection("items")
        .then((result) => {
          setProducts(result);
        })
        .catch((err) => console.log(err));
    };

    getListItem();
  }, []);

  return (
    <ItemListContainer
      isCategoryRoute={isCategoryRoute}
      categoryId={categoryId}
      products={products}
    />
  );
}

export default Root;