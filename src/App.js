import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  console.log(users);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    //post or send data to the server
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        form.reset();
        console.log("success", data);
      });
  };
  return (
    <div className="App">
      <h1>My Own data:{users.length}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          required
        />
        <input type="submit" value="Add User" />
      </form>
      {users.map((user) => (
        <li key={user.id}>
          {" "}
          Id: {user.id}
          Name: {user.name} Email:{user.email} Phone: {user.phone}
        </li>
      ))}
    </div>
  );
}

export default App;
