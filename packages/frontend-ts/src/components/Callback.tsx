import React, { useState, useCallback } from 'react';

type ButtonProps = {
  onClick: () => void;
};

const DecrementButton = (props: ButtonProps) => {
  const { onClick } = props;

  console.log('decrement');

  return <button onClick={onClick}>Decrement</button>;
};

const IncrementButton = React.memo((props: ButtonProps) => {
  const { onClick } = props;

  console.log('increment');

  return <button onClick={onClick}>Increment</button>;
});

const DoubleButton = React.memo((props: ButtonProps) => {
  const { onClick } = props;

  console.log('double');

  return <button onClick={onClick}>Double</button>;
});

export const Parent = () => {
  const [count, setCount] = useState(0);

  const decrement = () => {
    setCount((c) => c - 1);
  };

  const increment = () => {
    setCount((c) => c + 1);
  };

  const double = useCallback(() => {
    setCount((c) => c * 2);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <DecrementButton onClick={decrement} />
      <IncrementButton onClick={increment} />
      <DoubleButton onClick={double} />
    </div>
  );
};
