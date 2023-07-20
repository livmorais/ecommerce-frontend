import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { LoginData } from '../../interface/LoginData';
import './Login.css';

const API_URL = 'http://localhost:8080';

const useLoginDataMutate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, LoginData>(async (loginData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, loginData);
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      queryClient.setQueryData(['userRole'], role);
      navigate(role === 'admin' ? '/api/products' : '/products');
    } catch (error) {
    }
  });

  return mutation;
};

const Login = () => {
  const mutation = useLoginDataMutate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await mutation.mutateAsync({ login, password });
    } catch (error) {
    }
  };

  return (
    <div className='modal-login-container'>

    <div className="modal-overlay">
      <div className="modal-login">
        <h2>Login</h2>
        <form className="input-container-login">
          <div className="div-login">
            <label className="label-login">Username</label>
            <input className="input-login" value={login} onChange={(event) => setLogin(event.target.value)} />
          </div>
          <div className="div-login">
            <label className="label-login">Password</label>
            <input className="input-login" type="password" onChange={(event) => setPassword(event.target.value)} />
          </div>
        </form>
        <button onClick={handleLogin}>Enviar</button>
        <p><b>Don't have an account?</b> <Link to="/auth/register">Register</Link></p>
      </div>
    </div>
    </div>
  );
};

export default Login;