import { Container, Loading } from '@/components';
import { WorkoutForm, type WorkoutSchema } from '@/features/workouts/components/WorkoutForm';
import { UPDATE_WORKOUT } from '@/features/workouts/graphql/mutations.ts';
import { GET_WORKOUT } from '@/features/workouts/graphql/queries.ts';
import { Workout } from '@/features/workouts/types.ts';
import { graphqlClient } from '@/lib';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ComponentProps, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const EditWorkoutPage = () => {
  const [isEditingWorkout, setIsEditingWorkout] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['workout', id],
    async queryFn() {
      return graphqlClient
        .request<{ workout: Workout }>(GET_WORKOUT, { id: Number(id) })
        .then((resp) => {
          return resp.workout;
        });
    },
  });

  const { mutate } = useMutation<Workout, Error, WorkoutSchema>({
    mutationKey: ['updateMutation', id],
    async mutationFn(values) {
      return graphqlClient
        .request<{ updateWorkout: Workout }>(UPDATE_WORKOUT, {
          updateWorkoutInput: { id: Number(id), ...values },
        })
        .then((resp) => {
          return resp.updateWorkout;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      toast.success('Successfully Edited a Workout');
      navigate('/');
    },
    onSettled() {
      setIsEditingWorkout(false);
    },
  });

  const submitHandler: ComponentProps<typeof WorkoutForm>['onSubmit'] = (workout) => {
    setIsEditingWorkout(true);
    mutate(workout);
  };
  return (
    <>
      <Loading isLoading={isEditingWorkout || isLoading}>
        <Container containerClass={false} className="w-11/12 md:w-3/12 mx-auto">
          <h1>Edit Workout</h1>
          {data && <WorkoutForm workout={data} onSubmit={submitHandler} />}
        </Container>
      </Loading>
    </>
  );
};
