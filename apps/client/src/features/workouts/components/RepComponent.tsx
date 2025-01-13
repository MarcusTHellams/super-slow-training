import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';

import { RadialSeparators } from '@/features/workouts/components/RadialSeparators';
import { useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { useTimer } from 'use-timer';
import { HoldComponent } from '@/features/workouts/components/HoldComponent';
import { cn } from '@/lib/utils';
import { StartStopButton } from './StartStopButton';
import { useSpeech } from '@/features/workouts/hooks/useSpeech';

type WhichTimer = 'move' | 'return' | 'hold';

type RepComponentProps = {
  move: number;
  moveRatio: number;
  return: number;
  returnRatio: number;
  totalSteps: number;
  hold?: number;
  nextRep?: () => void;
};

export const RepComponent = ({
  move,
  moveRatio,
  return: rt,
  returnRatio,
  totalSteps,
  hold = 0,
  nextRep = () => {},
}: RepComponentProps) => {
  const { speech, synth } = useSpeech();
  const onTimeUpdate = (text: string) => (time: number) => {
    if (time !== 0) {
      speech.text = `${time === 1 ? text : ''} ${time}`;
      synth.speak(speech);
    }
  };
  const returnTimer = useTimer({
    endTime: rt,
    onTimeUpdate: onTimeUpdate('Return'),
    onTimeOver() {
      setTimeout(() => {
        nextRep();
      }, 500);
    },
  });

  const [whichTimer, setWhichTimer] = useState<WhichTimer>('move');
  const moveTimer = useTimer({
    endTime: move,
    onTimeUpdate: onTimeUpdate('Move'),
    onTimeOver() {
      setTimeout(() => {
        if (hold > 0) {
          setWhichTimer('hold');
          return;
        }
        setWhichTimer('return');
        returnTimer.start();
      }, 500);
    },
    autostart: true,
  });

  const buttonState = () => {
    let buttonText = 'Stop';
    let buttonFn = () => {};
    if (whichTimer === 'move') {
      if (moveTimer.status === 'RUNNING') {
        buttonText = 'Stop';
        buttonFn = moveTimer.pause;
      }
      if (moveTimer.status === 'PAUSED' || moveTimer.status === 'STOPPED') {
        buttonText = 'Start';
        buttonFn = moveTimer.start;
      }
    }
    if (whichTimer === 'return') {
      if (returnTimer.status === 'RUNNING') {
        buttonText = 'Stop';
        buttonFn = returnTimer.pause;
      }
      if (returnTimer.status === 'PAUSED' || returnTimer.status === 'STOPPED') {
        buttonText = 'Start';
        buttonFn = returnTimer.start;
      }
    }
    return {
      buttonText,
      buttonFn,
    };
  };
  const onHoldComplete = () => {
    setWhichTimer('return');
    returnTimer.start();
  };

  return (
    <>
      {whichTimer === 'hold' && <HoldComponent {...{ hold, onHoldComplete, prefixSpeech: true }} />}
      <div className={cn({ hidden: whichTimer === 'hold' })}>
        <CircularProgressbarWithChildren
          value={moveTimer.time}
          minValue={0}
          maxValue={move}
          text={`${whichTimer.toUpperCase()} ${whichTimer === 'move' ? moveTimer.time : returnTimer.time}`}
          strokeWidth={10}
          // move percentage
          circleRatio={moveRatio}
          styles={buildStyles({
            strokeLinecap: 'butt',
            pathColor: 'red',
            textSize: '.9rem',
          })}
        >
          {/* <h5 className="absolute top-[35%] font-extrabold">{whichTimer.toUpperCase()}</h5> */}
          <CircularProgressbar
            value={returnTimer.time}
            strokeWidth={10}
            minValue={0}
            maxValue={rt}
            // return percentage
            circleRatio={returnRatio}
            styles={buildStyles({
              // rotation should match move percentage
              rotation: moveRatio,
              strokeLinecap: 'butt',
              pathColor: 'green',
            })}
          />
          <RadialSeparators
            count={totalSteps}
            style={{
              background: '#fff',
              width: '10px',
              // This needs to be equal to props.strokeWidth
              height: `${10}%`,
            }}
          />
        </CircularProgressbarWithChildren>
        <StartStopButton
          onClick={buttonState().buttonFn}
          text={buttonState().buttonText.toUpperCase()}
        />
      </div>
    </>
  );
};
