 
import '../pages/Dashboard.css';

export default function StatsSection({ stats }) {
  return (
    <section className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <h3 className="stat-title">{stat.title}</h3>
          <p className="stat-value">{stat.value}</p>
          <span className={`stat-trend ${stat.trend.startsWith('+') ? 'up' : 'down'}`}>
            {stat.trend}
          </span>
        </div>
      ))}
    </section>
  )
}
