import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Container,
  Loading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import { flexRender } from '@tanstack/react-table';
import { useWorkoutsPage } from '@/features/workouts/useWorkoutsPage';
import { Link } from 'react-router-dom';

export const WorkoutsPage = () => {
  const { table, alertDialogOpen, onDeleteVerified, selectedWorkout, setAlertDialogOpen, query } =
    useWorkoutsPage();
  return (
    <>
      <Loading isLoading={query.isLoading}>
        <Container>
          <h1 className="text-center">Super Slow Workouts</h1>
          <p className="text-right">
            <Button size="sm" asChild>
              <Link className="not-prose" to="/workout/create">
                Add New Workout
              </Link>
            </Button>
          </p>
          <div className="rounded border not-prose">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow className="relative" key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Container>
      </Loading>
      <AlertDialog open={alertDialogOpen} onOpenChange={() => setAlertDialogOpen((prev) => !prev)}>
        <AlertDialogContent className="not-prose">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{' '}
              <strong>{selectedWorkout?.title}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteVerified}>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
