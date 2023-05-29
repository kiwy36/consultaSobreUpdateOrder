import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import './Item.css'
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Item = ({ product }) => {
    return (
        <div className="cardItem">
            <ul>
                <img src={product.image} alt={product.name} />
                <li><h1>{product.name}</h1></li>
                <li>
                    <Button color="secondary">
                        <NavLink to={`/item/${product.id}`} style={{ textDecoration: 'none', color: 'white' }}>Detalles</NavLink>
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default Item;
