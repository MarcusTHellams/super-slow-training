
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateWorkoutInput {
    title: string;
    reps?: Nullable<number>;
    sets?: Nullable<number>;
    move?: Nullable<number>;
    hold?: Nullable<number>;
    return?: Nullable<number>;
    intervalBetweenReps?: Nullable<number>;
    intervalBetweenSets?: Nullable<number>;
}

export class UpdateWorkoutInput {
    id: number;
    title?: Nullable<string>;
    reps?: Nullable<number>;
    sets?: Nullable<number>;
    move?: Nullable<number>;
    hold?: Nullable<number>;
    return?: Nullable<number>;
    intervalBetweenReps?: Nullable<number>;
    intervalBetweenSets?: Nullable<number>;
}

export class Workout {
    id: number;
    title: string;
    reps: number;
    sets: number;
    move: number;
    hold: number;
    return: number;
    intervalBetweenReps: number;
    intervalBetweenSets: number;
}

export abstract class IQuery {
    abstract workouts(): Nullable<Workout>[] | Promise<Nullable<Workout>[]>;

    abstract workout(id: number): Nullable<Workout> | Promise<Nullable<Workout>>;
}

export abstract class IMutation {
    abstract createWorkout(createWorkoutInput: CreateWorkoutInput): Workout | Promise<Workout>;

    abstract updateWorkout(updateWorkoutInput: UpdateWorkoutInput): Workout | Promise<Workout>;

    abstract removeWorkout(id: number): Nullable<Workout> | Promise<Nullable<Workout>>;
}

type Nullable<T> = T | null;
