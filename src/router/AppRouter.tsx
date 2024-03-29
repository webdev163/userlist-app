import { Suspense } from 'react';
import { Navigate, RouteProps, createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '~/pages/LoginPage';
import { UsersPage } from '~/pages/UsersPage';
import { RequireAuth } from './RequireAuth';
import { InitProvider } from '~/components/common/InitProvider';
import { RouterPaths } from '~/utils/constants';

type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
};

const routes = [
  { path: RouterPaths.LOGIN, element: <LoginPage /> },
  { path: RouterPaths.USERS, element: <UsersPage />, authOnly: true },
];

const renderWithWrapper = (route: AppRoutesProps) => {
  const element = <Suspense fallback={null}>{route.element}</Suspense>;

  return {
    index: route.path === RouterPaths.LOGIN,
    path: route.path === RouterPaths.LOGIN ? undefined : route.path,
    element: <InitProvider>{route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}</InitProvider>,
  };
};

export const router = createBrowserRouter([
  {
    errorElement: <Navigate to={RouterPaths.LOGIN} replace />,
    children: routes.map(renderWithWrapper),
  },
]);
