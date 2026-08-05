import {
  redirect,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useRevalidator,
} from "react-router";
import type { Route } from "./+types/advancements";
import pb from "app/routes/auth/pocketbase";
import { MyPieChart } from "~/components/pie-chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";

type MyPieChartProps = {
  data: [number, number, number, number, string, number, number];
};

export default function Advancements({ loaderData }: Route.ComponentProps) {
  const { advancements } = useOutletContext();
  
  return (
    <>
      <MyPieChart data={advancements}></MyPieChart>
    </>
  );
}
