import { createUser } from "../api";
import { useState } from "react";

export function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent page refresh
    let response = await createUser(user); // Send user data
    alert("User Created!"); // Notify user
    if(response.status !== 200) {
        alert("User account could not be created:(")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={handleChange} name="name" required maxLength={20} />
      <input placeholder="Email" onChange={handleChange} name="email" required maxLength={40} />
      <input placeholder="Password" onChange={handleChange} name="password" required maxLength={40} />
      <button type="submit">Create Account</button>
    </form>
  );
}
