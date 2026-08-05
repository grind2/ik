import {
  redirect,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useRevalidator,
} from "react-router";
import type { Route } from "./+types/home";
import pb from "app/routes/auth/pocketbase";
import { useState } from "react";
import { DataTableDemo } from "~/components/my-data-table";
import { type Course, columns } from "~/components/columns";

export default function Home() {
  const { mycourses } = useOutletContext();

  return (
    <>
      <DataTableDemo columns={columns} data={mycourses}></DataTableDemo>
    </>
  );
}
