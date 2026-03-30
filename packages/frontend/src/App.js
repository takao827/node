import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [users, setUsers] = useState([
    'John Doe',
    'Jane Doe',
    'John Smith',
    'Jane Smith',
  ]);

  const userList = users.map((user) => <li key={user}>{user}</li>);

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsers([...users, inputText]);
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="App">
      <ul>{userList}</ul>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
      <div>{inputText}</div>
    </div>
  );
}

export default App;
