"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  BrainCircuit,
  ChevronDown,
  CircleEllipsis,
  Computer,
  MoreHorizontal,
  Sigma,
} from "lucide-react";

import { Button } from "app/components/ui/button";
import { Checkbox } from "app/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";
import { Input } from "app/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/components/ui/table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableDemo<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const currentSemester = "2024/2025/2";

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [hideSelectedRows, setHideSelectedRows] = useState(false);

  return (
    <div className="w-full">

      <h2>Jelenlegi félév: {currentSemester}</h2>
      <div className="flex items-center py-4">
        <Input
          placeholder="Tárgyak szűrése..."
          value={
            (table.getColumn("course_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("course_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex p-3 space-x-4">
          <div className="flex items-center space-x-2">Jelmagyarázat:</div>

          <div className="flex items-center space-x-2">
            <Computer /> Informatika
          </div>
          <div className="flex items-center space-x-2">
            <BrainCircuit /> Számítástudomány
          </div>
          <div className="flex items-center space-x-2">
            <Sigma /> Matematika
          </div>
          <div className="flex items-center space-x-2">
            <CircleEllipsis /> Egyéb
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Oszlopok <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {typeof column.columnDef.header === "function"
                      ? (() => {
                          const el = column.columnDef.header("");
                          const child = el?.props?.children;
                          return typeof child === "string"
                            ? child
                            : Array.isArray(child)
                            ? child[0]
                            : child;
                        })()
                      : column.columnDef.header}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border w-full overflow-auto">
        <Table className="w-full min-w-[1000px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.filter((row) =>
                  hideSelectedRows ? !row.getIsSelected() : true
                )
                .map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex text-sm gap-2">
          <div className="text-muted-foreground flex items-center">
            {table.getFilteredSelectedRowModel().rows.length}/
            {table.getFilteredRowModel().rows.length} sor kiválasztva.
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={false}
            onClick={() => setHideSelectedRows((prev) => !prev)}
          >
            {hideSelectedRows ? "Mutasd az összeset" : "Kijelöltek elrejtése"}
          </Button>
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Előző
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Következő
          </Button>
        </div>
      </div>
    </div>
  );
}
