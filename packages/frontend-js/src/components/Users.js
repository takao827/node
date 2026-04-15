import { useState, useEffect } from 'react';
import '../App.css';

function User({ name }) {
  return <li>{name}</li>;
}

const getUsers = async () => {
  const response = await fetch('/api/users');
  const data = response.json();
  return data;
};

function Users() {
  const [users, setUsers] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    getUsers()
      .then((data) => {
        const users = data.users.map((user) => user.name);
        return users;
      })
      .then((users) => setUsers(users));
  }, []);

  const userList = users.map((user) => <User key={user} name={user} />);

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

export default Users;
