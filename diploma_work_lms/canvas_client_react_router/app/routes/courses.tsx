import {
  Link,
  Navigate,
  NavLink,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
  useRevalidator,
} from "react-router";
import type { Route } from "./+types/home";
import pb from "app/routes/auth/pocketbase";
import { useState } from "react";
import { DataTableDemo } from "~/components/my-data-table";
import { type Course, columns } from "~/components/columns";
import { Badge } from "app/components/ui/badge";


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/components/ui/table";


import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Brain,
  Download,
  ExternalLink,
  FileInput,
  Files,
  FolderOpen,
  Loader2,
  Search,
} from "lucide-react";
import { CarouselDApiDemo } from "~/components/carousel";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "app/components/ui/dialog";
import { toast } from "sonner";

//burnt in api key for Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function fetchFileAsBase64(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch file");

    const blob = await response.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        // kell a Gemini formátumhoz
        const base64String = reader.result?.toString().split(",")[1] || "";
        resolve(base64String);
      };
      reader.onerror = reject;
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    return "";
  }
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const { courseId, ai } = params;

  if (courseId) {
    const record = await pb.collection("course_instance").getOne(courseId, {
      expand: "course",
    });

    if (ai !== null) {
      let fileList = [];

      for await (const file of record.files) {
        let url = pb.files.getURL(record, file);

        let base64File = await fetchFileAsBase64(url);

        let filePart = {
          inlineData: {
            data: base64File,
            mimeType: "application/pdf",
          },
        };

        fileList.push(filePart);
      }

      if (ai === "flashcards") {
        const prompt = `Generálj a PDF-ek alapján 10 tanulókártyát. A Nehézség (difficulty) property 3 értéket vehet fel: Könnyű, Közepes, Nehéz. 
        A lista úgy épüljön fel, hogy elöszőr a könnyű, majd a közepes és végül a nehéz kérdések következzenek.`;

        const schema = {
          description: "Tanulókártyák listája",
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              front: {
                type: SchemaType.STRING,
                description: "Tanulókártya kérdése",
                nullable: false,
              },
              back: {
                type: SchemaType.STRING,
                description: "Tanulókártya válasza",
                nullable: false,
              },
              difficulty: {
                type: SchemaType.STRING,
                description: "Nehézség",
                nullable: false,
              },
            },
            required: ["front", "back", "difficulty"],
          },
        };

        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
          },
        });

        try {
          const result = await model.generateContent([prompt, ...fileList]);
          const flashcards = JSON.parse(result.response.text());

          const summaryResult = null;
          return { record, flashcards, summaryResult };
        } catch (error) {

          const flashcards = null;
          const summaryResult = null;
          return { record, flashcards, summaryResult };
        }
      }

      if (ai === "summary") {
        const prompt = `Egyetemi tantárgy megnevezése: ${record.expand.course.course_name}. Foglald össze ezeket a tárgyhoz kapcsolódó 
        pdf dokumentumokat, adj rövid témaleírást a tantárggyal 
        kapcsolatban és készíts tanulási tervet a tantárgyhoz és javasolj az interneten megtalálható tárgyhoz kapcsolódó érdekes
        tartalmat (pl. videók, cikkek és könyvek). Az ajánlott tartalmakhoz adj egy google/youtube/wikipédia keresés linket. Nem működő 
        linkek használatát mellőzd.
        Az összes lépéshez használhatsz interneten fellelhető tartalmakat. Az első szó legyen a vastagon szedett 'Összefoglaló' és kezdd is el azonnal az
        összefoglalást. Az utolsó pedig a legutolsó generált link.`;

        //get files from path 1.

        //gemini allows only 10 files :(

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent([prompt, ...fileList]);

        const summaryResult = result.response.text();
        const flashcards = null;
        return { record, summaryResult, flashcards };
      }
    }

    const summaryResult = null,
      flashcards = null;

    return { record, summaryResult, flashcards };
  } else {
    const users_courses = await pb.collection("course_instance").getFullList({
      filter: `students ~ "${pb.authStore.record.id}"`,
      expand: "course,teacher,students",
    });

    return {
      record: null,
      summaryResult: null,
      flashcards: null,
      users_courses: users_courses,
    };
  }

  return null;
}

export default function Courses({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  const removeCourse = async (course_instance_id) => {
    const courseInstance = await pb
      .collection("course_instance")
      .getOne(course_instance_id);

    let copyofCourseInstance = courseInstance;

    copyofCourseInstance.students.splice(
      copyofCourseInstance.students.indexOf(pb.authStore.record.id),
      1
    );

    await pb
      .collection("course_instance")
      .update(course_instance_id, copyofCourseInstance)
      .then(() => {
        navigate("/courses");
        toast("Sikeres tárgyleadás");
      });
  };

  const location = useLocation();

  return (
    <>
      {!loaderData.record ? (
        <Table>
          <TableCaption>A felvett tárgyaid listája.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Azonosító</TableHead>
              <TableHead>Kurzus</TableHead>
              <TableHead>Oktató</TableHead>
              <TableHead className="text-right"></TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loaderData.users_courses.map((e) => (
              <TableRow key={e.course}>
                <TableCell className="font-medium">{e.course}</TableCell>
                <TableCell>{e.expand.course.course_name}</TableCell>
                <TableCell>{`${e.expand.teacher.name} (${e.teacher})`}</TableCell>
                <TableCell className="text-right">
                  <Link to={`/courses/${e.id}`}>
                    <Button>Részletek</Button>
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => removeCourse(e.id)}
                    variant="destructive"
                  >
                    Tárgy leadása
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <>
          <div id="course_header" className=" flex items-center gap-2 px-4">
            <div className="text-xs">
              <h1 className="text-2xl">
                {loaderData.record.expand.course.course_name} (
                {loaderData.record.active_semester})
              </h1>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  Fájlok
                  <FolderOpen />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Kurzus fájljai</DialogTitle>
                  <DialogDescription className="flex flex-col">
                    <span>Az oktató által feltöltött dokumentumok.</span>
                    <span>
                      Utolsó módosítás dátuma:
                      {" " +
                        new Intl.DateTimeFormat("hu-HU", {
                          dateStyle: "short",
                          timeStyle: "short",
                        }).format(new Date(loaderData.record.updated))}
                    </span>
                  </DialogDescription>
                </DialogHeader>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Fájlnév</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loaderData.record.files.map((e) => (
                      <TableRow key={e}>
                        <TableCell className="font-medium">{e}</TableCell>
                        <TableCell>
                          <a
                            target="_blank"
                            href={`http://127.0.0.1:8090/api/files/pbc_2244489498/${loaderData.record.id}/${e}`}
                          >
                            <ExternalLink />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>

            <NavLink to={`/courses/${loaderData.record.id}/summary`}>
              {({ isActive, isPending }) => (
                <Button
                  variant={isActive ? "outline" : "default"}
                  disabled={isPending || isActive}
                >
                  {isPending ? "Betöltés..." : "AI összefoglaló"}
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <FileInput />
                  )}
                </Button>
              )}
            </NavLink>

            <NavLink to={`/courses/${loaderData.record.id}/flashcards`}>
              {({ isActive, isPending }) => (
                <Button
                  variant={isActive ? "outline" : "default"}
                  disabled={isPending || isActive}
                >
                  {isPending ? "Betöltés..." : "AI tanulókártyák"}
                  {isPending ? <Loader2 className="animate-spin" /> : <Brain />}
                </Button>
              )}
            </NavLink>
          </div>
          <hr />
        </>
      )}

      {loaderData.record &&
      !loaderData.summaryResult &&
      !loaderData.flashcards ? (
        <>
          <div
            className="gap-2 px-4"
            dangerouslySetInnerHTML={{ __html: loaderData.record.description }}
          />
        </>
      ) : (
        ""
      )}

      {loaderData.flashcards ? (
        <CarouselDApiDemo
          flashcard_data={loaderData.flashcards}
        ></CarouselDApiDemo>
      ) : (
        ""
      )}


      {loaderData.summaryResult ? (
        <Markdown
          components={{
            a(props) {
              const { href, children } = props;
              return (
                <a
                  href={href}
                  className="font-medium text-blue-600 dark:text-blue-500 inline-block hover:underline"
                  target="_blank"
                >
                  <Search className="inline-block" />
                  Keresés
                </a>
              );
            },
          }}
          remarkPlugins={[remarkGfm]}
        >
          {loaderData.summaryResult}
        </Markdown>
      ) : (
        ""
      )}
    </>
  );
}
