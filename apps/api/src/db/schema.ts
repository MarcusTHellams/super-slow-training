import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const workoutTable = sqliteTable('Workout', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  reps: int().notNull().default(1),
  sets: int().notNull().default(1),
  move: int().notNull().default(1),
  hold: int().notNull().default(1),
  return: int().notNull().default(1),
  intervalBetweenReps: int().notNull().default(0),
  intervalBetweenSets: int().notNull().default(0),
});

export type WorkoutInsert = typeof workoutTable.$inferInsert;
export type WorkoutSelect = typeof workoutTable.$inferSelect;
