import { Button, Container } from '@/components';
import { useWorkoutPage } from '@/features/workouts/useWorkoutPage';

import { RepComponent } from '@/features/workouts/components/RepComponent';
import 'react-circular-progressbar/dist/styles.css';
import { HoldComponent } from '@/features/workouts/components/HoldComponent';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export const WorkoutPage = () => {
  const { query, state, nextRep, dispatch } = useWorkoutPage();
  const { data } = query;
  const inPreparePhase = state.phase === 'prepare';
  return (
    <Container containerClass={false} className="w-5/12 mx-auto">
      {data && (
        <>
          <div className="text-center">
            <Button asChild>
              <Link className="not-prose" to="/">
                List
              </Link>
            </Button>
            <h1
              className={cn({ 'my-0': !inPreparePhase })}
            >{`${inPreparePhase ? 'Prepare to do ' : ''} ${data.title}`}</h1>
            {state.phase !== 'prepare' && (
              <>
                <h2 className="my-0">
                  Sets: {state.currentSet}/{state.sets}
                </h2>
                <h3>
                  Reps: {state.currentRep}/{state.reps}
                </h3>
              </>
            )}
          </div>
          <div className="size-6/12 mx-auto" key={state.currentSet}>
            {state.phase === 'hold' ? (
              <HoldComponent
                hold={state.intervalBetweenSets}
                text="Wait"
                onHoldComplete={() =>
                  dispatch((draft) => {
                    draft.phase = 'active';
                  })
                }
              />
            ) : inPreparePhase ? (
              <HoldComponent
                hold={10}
                autostart={false}
                text="Get Ready"
                onHoldComplete={() => {
                  dispatch((draft) => {
                    draft.phase = 'active';
                  });
                }}
              />
            ) : (
              <>
                {state.phase === 'betweenReps' ? (
                  <HoldComponent
                    hold={state.intervalBetweenReps}
                    text="Wait"
                    onHoldComplete={() => {
                      dispatch((draft) => {
                        draft.phase = 'active';
                      });
                    }}
                  />
                ) : (
                  <RepComponent
                    hold={state.hold}
                    key={state.currentRep}
                    move={state.move}
                    moveRatio={state.moveRatio}
                    return={state.return}
                    returnRatio={state.returnRatio}
                    totalSteps={state.moveAndReturn}
                    nextRep={nextRep}
                  />
                )}
              </>
            )}
          </div>
        </>
      )}
    </Container>
  );
};
