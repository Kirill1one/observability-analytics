import { useEffect, useState } from 'react'
import './Metrics.css'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import ChartSection from '../../components/ChartSection'
import ParticlesBackground from '../../components/ParticlesBackground'

import { chartDataByPeriod } from '../../mock/fakeDashboardData'

import { sendAnalyticsEvent } from "../../api/analytics";

sendAnalyticsEvent("page_view", { path: window.location.pathname });
sendAnalyticsEvent("button_click", { id: "register" });

const Metrics = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [period, setPeriod] = useState('7d')
  const [chartData, setChartData] = useState(chartDataByPeriod['7d'])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) setSidebarOpen(false)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setChartData(chartDataByPeriod[period])
  }, [period])

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
          <h2>Метрики 📊</h2>
          <div className="dashboard-controls">
            <label>Период:</label>
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="7d">7 дней</option>
              <option value="30d">30 дней</option>
            </select>
          </div>

          <section className="charts-section">
            <ChartSection chartData={chartData} />
          </section>
        </div>
      </main>

      {isMobile && sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}

export default Metrics
