import { useState } from 'react';

type CounterProps = {
  initialValue: number;
};

const Counter = (props: CounterProps) => {
  const { initialValue } = props;

  const [count, setCount] = useState(initialValue);

  function dec(i: number): number {
    return i - 1;
  }
  function inc(i: number): number {
    return i + 1;
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(dec(count))}>-</button>
      <button onClick={() => setCount(inc(count))}>+</button>
    </div>
  );
};

export default Counter;
