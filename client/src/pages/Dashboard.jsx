 
import { useEffect, useState } from 'react';
import './Dashboard.css';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsSection from '../components/StatsSection';
import ChartSection from '../components/ChartSection';
import MapSection from '../components/MapSection';
import ParticlesBackground from '../components/ParticlesBackground';

import { stats, chartDataByPeriod } from '../mock/fakeDashboardData';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [period, setPeriod] = useState('7d');
  const [chartData, setChartData] = useState(chartDataByPeriod['7d']);

  // Поддержка мобильной адаптации и симуляция загрузки
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Обновление данных при смене периода
  useEffect(() => {
    setChartData(chartDataByPeriod[period]);
  }, [period]);

  return (
    <div className={`dashboard ${darkMode ? 'dark' : 'light'}`}>
      <ParticlesBackground
        density={8000}
        maxDistance={120}
        lineColor="rgba(255, 255, 255, 0.2)"
        particleColors={[
          'rgba(100, 200, 255, 0.6)',
          'rgba(255, 100, 200, 0.6)',
        ]}
      />

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
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <>
              <div className="dashboard-controls">
                <label>Период:</label>
                <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                  <option value="7d">7 дней</option>
                  <option value="30d">30 дней</option>
                </select>
              </div>

              <StatsSection stats={stats} />

              <section className="charts-section">
                <ChartSection chartData={chartData} />
                <MapSection darkMode={darkMode} />
              </section>
            </>
          )}
        </div>
      </main>

      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;
