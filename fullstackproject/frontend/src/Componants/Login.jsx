import { verifyUser } from "../api";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent page refresh
    let response = await verifyUser(user); // Send user data
    if(response) {
        navigate("/home")
        sessionStorage.setItem("User", response)
        axios.defaults.headers.common["Authorization"] = `Bearer ${response}`
    }else{
    alert("Login Failed")
  }
}

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" onChange={handleChange} name="email" required maxLength={40} />
      <input placeholder="Password" onChange={handleChange} name="password" required maxLength={40} />
      <button type="submit">Login</button>
    </form>
  );
}
