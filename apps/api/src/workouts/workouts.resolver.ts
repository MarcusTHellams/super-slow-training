import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutInput, UpdateWorkoutInput } from '../graphql';

@Resolver('Workout')
export class WorkoutsResolver {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Mutation('createWorkout')
  create(@Args('createWorkoutInput') createWorkoutInput: CreateWorkoutInput) {
    return this.workoutsService.create(createWorkoutInput);
  }

  @Query('workouts')
  findAll() {
    return this.workoutsService.findAll();
  }

  @Query('workout')
  findOne(@Args('id') id: number) {
    return this.workoutsService.findOne(id);
  }

  @Mutation('updateWorkout')
  update(@Args('updateWorkoutInput') updateWorkoutInput: UpdateWorkoutInput) {
    return this.workoutsService.update(updateWorkoutInput);
  }

  @Mutation('removeWorkout')
  remove(@Args('id') id: number) {
    return this.workoutsService.remove(id);
  }
}
