import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("guides/:slug", "routes/guide.tsx"),
] satisfies RouteConfig;
