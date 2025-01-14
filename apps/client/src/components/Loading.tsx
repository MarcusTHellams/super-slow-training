import { PropsWithChildren } from 'react';
import { Dialog, DialogOverlay } from './ui';
import { Loader } from 'lucide-react';

type LoadingProps = {
  isLoading: boolean;
};

export const Loading = ({ isLoading, children }: PropsWithChildren<LoadingProps>) => {
  return (
    <>
      {children}
      <Dialog open={isLoading}>
        <DialogOverlay>
          <div className="h-screen flex justify-center items-center text-white">
            <Loader className="size-1/2 animate-spin-slow" />
          </div>
        </DialogOverlay>
      </Dialog>
    </>
  );
};
