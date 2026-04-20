const Hello = () => {
  const onClick = () => {
    alert('hello');
  };
  const text = 'hello, react';
  return <div onClick={onClick}>{text}</div>;
};

export default Hello;
