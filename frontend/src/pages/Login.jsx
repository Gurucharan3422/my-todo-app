import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://my-todo-app-3iv4.onrender.com', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login Successful!');
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login Failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      {error && <p className="error-text">{error}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button className="auth-button" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
}

export default Login;