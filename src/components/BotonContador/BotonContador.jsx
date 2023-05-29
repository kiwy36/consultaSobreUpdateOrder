import { useState } from 'react';
import './Boton.css';
import Contador from '../../Hooks/useCount';


const BotonContador = () => {
    const { count, Increment, Decrement, Reset } = Contador(0, 5);

    return (
        <div className="boton-container">
            <h1>tienes {count} cosos marcados</h1>
            <button onClick={Decrement}>-</button>
            <button onClick={Increment}>+</button>
            <button onClick={Reset}>reiniciar</button>
        </div>
    );
};

export default BotonContador;

/* VERSION ANTERIOR - AUN NO DESCARTABLE?
import { useState } from 'react';
import './Boton.css';


const BotonContador = () => {
    const [count, setCount] = useState(0);
    const [stock, setStock] = useState(10);

    const Increment = () => {
        if (count < stock) {
        setCount(count + 1);
        }
    };

    const Decrement = () => {
        if (count > 0) {
        setCount(count - 1);
        }
    };

    return (
        <div className="boton-container">
            <h1>tienes {count} cosos marcados</h1>
            <button onClick={Decrement}>-</button>
            <button onClick={Increment}>+</button>
            <button onClick={()=>setCount(0)}> re iniciar </button>
        </div>
    );
};

export default BotonContador;

const useCount = (initialCount, stock) => {
    const [count, setCount] = useState(initialCount);

    const increment = () => {
        if (count < stock) {
        setCount(count + 1);
        }
    };

    const decrement = () => {
        if (count > 0) {
        setCount(count - 1);
        }
    };

    const reset = () => {
        setCount(initialCount);
    };

    return { count, increment, decrement, reset };
};
/**/