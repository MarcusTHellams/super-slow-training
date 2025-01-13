import { Button } from '@/components';
import { cn } from '@/lib/utils';

type StartStopButtonProps = {
  text: string;
  onClick: () => void;
  containerDivClass?: string;
  buttonClass?: string;
};

export const StartStopButton = ({
  onClick,
  text,
  containerDivClass = '',
  buttonClass = '',
}: StartStopButtonProps) => {
  return (
    <div className={cn('my-8', containerDivClass)}>
      <Button className={cn('w-full', buttonClass)} variant="blue" onClick={onClick}>
        {text}
      </Button>
    </div>
  );
};
