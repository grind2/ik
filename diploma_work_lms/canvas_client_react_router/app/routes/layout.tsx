import { AppSidebar } from "app/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "app/components/ui/breadcrumb";
import { Separator } from "app/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "app/components/ui/sidebar";
import { Outlet, redirect, useLocation, useRevalidator } from "react-router";
import type { Course } from "~/components/columns";
import pb from "./auth/pocketbase";
import type { Route } from "./+types/layout";

export async function clientLoader({ params }: Route.LoaderArgs) {
  if (!pb.authStore.isValid) {
    return redirect("/login"); 
  }

  let fake_list: Course[] = [];

  if (pb.authStore.record) {

    const user = await pb.collection("users").getOne(pb.authStore.record.id, {
      expand: "courses,completed_courses",
    });

    const hackyavatar = `http://127.0.0.1:8090/api/files/${pb.authStore.record.collectionId}/${pb.authStore.record.id}/${pb.authStore.record.avatar}`;

    const myrecord = {
      name: pb.authStore.record.name,
      email: pb.authStore.record.email,
      avatar: hackyavatar,
      isTeacher: pb.authStore.record.role == "teacher",
    };

    if (user.expand?.courses && user.expand?.completed_courses) {
      const merge = user.expand.courses.concat(user.expand.completed_courses);

      let mycourses: Course[] = [];

      // nem teljesített
      for (const c of user.expand.courses) {
        const element = {
          id: c.id,
          course_name: c.course_name,
          credits: c.credits,
          course_type: c.course_type,
          completed: false,
          is_mandatory: c.mandatory_in_spec.includes(user.specialisation),
        };

        mycourses.push(element);
      }

      // teljesített
      for (const c of user.expand.completed_courses) {
        const element = {
          id: c.id,
          course_name: c.course_name,
          credits: c.credits,
          course_type: c.course_type,
          completed: true,
          is_mandatory: true,
        };

        mycourses.push(element);
      }

      // advancements

      let számszab = 0,
        mat = 0,
        infszab = 0,
        egyéb = 0,
        szám = 0,
        inf = 0;

      for (const cc of user.expand?.completed_courses) {
        const b = !cc.mandatory_in_spec.includes(user.specialisation);

        if (cc.course_type == "inf") {
          inf += cc.credits;
          if (b) infszab += cc.credits;
        } else if (cc.course_type == "mat") {
          mat += cc.credits;
        } else if (cc.course_type == "szám") {
          szám += cc.credits;
          if (b) számszab += cc.credits;
        } else if (cc.course_type == "egyéb") {
          egyéb += cc.credits;
        }
      }

      const advancements = [
        szám,
        mat,
        inf,
        egyéb,
        user.specialisation,
        számszab,
        infszab,
      ];

      return { mycourses, myrecord, advancements };
    }
  }

  return fake_list;
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar myuser={loaderData.myrecord} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Tanulmányok</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {location.pathname == "/"
                      ? "Tárgyfelvétel"
                      : location.pathname == "/courses"
                      ? "Saját tantárgyak"
                      : location.pathname == "/advancements"
                      ? "Előrehaladás"
                      : location.pathname == "/roadmap"
                      ? "Ütemterv"
                      : location.pathname == "/exams"
                      ? "Vizsgafelvétel"
                      : location.pathname.split("/").length > 2
                      ? "Tárgy részletei"
                      : ""}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet
            context={{
              mycourses: loaderData.mycourses,
              advancements: loaderData.advancements,
            }}
          />
          {
            //<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          }
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
