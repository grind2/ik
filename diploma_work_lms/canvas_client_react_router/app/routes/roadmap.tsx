import React, { useState } from "react";
import type { Route } from "./+types/roadmap";
import clsx from "clsx";
import pb from "./auth/pocketbase";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "app/components/ui/select";

const UniFormWrapper = ({ children }) => {
  const uniFormStlyes =
    "rounded-xl flex items-center justify-center text-center text-white p-2";

  return children.map((c) => (
    <div className={c.props.className + " " + uniFormStlyes}>{c}</div>
  ));
};

export default function Roadmap({ loaderData }: Route.ComponentProps) {
  const [route, setRoute] = useState(pb.authStore.record.specialisation);

  return (
    <>
      <Select value={route} onValueChange={setRoute}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Válassz szakirányt" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="A">A szakirány</SelectItem>
            <SelectItem value="B">B szakirány</SelectItem>
            <SelectItem value="C">C szakirány</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="grid grid-cols-5 grid-rows-1 gap-1 p-4 bg-white">
        <UniFormWrapper>
          <div className="bg-gray-400 ">1. félév</div>
          <div className="bg-gray-400 ">2. félév</div>
          <div className="bg-gray-400 ">3. félév</div>
          <div className="bg-gray-400 ">4. félév</div>
          <div className="bg-gray-400 ">5. félév</div>
        </UniFormWrapper>
      </div>

      <div className="grid grid-cols-5 gap-1 p-4 bg-white">
        {route == "C" && (
          <UniFormWrapper>
            <div className="bg-green-500  row-span-2 col-start-1 row-start-1">
              Számítógépes rendszerek
            </div>
            <div className="bg-blue-500  row-span-2 col-start-1 row-start-3">
              Imperatív programozás
            </div>
            <div className="bg-blue-600  row-span-3 col-start-1 row-start-5">
              Programozás
            </div>
            <div className="bg-red-500  row-span-5 col-start-1 row-start-8">
              Matematikai alapok
            </div>
            <div className="bg-pink-400  row-span-1 col-start-1 row-start-13">
              Innovatív vállalkozás menedzsment
            </div>
            <div className="bg-cyan-500  row-span-1 col-start-1 row-start-14">
              Funkcionális programozás
            </div>
            <div className="bg-orange-400  row-span-1 col-start-1 row-start-15">
              Egyetemi alapozó és tanulásmódszertani kurzus
            </div>

            <div className="bg-green-500  row-span-1 col-start-2 row-start-1">
              Web-fejlesztés
            </div>
            <div className="bg-blue-500  row-span-2 col-start-2 row-start-3">
              Programozási nyelvek
            </div>
            <div className="bg-blue-600  row-span-2 col-start-2 row-start-5">
              Objektumelvű programozás
            </div>
            <div className="bg-purple-600  row-span-2 col-start-2 row-start-7">
              Algoritmusok és adatszerkezetek I.
            </div>
            <div className="bg-red-400  row-span-2 col-start-2 row-start-9">
              Diszkrét matematika I.
            </div>
            <div className="bg-red-500  row-span-2 col-start-2 row-start-11">
              Analízis I.
            </div>
            <div className="bg-pink-500  row-span-1 col-start-2 row-start-13">
              Jogi ismeretek
            </div>

            <div className="bg-green-500  row-span-1 col-start-3 row-start-1">
              Webprogramozás
            </div>
            <div className="bg-blue-500  row-span-1 col-start-3 row-start-6">
              Programozási technológia
            </div>
            <div className="bg-purple-600  row-span-2 col-start-3 row-start-7">
              Algoritmusok és adatszerkezetek II.
            </div>
            <div className="bg-red-400  row-span-1 col-start-3 row-start-10">
              Diszkrét modellek alkalmazásai
            </div>
            <div className="bg-red-500  row-span-2 col-start-3 row-start-11">
              Analízis II.
            </div>

            <div className="bg-teal-400  row-span-2 col-start-4 row-start-2">
              Operációs rendszerek
            </div>
            <div className="bg-blue-600  row-span-1 col-start-4 row-start-6">
              Szoftvertechnológia (F)
            </div>
            <div className="bg-purple-600  row-span-1 col-start-4 row-start-7">
              Adatbázisok I.
            </div>
            <div className="bg-purple-600  row-span-1 col-start-4 row-start-9">
              Számításelmélet alapjai I.
            </div>
            <div className="bg-red-500  row-span-1 col-start-4 row-start-11">
              Numerikus módszerek
            </div>

            <div className="bg-blue-500  row-span-1 col-start-5 row-start-4">
              Konkurens programozás
            </div>
            <div className="bg-blue-600  row-span-1 col-start-5 row-start-5">
              Telekommunikációs hálózatok
            </div>
            <div className="bg-purple-600  row-span-1 col-start-5 row-start-7">
              Adatbázisok II.
            </div>
            <div className="bg-purple-600  row-span-1 col-start-5 row-start-8">
              Mesterséges intelligencia
            </div>
            <div className="bg-purple-600  row-span-1 col-start-5 row-start-9">
              Számításelmélet alapjai II.
            </div>
            <div className="bg-red-500  row-span-1 col-start-5 row-start-12">
              Valószínűségszámítás és statisztika (F)
            </div>
          </UniFormWrapper>
        )}

        {route == "B" && (
          <UniFormWrapper>
            <div className="bg-green-500  row-span-2 col-start-1 row-start-1">
              Számítógépes rendszerek
            </div>
            <div className="bg-blue-500  row-span-2 col-start-1 row-start-3">
              Imperatív programozás
            </div>
            <div className="bg-blue-600  row-span-3 col-start-1 row-start-5">
              Programozás
            </div>
            <div className="bg-red-500  row-span-7 col-start-1 row-start-8">
              Matematikai alapok
            </div>
            <div className="bg-pink-400  row-span-1 col-start-1 row-start-15">
              Innovatív vállalkozás menedzsment
            </div>
            <div className="bg-cyan-500  row-span-1 col-start-1 row-start-16">
              Funkcionális programozás
            </div>
            <div className="bg-orange-400  row-span-1 col-start-1 row-start-17">
              Egyetemi alapozó és tanulásmódszertani kurzus
            </div>

            <div className="bg-green-500  row-span-1 col-start-2 row-start-1">
              Web-fejlesztés
            </div>
            <div className="bg-blue-500  row-span-2 col-start-2 row-start-3">
              Programozási nyelvek
            </div>
            <div className="bg-blue-600  row-span-2 col-start-2 row-start-5">
              Objektumelvű programozás
            </div>
            <div className="bg-purple-600  row-span-2 col-start-2 row-start-7">
              Algoritmusok és adatszerkezetek I.
            </div>
            <div className="bg-red-400  row-span-2 col-start-2 row-start-9">
              Diszkrét matematika I.
            </div>
            <div className="bg-red-500  row-span-3 col-start-2 row-start-11">
              Analízis I.
            </div>
            <div className="bg-pink-500  row-span-1 col-start-2 row-start-15">
              Jogi ismeretek
            </div>

            <div className="bg-blue-700 row-span-1 col-start-3 row-start-6">
              Eseményvezérelt alkalmazások
            </div>
            <div className="bg-purple-600 row-span-2 col-start-3 row-start-7">
              Algoritmusok és adatszerkezetek II.
            </div>
            <div className="bg-red-400 row-span-1 col-start-3 row-start-10">
              Diszkrét matematika II.
            </div>
            <div className="bg-red-500 row-span-3 col-start-3 row-start-11">
              Analízis II.
            </div>
            <div className="bg-red-500 row-span-1 col-start-3 row-start-14">
              Programozáselmélet
            </div>

            <div className="bg-teal-400 row-span-2 col-start-4 row-start-2">
              Operációs rendszerek
            </div>
            <div className="bg-blue-700 row-span-1 col-start-4 row-start-6">
              Szoftvertechnológia (TM)
            </div>
            <div className="bg-purple-600 row-span-1 col-start-4 row-start-7">
              Adatbázisok I.
            </div>
            <div className="bg-purple-700 row-span-1 col-start-4 row-start-9">
              Formális nyelvek és fordítóprogramok (Objektumelvű programozás
              előkövetelmény)
            </div>
            <div className="bg-red-500 row-span-1 col-start-4 row-start-11">
              Numerikus módszerek I.
            </div>
            <div className="bg-red-500 row-span-1 col-start-4 row-start-12">
              Valószínűségszámítás és statisztika (F)
            </div>
            <div className="bg-red-500 row-span-1 col-start-4 row-start-13">
              Többváltozós függvénytan
            </div>

            <div className="bg-blue-500  row-span-1 col-start-5 row-start-4">
              Konkurens programozás
            </div>
            <div className="bg-blue-600  row-span-1 col-start-5 row-start-5">
              Telekommunikációs hálózatok
            </div>
            <div className="bg-purple-600  row-span-1 col-start-5 row-start-7">
              Adatbázisok II.
            </div>
            <div className="bg-purple-600  row-span-1 col-start-5 row-start-8">
              Mesterséges intelligencia
            </div>
            <div className="bg-purple-600  row-span-1 col-start-5 row-start-9">
              Számításelmélet
            </div>
            <div className="bg-red-500  row-span-1 col-start-5 row-start-11">
              Numerikus módszerek II.
            </div>
          </UniFormWrapper>
        )}

        {route == "A" && (

          <UniFormWrapper>
            <div className="bg-green-500  row-span-2 col-start-1 row-start-1">
              Számítógépes rendszerek
            </div>
            <div className="bg-blue-500  row-span-2 col-start-1 row-start-3">
              Imperatív programozás
            </div>
            <div className="bg-blue-600  row-span-3 col-start-1 row-start-5">
              Programozás
            </div>
            <div className="bg-red-500  row-span-7 col-start-1 row-start-8">
              Matematikai alapok
            </div>
            <div className="bg-pink-400  row-span-1 col-start-1 row-start-15">
              Innovatív vállalkozás menedzsment
            </div>
            <div className="bg-cyan-500  row-span-1 col-start-1 row-start-16">
              Funkcionális programozás
            </div>
            <div className="bg-orange-400  row-span-1 col-start-1 row-start-17">
              Egyetemi alapozó és tanulásmódszertani kurzus
            </div>

            <div className="bg-green-500  row-span-1 col-start-2 row-start-1">
              Web-fejlesztés
            </div>
            <div className="bg-blue-500  row-span-2 col-start-2 row-start-3">
              Programozási nyelvek
            </div>
            <div className="bg-blue-600  row-span-2 col-start-2 row-start-5">
              Objektumelvű programozás
            </div>
            <div className="bg-purple-600  row-span-2 col-start-2 row-start-7">
              Algoritmusok és adatszerkezetek I.
            </div>
            <div className="bg-red-400  row-span-3 col-start-2 row-start-9">
              Diszkrét matematika I.
            </div>
            <div className="bg-red-500  row-span-3 col-start-2 row-start-12">
              Analízis I.
            </div>
            <div className="bg-pink-500  row-span-1 col-start-2 row-start-15">
              Jogi ismeretek
            </div>

            <div className="bg-blue-700 row-span-1 col-start-3 row-start-6">
              Eseményvezérelt alkalmazások
            </div>
            <div className="bg-purple-600 row-span-2 col-start-3 row-start-7">
              Algoritmusok és adatszerkezetek II.
            </div>
            <div className="bg-red-400 row-span-1 col-start-3 row-start-10">
              Diszkrét matematika II.
            </div>
            <div className="bg-red-500 row-span-2 col-start-3 row-start-12">
              Analízis II.
            </div>
            <div className="bg-red-500 row-span-1 col-start-3 row-start-14">
              Numerikus módszerek I.
            </div>

            <div className="bg-teal-400 row-span-2 col-start-4 row-start-2">
              Operációs rendszerek
            </div>
            <div className="bg-blue-700 row-span-1 col-start-4 row-start-6">
              Szoftvertechnológia (TM)
            </div>
            <div className="bg-purple-600 row-span-1 col-start-4 row-start-7">
              Adatbázisok I.
            </div>
            <div className="bg-purple-700 row-span-1 col-start-4 row-start-9">
              Bevezetés a számításelméletbe
            </div>
            <div className="bg-red-500 row-span-1 col-start-4 row-start-12">
              Valószínűségszámítás
            </div>
            <div className="bg-red-600 row-span-1 col-start-4 row-start-13">
              Analízis III.
            </div>
            <div className="bg-red-700 row-span-1 col-start-4 row-start-14">
              Numerikus módszerek II.
            </div>

            <div className="bg-blue-500 row-span-1 col-start-5 row-start-4">
              Konkurens programozás
            </div>
            <div className="bg-blue-600 row-span-1 col-start-5 row-start-5">
              Telekommunikációs hálózatok
            </div>
            <div className="bg-purple-600 row-span-1 col-start-5 row-start-8">
              Mesterséges intelligencia
            </div>
            <div className="bg-red-500 row-span-1 col-start-5 row-start-11">
              Diszkrét matematika modellek és alkalmaz.
            </div>
            <div className="bg-red-500 row-span-1 col-start-5 row-start-12">
              Matematikai statisztika
            </div>
            <div className="bg-red-500 row-span-1 col-start-5 row-start-13">
              Analízis alkalmazásai
            </div>
          </UniFormWrapper>
        )}
      </div>
    </>
  );
}
