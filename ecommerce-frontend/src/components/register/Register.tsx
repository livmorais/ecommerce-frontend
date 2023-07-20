import axios from "axios";
import { useState } from "react";
import './Register.css'
import { Link } from "react-router-dom";

const API_URL = 'http://localhost:8080';

function Register() {
    const [formData, setFormData] = useState({
      login: '',
      email: '',
      password: '',
      role: ''
    });
    const [alertMessage, setAlertMessage] = useState('');
  
    const handleChange = (e: any) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value
      }));
    };
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(`${API_URL}/auth/register`, formData);
        if (response.status === 200) {
          setAlertMessage('Account created successfully!');
          // Redirecionar para a página de login ou exibir uma mensagem de sucesso, por exemplo
        } else {
          setAlertMessage('Failed to create account.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setAlertMessage('Failed to create account.');
        // Tratar o erro de registro, exibir mensagem de erro, etc.
      }
    };
  
    return (
      <div className="modal-register-container">
        {alertMessage && <div className="alert">{alertMessage}</div>}
        <form className="modal-overlay-register" onSubmit={handleSubmit}>
          <div className="modal-register">
        <h2>Register</h2>

          <div className="div-register-container">
            <label className="label-register" htmlFor="login">Username:</label>
            <input className="input-register"
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleChange}
            />
          </div>
          <div className="div-register-container">
            <label className="label-register" htmlFor="email">Email:</label>
            <input className="input-register"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="div-register-container">
            <label className="label-register" htmlFor="password">Password:</label>
            <input className="input-register"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="div-register-container">
            <label className="label-register" htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="USER">Buyer</option>
              <option value="ADMIN">Seller</option>
            </select>
          </div>
          <button type="submit">Register</button>
          <p><b>Already have an account?</b> <Link to="/">Login</Link></p>
          </div>
        </form>
      </div>
    );
  }
  
  export default Register;