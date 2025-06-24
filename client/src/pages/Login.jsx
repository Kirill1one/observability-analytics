import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    navigate('/dashboard');
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Вход</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit">Войти</button>
        <p className="switch-mode">
          Нет аккаунта? <span onClick={() => navigate('/register')}>Зарегистрироваться</span>
        </p>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
