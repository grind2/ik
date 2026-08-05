import React from "react";
import pb from "./auth/pocketbase";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "app/components/ui/select";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

import { useState } from "react";
import { toast } from "sonner";

export async function clientLoader({ params }) {
  const coursesWithExams = await pb.collection("courses").getFullList({
    filter: "exams !='[]'",
    expand: "exams,exams.participants",
  });

  const permittedToEditCourses = coursesWithExams.filter((course) =>
    course.expand.exams.some((exam) =>
      exam.judges.includes(pb.authStore.record.id)
    )
  );

  return permittedToEditCourses;
}

export default function Judge({ loaderData }) {
  const [course, setCourse] = useState("");
  const [student, setStudent] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async ({ loaderData }) => {

    const data = {
      student: student,
      judge: pb.authStore.record.id,
      result: rating,
      comment: comment,
    };

    try {
      const entry = await pb.collection("exam_results").create(data);

      let exam = await pb.collection("exams").getOne(time);

      exam.results.push(entry.id);

      await pb.collection("exams").update(time, exam);

      toast("Jegy sikeresen beírva");

      setStudent("");

      setComment("");
      setRating("");
    } catch (error) {
      toast("Jegybeírás sikertelen. Próbáld újra később.");
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto p-6 mt-6 shadow-xl">
      <CardHeader>
        <CardTitle>Értékelés leadása</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tárgy</label>
          <Select onValueChange={setCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Válassz tárgyat" />
            </SelectTrigger>
            <SelectContent>
              {loaderData.map((e) => (
                <SelectItem value={e.id} key={e.id}>
                  {e.course_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Vizsgaalkalom
          </label>
          <Select onValueChange={setTime}>
            <SelectTrigger>
              <SelectValue placeholder="Válassz időpontot" />
            </SelectTrigger>
            <SelectContent>
              {loaderData
                .find((e) => e.id === course)
                ?.expand?.exams?.map((exam) => (
                  <SelectItem key={exam.id} value={exam.id}>
                    {new Intl.DateTimeFormat("hu-HU", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date(exam.time))}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Diák</label>
          <Select onValueChange={setStudent}>
            <SelectTrigger>
              <SelectValue placeholder="Válassz diákot" />
            </SelectTrigger>
            <SelectContent>
              {loaderData
                .find((e) => e.id === course)
                ?.expand?.exams?.find((e) => e.id == time)
                ?.expand?.participants?.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    {e.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Megjegyzés</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Írd le a megjegyzésed..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Értékelés (1–5)
          </label>
          <Select onValueChange={setRating}>
            <SelectTrigger>
              <SelectValue placeholder="Válassz értékelést" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((val) => (
                <SelectItem key={val} value={val.toString()}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSubmit} className="w-full mt-2">
          Értékelés beküldése
        </Button>
      </CardContent>
    </Card>
  );
}
