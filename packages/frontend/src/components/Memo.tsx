import React, { useState, useMemo } from 'react';

export const Memo = () => {
  const [text, setText] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onClickButton = () => {
    setItems((prevItems) => {
      return [...prevItems, text];
    });
    setText('');
  };

  const numOfChar1 = items.reduce((sub, item) => {
    console.log('111');
    return sub + item.length;
  }, 0);
  const numOfChar2 = useMemo(() => {
    return items.reduce((sub, item) => {
      console.log('222');
      return sub + item.length;
    }, 0);
  }, [items]);

  return (
    <div>
      <p>Memo</p>
      <div>
        <input type="text" value={text} onChange={onChangeInput} />
        <button onClick={onClickButton}>Add</button>
      </div>
      <div>
        {items.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div>
        <p>Total Number of Charactors 1: {numOfChar1}</p>
        <p>Total Number of Charactors 2: {numOfChar2}</p>
      </div>
    </div>
  );
};
