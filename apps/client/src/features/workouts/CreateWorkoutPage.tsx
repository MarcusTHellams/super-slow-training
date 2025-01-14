import { Container, Loading } from '@/components';
import { WorkoutForm, type WorkoutSchema } from '@/features/workouts/components/WorkoutForm';
import { CREATE_WORKOUT } from '@/features/workouts/graphql/mutations.ts';
import { Workout } from '@/features/workouts/types.ts';
import { graphqlClient } from '@/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ComponentProps, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const CreateWorkoutPage = () => {
  const [isCreatingWorkout, setIsCreatingWorkout] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation<Workout, Error, WorkoutSchema>({
    mutationKey: ['createWorkout'],
    async mutationFn(values) {
      return graphqlClient
        .request<{ createWorkout: Workout }>(CREATE_WORKOUT, {
          createWorkoutInput: values,
        })
        .then((resp) => {
          return resp.createWorkout;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      toast.success('Successfully Created a Workout');
      navigate('/');
    },
    onSettled() {
      setIsCreatingWorkout(false);
    },
  });

  const submitHandler: ComponentProps<typeof WorkoutForm>['onSubmit'] = (workout) => {
    setIsCreatingWorkout(true);
    mutate(workout);
  };
  return (
    <>
      <Loading isLoading={isCreatingWorkout}>
        <Container containerClass={false} className="w-11/12 md:w-3/12 mx-auto">
          <h1>Create Workout</h1>
          <WorkoutForm onSubmit={submitHandler} />
        </Container>
      </Loading>
    </>
  );
};
