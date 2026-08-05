import {
    type RouteConfig,
    route,
    index,
    layout
  } from "@react-router/dev/routes";

export default [
  route("login", "./routes/login.tsx"),

  layout("./routes/layout.tsx", [
    index("routes/home.tsx"),
    route("courses/:courseId?/:ai?", "./routes/courses.tsx"),
    route("advancements", "./routes/advancements.tsx"),
    route("roadmap", "./routes/roadmap.tsx"),
    route("exams", "./routes/exams.tsx"),
    route("admin", "./routes/admin.tsx"),
    route("judge", "./routes/judge.tsx"),
  ]),

  //route("register", "./auth/register.tsx"),
] satisfies RouteConfig;
