import type { Route } from "./+types/exams";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/components/ui/table";
import pb from "./auth/pocketbase";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "app/components/ui/select";
import {
  Award,
  Calendar,
  CalendarX,
  Circle,
  CircleCheck,
  CircleOff,
  CircleX,
  Milestone,
  SquareCheckBig,
  SquareX,
  Trash2,
  TriangleAlert,
  User,
} from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "app/components/ui/hover-card";
import { useEffect, useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "app/components/ui/alert-dialog";
import { toast } from "sonner";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const users_exams = await pb.collection("course_instance").getFullList({
    filter: `students ~ "${pb.authStore.record.id}"`,
    expand:
      "course,course.exams,course.exams.results,course.exams.results.judge",
  });

  const exams = users_exams
    .filter((e) => e.expand.course.exams.length != 0)
    .map((e) => e.expand.course);

  const sortedExams = exams.map((course) => ({
    ...course,
    expand: {
      ...course.expand,
      exams: [...course.expand.exams].sort(
        (a, b) => new Date(a.time) - new Date(b.time)
      ),
    },
  }));


  return sortedExams;
}

async function takeExam(id_of_exam) {
  const one_record = await pb.collection("exams").getOne(id_of_exam);

  let copyofrecord = one_record;

  copyofrecord.participants.push(pb.authStore.record.id);

  const record = await pb.collection("exams").update(id_of_exam, copyofrecord);

  toast("Sikeres vizsgajelentkezés.", {
    description:
      "Dátum: " +
      new Intl.DateTimeFormat("hu-HU", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(one_record.time)),
  });
}

async function deleteExam(id_of_exam) {
  const one_record = await pb.collection("exams").getOne(id_of_exam);

  let copyofrecord = one_record;

  copyofrecord.participants.splice(
    copyofrecord.participants.indexOf(pb.authStore.record.id),
    1
  );

  const record = await pb.collection("exams").update(id_of_exam, copyofrecord);

  toast("Vizsgajelentkezés törölve.");
}

export default function Exams({ loaderData }: Route.ComponentProps) {
  const [currentlyTaking, setCurrentlyTaking] = useState(() =>
    Object.fromEntries(
      loaderData.map((item) => [
        item.id,
        item.expand.exams.find((e) =>
          e.participants.includes(pb.authStore.record.id)
        )?.id || "",
      ])
    )
  );

  const [changedSinceReload, setChangedSinceReload] = useState(() =>
    Object.fromEntries(loaderData.map((item) => [item.id, false]))
  );

  return (
    <>
      <Table>
        <TableCaption>Az elérhető vizsgák listája.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Azonosító</TableHead>
            <TableHead>Kurzus</TableHead>
            <TableHead>Előkövetelmények teljesülnek</TableHead>
            <TableHead>Állapot</TableHead>
            <TableHead>Vizsgajelentkezés</TableHead>
            <TableHead className="text-right">Próbálkozások</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loaderData.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="font-medium">{e.id}</TableCell>
              <TableCell>{e.course_name}</TableCell>
              <TableCell className="flex gap-1">
                {e.length == 0 ? (
                  <>
                    Nincs előkövetelmény <SquareCheckBig />
                  </>
                ) : (
                  e.prerequisites.map((p) =>
                    pb.authStore.record.completed_courses.includes(p) ? (
                      <div key={p}>
                        {p}
                        <SquareCheckBig />
                      </div>
                    ) : (
                      <div key={p}>
                        {p}
                        <SquareX />
                      </div>
                    )
                  )
                )}
              </TableCell>

              <TableCell>
                {e.prerequisites.filter((value) =>
                  pb.authStore.record.completed_courses.includes(value)
                ).length == 0 ? (
                  <HoverCard>
                    <HoverCardTrigger className="text-right">
                      <TriangleAlert />
                    </HoverCardTrigger>
                    <HoverCardContent className="grid width-100px">
                      <>Az előkövetelmények nem teljesülnek.</>
                    </HoverCardContent>
                  </HoverCard>
                ) : e.expand.exams
                    .filter((e) => e.results.length != 0)
                    .filter((exam) => exam.expand.results[0].result > 1)
                    .length > 0 ? (
                  <HoverCard>
                    <HoverCardTrigger className="text-right">
                      <Award />
                    </HoverCardTrigger>
                    <HoverCardContent className="grid width-100px">
                      Tárgy sikeresen teljesítve.
                    </HoverCardContent>
                  </HoverCard>
                ) : e.expand.exams
                    .filter((e) => e.results.length != 0)
                    .filter((exam) => exam.expand.results[0].result == 1)
                    .length == e.exams_maximum_attempts ? (
                  <HoverCard>
                    <HoverCardTrigger className="text-right">
                      <CircleOff />
                    </HoverCardTrigger>
                    <HoverCardContent className="grid width-100px">
                      <>Felhasználta az összes vizsgalehetőség</>
                    </HoverCardContent>
                  </HoverCard>
                ) : e.expand.exams.filter(
                    (exam) => Date.parse(exam.time) > Date.now()
                  ).length == 0 ? (
                  <HoverCard>
                    <HoverCardTrigger className="text-right">
                      <CalendarX />
                    </HoverCardTrigger>
                    <HoverCardContent className="grid width-100px">
                      <>Nincs több hátralévő vizsgalehetőség.</>
                    </HoverCardContent>
                  </HoverCard>
                ) : (
                  <></>
                )}
              </TableCell>

              <TableCell>
                <div className="flex">
                  <Select
                    disabled={
                      e.prerequisites.filter((value) =>
                        pb.authStore.record.completed_courses.includes(value)
                      ).length == 0 ||
                      currentlyTaking[e.id] !== "" ||
                      e.expand.exams
                        .filter((e) => e.results.length != 0)
                        .filter((exam) => exam.expand.results[0].result == 1)
                        .length == e.exams_maximum_attempts ||
                      e.expand.exams.filter(
                        (exam) => Date.parse(exam.time) > Date.now()
                      ).length == 0
                    }
                    value={currentlyTaking[e.id]}
                    onValueChange={(value) => {
                      if (currentlyTaking[e.id] === "") {
                        setCurrentlyTaking((items) => ({
                          ...items,
                          [e.id]: value,
                        }));

                        setChangedSinceReload((items) => ({
                          ...items,
                          [e.id]: true,
                        }));

                        takeExam(value);
                      }
                    }}
                  >
                    <SelectTrigger className="w-[420px]">
                      <SelectValue placeholder="Válassz időpontot" />
                    </SelectTrigger>
                    <SelectContent className="w-[420px]">
                      {e.expand.exams.map((sube) => (
                        <SelectItem
                          key={sube.id}
                          value={sube.id}
                          disabled={
                            sube.participants.length ==
                            sube.maximum_participants
                          }
                        >
                          <Calendar />
                          {new Intl.DateTimeFormat("hu-HU", {
                            dateStyle: "short",
                            timeStyle: "short",
                          }).format(new Date(sube.time))}{" "}
                          <User />
                          {currentlyTaking[e.id] === "" &&
                          changedSinceReload[e.id]
                            ? sube.participants.length
                            : sube.participants.length + 1}
                          /{sube.maximum_participants} <Milestone />
                          {sube.location}
                          {sube.participants.length ==
                            sube.maximum_participants &&
                          currentlyTaking[e.id] === "" ? (
                            <> (megtelt)</>
                          ) : (
                            <></>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {currentlyTaking[e.id] !== "" ? (
                    <>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash2 />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Biztosan törlöd a{" "}
                              <span className="font-bold">{`${e.course_name} (${e.id})`}</span>{" "}
                              kurzus vizsgajelentkezésed?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Mégsem</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                setCurrentlyTaking((items) => ({
                                  ...items,
                                  [e.id]: "",
                                }));

                                deleteExam(currentlyTaking[e.id]);
                              }}
                            >
                              Vizsgajelentkezés törlése
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </TableCell>

              <TableCell className="text-right flex g-2">
                {

                  e.expand.exams
                    .filter((e) => e.results.length != 0)
                    .map((exam) => [
                      exam.time,
                      exam.expand.results[0].result,
                      exam.expand.results[0].comment,
                      exam.expand.results[0].expand.judge.name,
                      exam.id,
                    ])
                    .map((res) => (
                      <HoverCard key={res[4]}>
                        <HoverCardTrigger className="text-right">
                          {res[1] == 1 ? (
                            <CircleX color="#e41b1b" />
                          ) : (
                            <CircleCheck color="#1ee41b" />
                          )}
                        </HoverCardTrigger>
                        <HoverCardContent className="grid width-100px">
                          <span className="font-bold">Érdemjegy: {res[1]}</span>
                          <span>Komment: {res[2]}</span>
                          <span>
                            Dátum:{" "}
                            {new Intl.DateTimeFormat("hu-HU", {
                              dateStyle: "short",
                            }).format(new Date(res[0]))}
                          </span>
                          <span>Értékelte: {res[3]}</span>
                        </HoverCardContent>
                      </HoverCard>
                    ))
                }

                {Array.from(
                  {
                    length:
                      e.exams_maximum_attempts -
                      e.expand.exams.filter((e) => e.results.length != 0)
                        .length,
                  },
                  (_, i) => (
                    <Circle key={i} />
                  )
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
