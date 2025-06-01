import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import '../pages/Dashboard.css';
 
export default function Header({ sidebarOpen, toggleSidebar, searchQuery, setSearchQuery }) {

  const location = useLocation()

  const routeTitles = {
    '/dashboard': 'Дашборд',
    '/metrics': 'Метрики',
    '/geo': 'География',
    '/profile': 'Профиль',
    '/settings': 'Настройки'
  }
  const pageTitle = routeTitles[location.pathname] || 'Дашборд';

  

  return (
    <header className="dashboard-header">
      <button className="menu-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? '◀' : '▶'}
      </button>

      <h2 className="page-title">{pageTitle}</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="header-actions">
        <button className="notification-btn">🔔<span className="badge">12</span></button>
        <div className="user-profile">
          <img src="https://i.pravatar.cc/40" alt="User" className="user-avatar" />
          <span className="user-name">Admin</span>
        </div>
      </div>
    </header>
  )
}