import { Workout } from '@/features/workouts/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';

import { z } from 'zod';

const workoutSchema = z.object({
  title: z.string({ required_error: 'Title is Required' }).min(1, 'Title is Required'),
  reps: z
    .union([z.literal(''), z.coerce.number().positive('Reps must be a Positive Digit')])
    .optional()
    .transform((val) => (isNaN(val as number) ? undefined : Number(val))),
  sets: z
    .union([z.literal(''), z.coerce.number().positive('Sets must be a Positive Digit')])
    .optional() .transform((val) => (isNaN(val as number) ? undefined : Number(val))),
  move: z
    .union([z.literal(''), z.coerce.number().positive('Move must be a Positive Digit')])
    .optional().transform((val) => (isNaN(val as number) ? undefined : Number(val))),
  hold: z
    .union([z.literal(''), z.coerce.number().positive('Hold must be a Positive Digit')])
    .optional().transform((val) => (isNaN(val as number) ? undefined : Number(val))),
  return: z
    .union([z.literal(''), z.coerce.number().positive('Return must be a Positive Digit')])
    .optional().transform((val) => (isNaN(val as number) ? undefined : Number(val))),
  intervalBetweenReps: z
    .union([
      z.literal(''),
      z.coerce.number().positive('Interval Between Reps must be a Positive Digit'),
    ])
    .optional().transform((val) => (isNaN(val as number) ? undefined : Number(val))),
  intervalBetweenSets: z
    .union([
      z.literal(''),
      z.coerce.number().positive('Interval Between Sets must be a Positive Digit'),
    ])
    .optional().transform((val) => (isNaN(val as number) ? undefined : Number(val))),
});

export type WorkoutSchema = z.infer<typeof workoutSchema>;

type WorkoutFormProps = {
  workout?: Workout;
  onSubmit: (workout: WorkoutSchema) => void;
};

export const WorkoutForm = ({ workout, onSubmit }: WorkoutFormProps) => {
  const form = useForm<WorkoutSchema>({
    defaultValues: workout,
    resolver: zodResolver(workoutSchema),
  });

  const submitHandler = form.handleSubmit(onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={submitHandler} noValidate className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>The Title of the Workout.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sets</FormLabel>
              <FormControl>
                <Input min={0} type="number" inputMode="numeric" {...field} />
              </FormControl>
              <FormDescription>The Number of sets for the Workout.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reps</FormLabel>
              <FormControl>
                <Input min={0} type="number" inputMode="numeric" {...field} />
              </FormControl>
              <FormDescription>The Number of reps in each set for the Workout.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="move"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Move in Seconds</FormLabel>
              <FormControl>
                <Input min={0} type="number" inputMode="numeric" {...field} />
              </FormControl>
              <FormDescription>The move part of the rep in seconds.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="return"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Return in Seconds</FormLabel>
              <FormControl>
                <Input min={0} type="number" inputMode="numeric" {...field} />
              </FormControl>
              <FormDescription>The return part of the rep in seconds.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hold Position in Seconds</FormLabel>
              <FormControl>
                <Input min={0} type="number" inputMode="numeric" {...field} />
              </FormControl>
              <FormDescription>
                The hold duration between move and return in seconds.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="intervalBetweenReps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interval Between Reps in Seconds</FormLabel>
              <FormControl>
                <Input min={0} type="number" inputMode="numeric" {...field} />
              </FormControl>
              <FormDescription>The Interval Between Reps in seconds.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="intervalBetweenSets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interval Between Sets in Seconds</FormLabel>
              <FormControl>
                <Input min={0} type="number" inputMode="numeric" {...field} />
              </FormControl>
              <FormDescription>The Interval Between Sets in seconds.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
