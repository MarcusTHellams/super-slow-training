import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { StartStopButton } from '@/features/workouts/components/StartStopButton';
import 'react-circular-progressbar/dist/styles.css';
import { useTimer } from 'use-timer';
import { useSpeech } from '@/features/workouts/hooks/useSpeech';

type HoldComponentProps = {
  hold: number;
  onHoldComplete: () => void;
  autostart?: boolean;
  text?: string;
};

export const HoldComponent = ({
  hold,
  onHoldComplete,
  autostart = true,
  text = 'Hold',
}: HoldComponentProps) => {
  const { speech, synth } = useSpeech();

  const { time, status, pause, start } = useTimer({
    endTime: hold,
    autostart,
    onTimeUpdate(time) {
      if (time !== 0) {
        speech.text = `${time === 1 ? text : ''} ${time}`;
        synth.speak(speech);
      }
    },
    onTimeOver() {
      setTimeout(() => {
        onHoldComplete();
      }, 500);
    },
  });

  const buttonState = () => {
    let buttonText = 'Stop';
    let buttonFn = () => {};

    if (status === 'RUNNING') {
      buttonText = 'Stop';
      buttonFn = pause;
    }
    if (status === 'PAUSED' || status === 'STOPPED') {
      buttonText = 'Start';
      buttonFn = start;
    }

    return {
      buttonText,
      buttonFn,
    };
  };

  return (
    <>
      <CircularProgressbar
        value={time}
        minValue={0}
        maxValue={hold}
        text={`
        ${text}
        ${time}`}
        styles={buildStyles({
          textSize: '.9rem',
        })}
      />
      <StartStopButton
        text={buttonState().buttonText.toUpperCase()}
        onClick={buttonState().buttonFn}
      />
    </>
  );
};
