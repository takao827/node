import React, { JSX } from 'react';

type ContainerProps = {
  title: string;
  children: React.ReactNode;
};

const Container = (props: ContainerProps): JSX.Element => {
  const { title, children } = props;

  return (
    <div style={{ background: 'red' }}>
      <span>{title}</span>
      <div>{children}</div>
    </div>
  );
};

const Parent = () => {
  return (
    <Container title="Hello">
      <p>子供だよ</p>
    </Container>
  );
};

export default Parent;
