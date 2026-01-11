import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import LandingWrapper from "@/components/layout/LandingWrapper";
import Loading from "@/components/ui/Loading";

const Main = lazy(() => import("./views/Main"));
const WithParam = lazy(() => import("./views/WithParam"));
const NotFound = lazy(() => import("./views/NotFound"));

export const LandingPageRoutes: RouteObject[] = [
  {
    path: "",
    element: (
      <LandingWrapper>
        <Suspense fallback={<Loading forceShow={true} />}>
          <Main />
        </Suspense>
      </LandingWrapper>
    ),
  },
  {
    path: "/:app/:slug",
    element: (
      <LandingWrapper>
        <Suspense fallback={<Loading forceShow={true} />}>
          <WithParam />
        </Suspense>
      </LandingWrapper>
    ),
  },
  {
    path: "/:app/term/:slug",
    element: (
      <LandingWrapper>
        <Suspense fallback={<Loading forceShow={true} />}>
          <WithParam />
        </Suspense>
      </LandingWrapper>
    ),
  },
  {
    path: "*",
    element: (
      <LandingWrapper>
        <Suspense fallback={<Loading forceShow={true} />}>
          <NotFound />
        </Suspense>
      </LandingWrapper>
    ),
  },
];
