import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.info(error, errorInfo);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      // @TODO Render error page
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ErrorBoundary;
