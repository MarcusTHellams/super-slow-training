import { gql } from 'graphql-request';

export const UPDATE_WORKOUT = gql`
  mutation UPDATE_WORKOUT($updateWorkoutInput: UpdateWorkoutInput!) {
    updateWorkout(updateWorkoutInput: $updateWorkoutInput) {
      id
      title
      reps
      sets
      move
      hold
      return
      intervalBetweenReps
      intervalBetweenSets
    }
  }
`;

export const CREATE_WORKOUT = gql`
  mutation CREATE_WORKOUT($createWorkoutInput: CreateWorkoutInput!) {
    createWorkout(createWorkoutInput: $createWorkoutInput) {
      id
      title
      reps
      sets
      move
      hold
      return
      intervalBetweenReps
      intervalBetweenSets
    }
  }
`;
