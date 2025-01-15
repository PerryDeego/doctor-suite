// admin/src/components/ ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error captured in Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        return <h1 className='mt-14 text-center text-2xl font-large'>Oops, something went wrong in the application.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;