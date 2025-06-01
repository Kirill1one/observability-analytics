import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../pages/Dashboard.css';

export default function Sidebar({ sidebarOpen, isMobile, toggleSidebar, toggleTheme, darkMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <Link to="/dashboard" className="sidebar-header">
  <div className="logo-icon">📊</div>
  {sidebarOpen && <span className="logo-text">Observability Analytics</span>}
</Link>


      <nav className="sidebar-nav">
        <div className="nav-section">
          {sidebarOpen && <div className="section-title">Мониторинг</div>}

          <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
            <span className="nav-icon">📈</span>
            {sidebarOpen && <span className="nav-label">Дашборд</span>}
          </Link>

          <Link to="/metrics" className={`nav-item ${isActive('/metrics') ? 'active' : ''}`}>
            <span className="nav-icon">🧮</span>
            {sidebarOpen && <span className="nav-label">Метрики</span>}
          </Link>
 

          <Link to="/geo" className={`nav-item ${isActive('/geo') ? 'active' : ''}`}>
            <span className="nav-icon">🌍</span>
            {sidebarOpen && <span className="nav-label">География</span>}
          </Link>
        </div>

        <div className="nav-section">
          {sidebarOpen && <div className="section-title">Настройки</div>}

          <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
            <span className="nav-icon">⚙️</span>
            {sidebarOpen && <span className="nav-label">Профиль</span>}
          </Link>

          <Link to="/settings" className={`nav-item ${isActive('/settings') ? 'active' : ''}`}>
            <span className="nav-icon">🔧</span>
            {sidebarOpen && <span className="nav-label">Настройки</span>}
          </Link>

          <button className="nav-item" onClick={toggleTheme}>
            <span className="nav-icon">{darkMode ? '☀️' : '🌙'}</span>
            {sidebarOpen && <span className="nav-label">{darkMode ? 'Светлая тема' : 'Темная тема'}</span>}
          </button>

          <button className="nav-item logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            {sidebarOpen && <span className="nav-label">Выйти</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
}
