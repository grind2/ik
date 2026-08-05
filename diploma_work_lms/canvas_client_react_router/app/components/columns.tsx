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
  BookUp,
  BrainCircuit,
  Check,
  ChevronDown,
  CircleEllipsis,
  Computer,
  MoreHorizontal,
  Sigma,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "app/components/ui/dialog";

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
import CourseOptionsTable from "./courseoptionstable";
import { useState } from "react";

export type Course = {
  id: string;
  course_name: string;
  credits: number;
  course_type: "mat" | "inf" | "szám" | "egyéb";
  completed: boolean;
  is_mandatory: boolean;
};

export const columns: ColumnDef<Course>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "completed",
    header: "Teljesített",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("completed") ? <Check /> : <X />}
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "Azonosító",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "course_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kurzus
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("course_name")}</div>,
  },
  {
    accessorKey: "credits",
    header: () => <div className="text-right">Kredit</div>,
    cell: ({ row }) => {
      const credits = parseFloat(row.getValue("credits"));

      return <div className="text-right font-medium">{credits}</div>;
    },
  },
  {
    accessorKey: "course_type",
    header: () => <div className="text-right">Ismeretkör</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          {row.getValue("course_type") == "inf" ? (
            <Computer />
          ) : row.getValue("course_type") == "mat" ? (
            <Sigma />
          ) : row.getValue("course_type") == "szám" ? (
            <BrainCircuit />
          ) : (
            <CircleEllipsis />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "is_mandatory",
    header: () => <div className="text-right">Kötelező?</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("is_mandatory") ? "Igen" : "Nem"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Tárgyfelvétel</div>,
    cell: ({ row }) => {
      const course = row.original;

      const [open, setOpen] = useState(false);

      return (
        <div className="text-right">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="link" size="sm">
                <BookUp />
                Csoportok
              </Button>
            </DialogTrigger>
            <DialogContent
              className="w-[90vw] max-w-[90vw]"
              style={{ maxWidth: "60vw" }}
            >
              <DialogHeader>
                <DialogTitle>Választható kurzusok</DialogTitle>
                <DialogDescription>
                  Oktató és időpont kiválasztása
                </DialogDescription>
              </DialogHeader>

              <CourseOptionsTable
                courseid={course.id}
                closeDropdown={() => setOpen(false)}
              ></CourseOptionsTable>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
