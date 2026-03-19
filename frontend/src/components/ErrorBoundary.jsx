import { Component } from 'react';
import SectionHeading from './ui/SectionHeading';

/**
 * ErrorBoundary - Catches React component errors and displays fallback UI
 * Prevents entire app from crashing on component failures
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="section-shell py-20">
          <div className="mx-auto max-w-md">
            <SectionHeading
              eyebrow="Oops"
              title="Something went wrong"
              copy={this.state.error?.message || 'An unexpected error occurred. Please try refreshing the page.'}
            />
            <button
              onClick={this.resetError}
              className="mt-8 rounded-lg bg-forest-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-forest-700"
            >
              Try Again
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
