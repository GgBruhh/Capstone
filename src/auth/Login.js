import React from "react";
import axios from "axios";
import { useState } from "react";

function Login({history}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/login', { email, password });
      // Handle successful login, e.g., store token in localStorage
      console.log(response.data);
      history.push('/');
    } catch (error) {
      // Handle login error
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}


export default Login;