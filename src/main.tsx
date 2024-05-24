import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AppControlProvider } from './state/AppControlContext';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppControlProvider>
      <App />
    </AppControlProvider>
  </StrictMode>
);
