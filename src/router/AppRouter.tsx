import { Suspense } from 'react';
import { Navigate, RouteProps, createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '~/pages/LoginPage';
import { ListPage } from '~/pages/ListPage';
import { RequireAuth } from './RequireAuth';
import { AuthProvider } from '~/components/auth/AuthProvider';
import { RouterPaths } from '~/utils/constants';

type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
};

const routes = [
  { path: RouterPaths.LOGIN, element: <LoginPage /> },
  { path: RouterPaths.LIST, element: <ListPage />, authOnly: true },
];

const renderWithWrapper = (route: AppRoutesProps) => {
  const element = <Suspense fallback={<p>Loading...</p>}>{route.element}</Suspense>;

  return {
    index: route.path === RouterPaths.LOGIN,
    path: route.path === RouterPaths.LOGIN ? undefined : route.path,
    element: <AuthProvider>{route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}</AuthProvider>,
  };
};

export const router = createBrowserRouter([
  {
    errorElement: <Navigate to={RouterPaths.LOGIN} replace />,
    children: routes.map(renderWithWrapper),
  },
]);
