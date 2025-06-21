import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Verify() {
  const [message, setMessage] = useState('Подтверждение...');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    fetch(`http://localhost:5000/api/auth/verify?token=${token}`)
      .then((res) => {
        if (res.ok) {
          setMessage('Email подтверждён ✅');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setMessage('❌ Ошибка подтверждения');
        }
      })
      .catch(() => setMessage('Сервер не отвечает'));
  }, []);

  return (
    <div className="verify-container">
      <h2>{message}</h2>
    </div>
  );
}
