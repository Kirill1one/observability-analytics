import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import ParticlesBackground from '../../components/ParticlesBackground'
import MapSection from '../../components/MapSection'

export default function Geo() {
  const [darkMode, setDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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
          <h2>🌍 География пользователей</h2>
          <MapSection darkMode={darkMode} />
        </div>
      </main>
    </div>
  )
}
