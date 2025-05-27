import { useEffect, useState } from 'react';
import './Dashboard.css';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);  



import Sidebar from '../components/Sidebar' ;
import Header from '../components/Header';
import StatsSection from '../components/StatsSection';
import ChartSection from '../components/ChartSection';
import MapSection from '../components/MapSection';

   


const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  
  const stats = [
    { title: 'Активность', value: '1,240', trend: '+12%' },
    { title: 'Ошибки', value: '24', trend: '-3%' },
    { title: 'Пользователи', value: '563', trend: '+8%' },
    { title: 'Скорость', value: '1.2s', trend: '+0.5%' }
  ];
  
  const chartData = {
    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
    datasets: [{
      label: 'Ошибки',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: '#ff6d00',
      tension: 0.4
    }]
  };
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) setSidebarOpen(false)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    };
  }, []);

  return (
    <div className={`dashboard ${darkMode ? 'dark' : 'light'}`}>
      <div className="dashboard-bg"></div>

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
              <StatsSection stats={stats} />
              <section className="charts-section">
                <ChartSection chartData={chartData} />
                <MapSection darkMode={darkMode} />
              </section>
            </>
          )}
        </div>
      </main>

      {isMobile && sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default Dashboard;
