import { Line } from 'react-chartjs-2';
import ErrorBoundary from './ErrorBoundary';

export default function ChartSection({ chartData }) {
  return (
    <div className="chart-container">
      <h3>Статистика ошибок</h3>
      <div className="chart-wrapper">
        <ErrorBoundary>
          <Line />
        </ErrorBoundary>
      </div>
    </div>
  );
};
