import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { StoreProvider } from '~/store/components/StoreProvider';
import { router } from '~/router/AppRouter';
import { ErrorBoundary } from './components/common/ErrorBoundary';

import './styles/globals.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </ErrorBoundary>,
);
