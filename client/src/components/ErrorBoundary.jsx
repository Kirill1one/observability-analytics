import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ padding: 20, color: 'red' }}>Ошибка при загрузке графика</div>;
    }

    return this.props.children;
  }
}
