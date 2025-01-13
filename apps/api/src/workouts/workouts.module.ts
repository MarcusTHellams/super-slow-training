import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsResolver } from './workouts.resolver';

@Module({
  providers: [WorkoutsResolver, WorkoutsService],
})
export class WorkoutsModule {}
