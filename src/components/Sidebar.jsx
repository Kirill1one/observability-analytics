import '../pages/Dashboard.css';

export default function Sidebar({ sidebarOpen, isMobile, toggleSidebar, toggleTheme, darkMode }) {
  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header" onClick={!isMobile ? toggleSidebar : undefined}>
        <div className="logo-icon">📊</div>
        {sidebarOpen && <span className="logo-text">AnalyticsPro</span>}
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section">
          {sidebarOpen && <div className="section-title">Мониторинг</div>}
          <button className="nav-item">
            <span className="nav-icon">📈</span>
            {sidebarOpen && <span className="nav-label">Дашборд</span>}
          </button>
          <button className="nav-item">
            <span className="nav-icon">🧮</span>
            {sidebarOpen && <span className="nav-label">Метрики</span>}
          </button>
        </div>
        <div className="nav-section">
          {sidebarOpen && <div className="section-title">Настройки</div>}
          <button className="nav-item">
            <span className="nav-icon">⚙️</span>
            {sidebarOpen && <span className="nav-label">Профиль</span>}
          </button>
          <button className="nav-item" onClick={toggleTheme}>
            <span className="nav-icon">{darkMode ? '☀️' : '🌙'}</span>
            {sidebarOpen && <span className="nav-label">{darkMode ? 'Светлая тема' : 'Темная тема'}</span>}
          </button>
        </div>
      </nav>
    </aside>
  )
}
