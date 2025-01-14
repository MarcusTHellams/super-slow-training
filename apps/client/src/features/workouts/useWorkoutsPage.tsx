import { graphqlClient } from '@/lib';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GET_WORKOUTS } from '@/features/workouts/graphql/queries';
import { type Workout } from '@/features/workouts//types';
import { type ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Button } from '@/components';
import { Link } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import { REMOVE_WORKOUT } from '@/features/workouts/graphql/mutations';
import { toast } from 'react-toastify';

const placeHolderData: Workout[] = [];

export const useWorkoutsPage = () => {
  const [workoutId, setWorkoutId] = useState<number>();
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['workouts'],
    queryFn: async () => {
      return graphqlClient
        .request<{ workouts: Workout[] }>(GET_WORKOUTS)
        .then(({ workouts }) => workouts);
    },
    placeholderData: keepPreviousData,
  });

  const { mutate } = useMutation<Workout, Error, number>({
    mutationKey: ['deleteWorkout'],
    async mutationFn(id) {
      return graphqlClient
        .request<{ removeWorkout: Workout }>(REMOVE_WORKOUT, {
          id: id,
        })
        .then((resp) => resp.removeWorkout);
    },
    onMutate() {
      toast.info('Deleting', { position: 'top-center', toastId: 'myID' });
    },
    onSuccess() {
      toast.dismiss('myID');
      toast.success(`Successfully deleted ${selectedWorkout?.title}`, { position: 'top-center' });
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
  });

  const selectedWorkout = query?.data?.find(({ id }) => id === workoutId);

  const onDeleteVerified = useCallback(() => {
    if (workoutId) {
      mutate(workoutId);
    }
  }, [workoutId, mutate]);

  const columns: ColumnDef<Workout>[] = useMemo(() => {
    return [
      {
        accessorKey: 'title',
        header: 'Title',
        cell({
          getValue,
          row: {
            original: { id },
          },
        }) {
          const value = getValue() as string;
          return (
            <Button variant="link" asChild>
              <Link
                to={`/workout/${id}`}
                className="after:content=[''] after:absolute after:inset-0 after:z-[1]"
              >
                {value}
              </Link>
            </Button>
          );
        },
      },
      {
        accessorKey: 'move',
        header: 'Move (s)',
      },
      {
        accessorKey: 'hold',
        header: 'Hold (s)',
      },
      {
        accessorKey: 'return',
        header: 'Return (s)',
      },
      {
        accessorKey: 'reps',
        header: 'Reps',
      },
      {
        accessorKey: 'sets',
        header: 'Sets',
      },
      {
        id: 'Actions',
        header: 'Actions',
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell({
          row: {
            original: { id },
          },
        }) {
          return (
            <div className="relative z-[2]">
              <Button asChild className="rounded-r-none" size="sm" variant="warning">
                <Link className="not-prose" to={`/workout/edit/${id}`}>
                  Edit
                </Link>
              </Button>
              <Button
                onClick={() => {
                  setAlertDialogOpen(true);
                  setWorkoutId(id);
                }}
                className="rounded-l-none"
                size="sm"
                variant="destructive"
              >
                DELETE
              </Button>
            </div>
          );
        },
      },
    ];
  }, []);

  const table = useReactTable({
    data: query.data || placeHolderData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    query,
    table,
    alertDialogOpen,
    setAlertDialogOpen,
    onDeleteVerified,
    selectedWorkout,
  };
};
