import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export type ContainerProps = {
  asChild?: boolean;
  containerClass?: boolean;
} & React.ComponentProps<'main'>;

export const Container = ({
  className,
  containerClass = true,
  asChild,
  ...rest
}: ContainerProps) => {
  const Comp = asChild ? Slot : 'main';
  return <Comp className={cn({ container: containerClass }, 'my-16', className)} {...rest} />;
};
