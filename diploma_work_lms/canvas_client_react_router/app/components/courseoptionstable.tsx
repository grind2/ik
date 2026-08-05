import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/components/ui/table";
import { Loader2 } from "lucide-react";
import pb from "~/routes/auth/pocketbase";
import { Link, useFetcher, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function CourseOptionsTable({
  courseid,
  closeDropdown,
}: {
  courseid: string;
}) {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const takeCourse = async (course_instance_id) => {
    const courseInstance = await pb
      .collection("course_instance")
      .getOne(course_instance_id);

    if (courseInstance.students.length == courseInstance.max_students) {
      return -1;
    }

    if (courseInstance.students.includes(pb.authStore.record.id)) {
      return -2;
    }

    let copyofCourseInstance = courseInstance;

    courseInstance.students.push(pb.authStore.record.id);

  
    const updateMyCourses = await pb
      .collection("course_instance")
      .update(course_instance_id, copyofCourseInstance);

    return 0;
  };

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);

      const data = await pb.collection("course_instance").getFullList({
        filter: `course='${courseid}'`,
        expand: "course,teacher",
        $autoCancel: false,
      });

      setCourses(data);
      setLoading(false);
    };

    loadCourses();
  }, []);

  return (
    <>
      <Table>
        <TableCaption>Elérhető csoportok</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Csoport azonosító</TableHead>
            <TableHead>Tárgy neve</TableHead>
            <TableHead>Oktató</TableHead>
            <TableHead>Időpont</TableHead>
            <TableHead>Férőhely</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses &&
            courses.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.id}</TableCell>
                <TableCell>{c.expand?.course?.course_name || "N/A"}</TableCell>
                <TableCell>{`${c.expand.teacher.name} (${c.teacher})`}</TableCell>
                <TableCell>{c.time_table || "N/A"}</TableCell>
                <TableCell>{`${c.students.length}/${c.max_students}`}</TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={async () => {
                      const res = await takeCourse(c.id);

                      if (res == -1) {
                        toast("Tárgyfelvétel sikertelen", {
                          description: "A csoport betelt.",
                        });
                      } else if (res == -2) {
                        toast("Tárgyfelvétel sikertelen", {
                          description: "Már felvetted ezt a tárgyat.",
                        });
                      } else {
                        toast("Sikeres tárgyfelvétel", {
                          description: `A(z) ${c.expand.course.course_name} tárgyat felvetted ${c.expand.teacher.name}-hoz.`,
                          action: {
                            label: "Ugrás a felvett tárgyakhoz",
                            onClick: () => navigate("/courses"),
                          },
                        });
                      }

                      closeDropdown();
                    }}
                    variant="outline"
                  >
                    Tárgyfelvétel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
