import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    navigate('/dashboard');
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Регистрация</h1>
        <input
          type="email"
          placeholder="Ваш Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}

        />
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit" disabled={!!!email || password.length < 6}>
          Зарегистрироваться
        </button>
        <p className="switch-mode">
          Уже есть аккаунт? <span onClick={() => navigate('/login')}>Войти</span>
        </p>
        {success && <div className="success">{success}</div>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
