import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './redux/store'; // Adjust import path accordingly
import UV_LandingPage from './components/UV_LandingPage'; // Adjust paths
import UV_OtherViewExample from './components/UV_OtherViewExample';

// Optional: Implement or import an Error Boundary component
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // Log error
    console.error('Error Boundary Caught:', error, info);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const AppRoot = () => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          {/* You can add Theme providers or global styles here */}
          <Routes>
            <Route path="/" element={<UV_LandingPage />} />
            <Route path="/find/:slugexample" element={<UV_OtherViewExample />} />
            {/* Add additional routes as needed */}
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default AppRoot;