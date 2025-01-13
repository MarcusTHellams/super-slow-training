import { graphqlClient } from '@/lib';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { GET_WORKOUT } from '@/features/workouts/graphql/queries';
import { type Workout } from '@/features/workouts/types';
import { useCallback, useReducer } from 'react';
import { produce } from 'immer';

type Phase = 'hold' | 'prepare' | 'active' | 'betweenReps';

type WorkOutState = Omit<Workout, 'id' | 'title'> & {
  moveRatio: number;
  returnRatio: number;
  currentMove: number;
  currentReturn: number;
  moveAndReturn: number;
  currentRep: number;
  currentSet: number;
  phase: Phase;
};

type Action = (state: WorkOutState) => void | WorkOutState;

const reducer = (state: WorkOutState, action: Action): WorkOutState => {
  return produce(state, action);
};

const calculateState = (serverWorkout: Workout): Partial<WorkOutState> => {
  const {
    hold,
    intervalBetweenReps,
    intervalBetweenSets,
    move,
    reps,
    return: ret,
    sets,
  } = serverWorkout;

  const moveAndReturn = move + ret;

  return {
    hold,
    intervalBetweenReps,
    intervalBetweenSets,
    move,
    reps,
    return: ret,
    sets,
    moveRatio: move / moveAndReturn,
    returnRatio: ret / moveAndReturn,
    currentMove: 0,
    currentReturn: 0,
    moveAndReturn,
    currentRep: 1,
    currentSet: 1,
    phase: 'prepare',
  };
};

export const useWorkoutPage = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, {} as WorkOutState);
  const query = useQuery({
    queryKey: ['workout', Number(id)],
    async queryFn() {
      return graphqlClient
        .request<{ workout: Workout }>(GET_WORKOUT, { id: Number(id) })
        .then((resp) => {
          dispatch(() => {
            return calculateState(resp.workout) as WorkOutState;
          });
          return resp.workout;
        });
    },
  });

  const nextSet = useCallback(() => {
    dispatch((draft) => {
      if (draft.currentSet < draft.sets) {
        if (draft.intervalBetweenSets > 0) {
          draft.phase = 'hold';
        }
        draft.currentSet++;
        draft.currentRep = 1;
      }
    });
  }, []);

  const nextRep = useCallback(() => {
    dispatch((draft) => {
      if (draft.reps === draft.currentRep && draft.sets === draft.currentSet) {
        draft.currentSet = 1;
        draft.currentRep = 1;
        draft.phase = 'prepare';
        return;
      }

      draft.currentRep++;

      if (draft.intervalBetweenReps > 0 && draft.currentRep !== 1) {
        draft.phase = 'betweenReps';
      }
      if (draft.currentRep > draft.reps) {
        nextSet();
      }
    });
  }, [nextSet]);

  return {
    query,
    state,
    dispatch,
    nextRep,
    nextSet,
  };
};
