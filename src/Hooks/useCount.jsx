import { useState } from 'react';

const Contador = (initialCount, stock) => {
    const [count, setCount] = useState(initialCount);

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

    const Reset = () => {
        setCount(initialCount);
    };

    return { count, Increment, Decrement, Reset };
};

export default Contador;
