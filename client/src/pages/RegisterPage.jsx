// import React from 'react'
import axios from "axios";
import { useState } from "react";
import { Link, redirect } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post('/api/register', {
          name,
          email,
          password
      })
      alert('Registration Successful. Now you can log in');
      navigate('/profile');
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  } 

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser} >
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary mt-1">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
