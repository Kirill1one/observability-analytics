export const stats = [
  { title: 'Активность', value: '1,240', trend: '+12%' },
  { title: 'Ошибки', value: '24', trend: '-3%' },
  { title: 'Пользователи', value: '563', trend: '+8%' },
  { title: 'Скорость', value: '1.2s', trend: '+0.5%' }
];

export const chartDataByPeriod = {
  '7d': {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    datasets: [{
      label: 'Ошибки',
      data: [4, 8, 6, 2, 9, 5, 3],
      borderColor: '#ff6d00',
      tension: 0.4
    }]
  },
  '30d': {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    datasets: [{
      label: 'Ошибки',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() + 10)),
      borderColor: '#ff6d00',
      tension: 0.3
    }]
  }
};
