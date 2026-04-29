import Text from './Text';

const Message = (props: {}) => {
  const content1 = 'This is parent component';
  const content2 = 'Mesage uses Text component';

  return (
    <div>
      <Text content={content1} />
      <Text content={content2} />
    </div>
  );
};

export default Message;
