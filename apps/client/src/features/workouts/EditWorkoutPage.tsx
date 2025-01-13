import { Container } from '@/components';
import { WorkoutForm, type WorkoutSchema } from '@/features/workouts/components/WorkoutForm';
import { graphqlClient } from '@/lib';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_WORKOUT } from '@/features/workouts/graphql/queries.ts';
import { Workout } from '@/features/workouts/types.ts';
import { UPDATE_WORKOUT } from '@/features/workouts/graphql/mutations.ts';

export const EditWorkoutPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data } = useQuery({
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
      navigate('/');
    },
  });

  const submitHandler: ComponentProps<typeof WorkoutForm>['onSubmit'] = (workout) => {
    console.log('workout: ', workout);
    // mutate(workout);
  };
  return (
    <>
      <Container containerClass={false} className="w-11/12 md:w-3/12 mx-auto">
        <h1>Edit Workout</h1>
        {data && <WorkoutForm workout={data} onSubmit={submitHandler} />}
      </Container>
    </>
  );
};
