import '../pages/Dashboard.css';

export default function Header({ sidebarOpen, toggleSidebar, searchQuery, setSearchQuery }) {
  return (
    <header className="dashboard-header">
      <button className="menu-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? '◀' : '▶'}
      </button>
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
        <button className="notification-btn">🔔<span className="badge">2</span></button>
        <div className="user-profile">
          <img src="https://i.pravatar.cc/40" alt="User" className="user-avatar" />
          <span className="user-name">Admin</span>
        </div>
      </div>
    </header>
  )
}
