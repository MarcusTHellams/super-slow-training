import { useState } from 'react';

export const useSpeech = () => {
  const [speech] = useState(() => {
    const speech = new SpeechSynthesisUtterance();
    return speech;
  });
  return { speech, synth: window.speechSynthesis };
};
