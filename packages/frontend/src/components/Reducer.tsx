import { useReducer } from 'react';

type Action = 'DECREMENT' | 'INCREMENT' | 'DOUBLE' | 'RESET';

const reducer = (currentCount: number, action: Action) => {
  function dec(i: number): number {
    return i - 1;
  }
  function inc(i: number): number {
    return i + 1;
  }
  function double(i: number): number {
    return i * 2;
  }
  function reset(): number {
    return 0;
  }

  switch (action) {
    case 'DECREMENT':
      return dec(currentCount);
    case 'INCREMENT':
      return inc(currentCount);
    case 'DOUBLE':
      return double(currentCount);
    case 'RESET':
      return reset();
    default:
      return currentCount;
  }
};

type CounterProps = {
  initialValue: number;
};

const Counter = (props: CounterProps) => {
  const { initialValue } = props;

  const [count, dispatch] = useReducer(reducer, initialValue);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch('DECREMENT')}>-</button>
      <button onClick={() => dispatch('INCREMENT')}>+</button>
      <button onClick={() => dispatch('DOUBLE')}>*2</button>
      <button onClick={() => dispatch('RESET')}>Reset</button>
    </div>
  );
};

export default Counter;
