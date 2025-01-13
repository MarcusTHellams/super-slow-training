import { gql } from 'graphql-request';

export const GET_WORKOUTS = gql`
  query GET_WORKOUTS {
    workouts {
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

export const GET_WORKOUT = gql`
  query GET_WORKOUT($id: Int!) {
    workout(id: $id) {
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
