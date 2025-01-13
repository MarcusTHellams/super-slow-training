import { Injectable } from '@nestjs/common';
import { CreateWorkoutInput, UpdateWorkoutInput } from 'src/graphql';
import { db } from 'src/db/connection';
import { workoutTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class WorkoutsService {
  async create(createWorkoutInput: CreateWorkoutInput) {
    return db
      .insert(workoutTable)
      .values(createWorkoutInput)
      .returning()
      .then((res) => res[0]);
  }

  async findAll() {
    return db.query.workoutTable.findMany();
  }

  findOne(id: number) {
    return db.query.workoutTable.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id);
      },
    });
  }

  async update(updateWorkoutInput: UpdateWorkoutInput) {
    return db
      .update(workoutTable)
      .set(updateWorkoutInput)
      .where(eq(workoutTable.id, updateWorkoutInput.id))
      .returning()
      .then((res) => res[0]);
  }

  async remove(id: number) {
    return db
      .delete(workoutTable)
      .where(eq(workoutTable.id, id))
      .limit(1)
      .returning()
      .then((res) => res[0]);
  }
}
