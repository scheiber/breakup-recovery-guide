import type { RouteRecord } from "vite-react-ssg";
import RootLayout from "./components/RootLayout";
import { readingOrder } from "./utils/articles";

/** react-router's `lazy` wants a `Component`; our pages use a default export. */
const lazyPage = (
  loader: () => Promise<{ default: React.ComponentType }>
) => async () => ({ Component: (await loader()).default });

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: RootLayout,
    entry: "src/components/RootLayout.tsx",
    children: [
      { index: true, lazy: lazyPage(() => import("./pages/Index")) },
      { path: "articles", lazy: lazyPage(() => import("./pages/Articles")) },
      {
        path: "articles/:slug",
        lazy: lazyPage(() => import("./pages/Article")),
        getStaticPaths: () => readingOrder.map((slug) => `articles/${slug}`),
      },
      { path: "about", lazy: lazyPage(() => import("./pages/About")) },
      { path: "resources", lazy: lazyPage(() => import("./pages/Resources")) },
      // "404" is pre-rendered to dist/404.html (see public/_redirects); "*"
      // handles unknown paths during client-side navigation.
      { path: "404", lazy: lazyPage(() => import("./pages/NotFound")) },
      { path: "*", lazy: lazyPage(() => import("./pages/NotFound")) },
    ],
  },
];
