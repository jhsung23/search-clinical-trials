import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import { MainPage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
]);

export default router;
