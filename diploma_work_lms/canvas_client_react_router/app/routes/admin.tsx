import React from "react";
import pb from "./auth/pocketbase";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "app/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "app/components/ui/dialog";

import { Textarea } from "app/components/ui/textarea";

import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { ExternalLink, FolderOpen, PencilLine, Trash2 } from "lucide-react";

export async function clientLoader({ params }) {
  const record = await pb.collection("course_instance").getFullList({
    filter: `teacher='${pb.authStore.record.id}'`,
    expand: "course",
  });
  return record;
}

import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "sonner";
const fileTypes = ["PDF", "JPEG", "PNG"];

const handleDiscUpdate = async (text, setText, course_instance_id) => {
  try {
    let existing = await pb
      .collection("course_instance")
      .getOne(course_instance_id);

    existing.description = text;

    await pb.collection("course_instance").update(course_instance_id, existing);

    toast("Sikeres módosítás.");
  } catch (err) {
    toast("Sikertelen módosítás.");
    console.error("Hiba a feltöltés során:", err);
  }
  setText("");
};

const handleChange = async (file: File, course_instance_id: string) => {
  try {
    const existing = await pb
      .collection("course_instance")
      .getOne(course_instance_id);

    const formData = new FormData();

    const oldFiles = existing.files || [];

    oldFiles.forEach((f) => formData.append("files", f));

    formData.append("files", file);

    const updatedRecord = await pb
      .collection("course_instance")
      .update(course_instance_id, formData);

    toast("Sikeres fájlfeltöltés.");
  } catch (err) {
    toast("Sikertelen fájlfeltöltés. Próbáld újra később.");
    console.error("Hiba a feltöltés során:", err);
  }
};

const handleDelete = async (f, id) => {
  try {
    let record = await pb.collection("course_instance").getOne(id);

    record.files.splice(record.files.indexOf(f), 1);

    await pb.collection("course_instance").update(id, record);

    toast("Fájl sikeresen törölve");
  } catch (error) {
    toast("Fájl törlése sikertelen.");
  }
};

const Admin: React.FC = ({ loaderData }) => {

  const [text, setText] = useState("");

  return (
    <Table>
      <TableCaption>Az általad adminisztrált tárgyak listája.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Tárgy azonosító</TableHead>
          <TableHead>Kurzus</TableHead>
          <TableHead>Csoport azonosító</TableHead>
          <TableHead className="text-right"></TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loaderData.map((e) => (
          <TableRow key={e.course} className="m-3">
            <TableCell className="font-medium">{e.course}</TableCell>
            <TableCell>{e.expand.course.course_name}</TableCell>
            <TableCell>{e.id}</TableCell>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="m-2">
                  Leírás módosítása
                  <PencilLine />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Új leírás beállítása</DialogTitle>
                  <DialogDescription className="flex flex-col">
                    Adjon meg egy új leírást
                  </DialogDescription>
                </DialogHeader>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button onClick={() => handleDiscUpdate(text, setText, e.id)}>
                  Mentés
                </Button>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  Fájlok módosítása
                  <FolderOpen />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Kurzus fájljai</DialogTitle>
                  <DialogDescription className="flex flex-col">
                    <span>
                      Utolsó módosítás dátuma:
                      {" " +
                        new Intl.DateTimeFormat("hu-HU", {
                          dateStyle: "short",
                          timeStyle: "short",
                        }).format(new Date(e.updated))}
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
                    {e.files.map((f) => (
                      <TableRow key={f}>
                        <TableCell className="font-medium">{f}</TableCell>

                        <TableCell>
                          <a
                            target="_blank"
                            href={`http://127.0.0.1:8090/api/files/pbc_2244489498/${e.id}/${f}`}
                          >
                            <ExternalLink />
                          </a>
                        </TableCell>
                        <TableCell>
                          <a
                            target="_blank"
                            onClick={() => handleDelete(f, e.id)}
                          >
                            <Trash2 />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}

                    <div className="flex">
                      <FileUploader
                        label="Töltsd fel vagy húzd ide a fájlt."
                        uploadedLabel="Sikeres fájlfeltöltés. Tölts fel további fájlokat..."
                        handleChange={(file) => {
                          handleChange(file, e.id);
                        }}
                        name="file"
                        types={fileTypes}
                      />
                    </div>
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Admin;
