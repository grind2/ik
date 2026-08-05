import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  GraduationCap,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavProjects } from "~/components/nav-projects";
import { NavSecondary } from "~/components/nav-secondary";
import { NavUser } from "~/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { NavLink } from "react-router";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "app/avatars/canvas.png",
  },
  navMain: [
    {
      title: "Tanulmányok",
      url: "/",
      icon: GraduationCap,
      isActive: true,
      items: [
        {
          title: "Tárgyfelvétel",
          url: "/",
        },
        {
          title: "Saját tantárgyak",
          url: "/courses",
        },
        {
          title: "Előrehaladás",
          url: "/advancements",
        },
        {
          title: "Ütemterv",
          url: "/roadmap",
        },
        {
          title: "Vizsgafelvétel",
          url: "/exams",
        },
      ],
    },
  ],
  projects: [],
};

const teacherdata = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "app/avatars/canvas.png",
  },
  navMain: [
    {
      title: "Adminisztráció",
      url: "/admin",
      icon: GraduationCap,
      isActive: true,
      items: [
        {
          title: "Tárgy módosítása",
          url: "/admin",
        },
        {
          title: "Jegybeírás",
          url: "/judge",
        },
      ],
    },
  ],
  projects: [],
};

export function AppSidebar({
  myuser,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  myuser: { name: string; avatar: string; email: string };
}) {

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/" end>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/app/avatars/canvas.png" alt="Custom Icon" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Canvas</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={myuser.isTeacher ? teacherdata.navMain : data.navMain}
        />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={myuser} />
      </SidebarFooter>
    </Sidebar>
  );
}
