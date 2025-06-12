import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import ParticlesBackground from '../../components/ParticlesBackground'

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState(true)

  return (
    <div className={`dashboard ${darkMode ? 'dark' : 'light'}`}>
      <ParticlesBackground />
      <Sidebar
        sidebarOpen={sidebarOpen}
        isMobile={isMobile}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        toggleTheme={() => setDarkMode(!darkMode)}
        darkMode={darkMode}
      />
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="dashboard-content">
          <h2>🔧 Настройки</h2>
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            Получать уведомления
          </label>
        </div>
      </main>
    </div>
  )
}
