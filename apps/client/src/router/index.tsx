import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import { WorkoutsPage } from '@/features/workouts/WorkoutsPage';
import { WorkoutPage } from '@/features/workouts/WorkoutPage';
import { EditWorkoutPage } from '@/features/workouts/EditWorkoutPage';
import { CreateWorkoutPage } from '@/features/workouts/CreateWorkoutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <WorkoutsPage />,
      },
      {
        path: '/workout/:id',
        element: <WorkoutPage />,
      },
      {
        path: '/workout/edit/:id',
        element: <EditWorkoutPage />,
      },
      {
        path: '/workout/create',
        element: <CreateWorkoutPage />,
      },
    ],
  },
]);
