"use client";

import { LabelList, Pie, PieChart } from "recharts";
//import type { Route } from "./+types/advancements";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "app/components/ui/chart";
import { Progress } from "./ui/progress";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

type MyPieChartProps = {
  data: [number, number, number, number, string, number, number];
};

const szamtud = {
  A: 2,
  B: 7,
  C: 7,
};

const info = {
  A: 7,
  B: 2,
  C: 13,
};

const chartConfig = {
  visitors: {
    label: "Kreditek",
  },
  teljesitendo: {
    label: "Teljesítendő",
    color: "hsl(var(--chart-1))",
  },
  info: {
    label: "Informatika",
    color: "hsl(var(--chart-2))",
  },
  matek: {
    label: "Matematika",
    color: "hsl(var(--chart-3))",
  },
  szamtud: {
    label: "Számítástudomány",
    color: "hsl(var(--chart-4))",
  },
  egyeb: {
    label: "Egyéb",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const chartConfigSkill = {
  desktop: {
    label: "Kreditek",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MyPieChart({ data }: MyPieChartProps) {
  //only szabvals and totals
  //[szám, mat, inf, egyéb, user.specialisation, számszab, infszab]
  const all_credits_left = 180 - (data[0] + data[1] + data[2] + data[3]);
  const all_completed_credits = data[0] + data[1] + data[2] + data[3];

  const max = Math.max(...data.slice(0, 3));
  const max_index = data.slice(0, 3).indexOf(max);

  const subjects = ["Számítástudomány", "Matematika", "Informatika"];

  const chartDataSkill = [
    { month: "Infó", desktop: data[2] },
    { month: "Matek", desktop: data[1] },
    { month: "Számt.", desktop: data[0] },
  ];

  const chartData = [
    { browser: "teljesitendo", visitors: all_credits_left, fill: "#e5e0e0" },
    { browser: "info", visitors: data[2], fill: "#bababc" },
    { browser: "matek", visitors: data[1], fill: "#929293" },
    { browser: "szamtud", visitors: data[0], fill: "#6a6a6b" },
    { browser: "egyeb", visitors: data[3], fill: "#146b6b" },
  ];

  const szakirany = data[4] as "A" | "B" | "C";

  return (
    <div className="flex gap-4">
      <Card className="flex-auto w-[350px]">
        <CardHeader className="items-center pb-0">
          <CardTitle>Teljesített kreditek</CardTitle>
          <CardDescription>Ismeretkörökre bontva</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="visitors" hideLabel />}
              />
              <Pie data={chartData} dataKey="visitors">
                <LabelList
                  dataKey="browser"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex text-center leading-none gap-3 text-muted-foreground">
            Még {all_credits_left} kredit kell az abszolváláshoz
          </div>
        </CardFooter>
      </Card>

      <Card className="flex-auto w-[350px]">
        <CardHeader className="items-center pb-0">
          <CardTitle>Teljesítendő kreditek</CardTitle>
          <CardDescription>{`A szakirányodon (${szakirany}) teljesítendő szabadon választható kreditek`}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 ">
          <div className="grid grid-cols-2 gap-4 min-h-[250px]">
            <div>Informatika</div>
            <div>
              {" "}
              {data[6] + "/" + info[szakirany]}{" "}
              {info[szakirany] < data[6] ? "✔️" : "⏳"}
            </div>
            <div className="col-span-2">
              <Progress value={(data[6] / info[szakirany]) * 100} />{" "}
            </div>
            <div>Számítástudomány</div>
            <div>
              {data[5] + "/" + szamtud[szakirany]}{" "}
              {info[szakirany] < data[5] ? "✔️" : "⏳"}
            </div>
            <div className="col-span-2">
              <Progress value={(data[5] / szamtud[szakirany]) * 100} />{" "}
            </div>
            <div>Összes</div>
            <div>
              {all_completed_credits + "/180"}{" "}
              {180 < all_completed_credits ? "✔️" : "⏳"}
            </div>
            <div className="col-span-2">
              <Progress value={(all_completed_credits / 180) * 100} />{" "}
            </div>
          </div>

          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex text-center leading-none mt-10 text-muted-foreground">
              Informatikából még {info[szakirany] - data[6]},
              Számítástudományból még {szamtud[szakirany] - data[5]} kredit
              szükséges
            </div>
          </CardFooter>
        </CardContent>
      </Card>

      <Card className="flex-auto w-[350px]">
        <CardHeader className="items-center pb-4">
          <CardTitle>Képesség-ábra</CardTitle>
          <CardDescription>Elvégzett kreditek ismeretkörönként</CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <ChartContainer
            config={chartConfigSkill}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadarChart data={chartDataSkill}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarGrid gridType="circle" />
              <PolarAngleAxis dataKey="month" />
              <Radar
                dataKey="desktop"
                fill="var(--color-desktop)"
                fillOpacity={0.6}
                dot={{
                  r: 4,
                  fillOpacity: 1,
                }}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center text-center gap-2 leading-none text-muted-foreground">
            Jelenleg a legerősebb ismeretköröd a(z) {subjects[max_index]} {max}{" "}
            elvégzett kredittel
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
