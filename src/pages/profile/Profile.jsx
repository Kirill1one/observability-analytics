import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import ParticlesBackground from '../../components/ParticlesBackground'

export default function Profile() {
  const [darkMode, setDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const user = {
    name: 'Admin',
    email: 'admin@example.com',
    role: 'Superuser',
    apiKey: 'pk_live_xxx'
  }

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
          <h2>⚙️ Профиль пользователя</h2>
          <ul>
            <li><strong>Имя:</strong> {user.name}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Роль:</strong> {user.role}</li>
            <li><strong>API ключ:</strong> {user.apiKey}</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
