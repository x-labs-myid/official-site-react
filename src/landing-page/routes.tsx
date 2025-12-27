import type { RouteObject } from "react-router-dom";
import Main from "./views/Main";
import WithParam from "./views/WithParam";
import LandingWrapper from "@/components/layout/LandingWrapper";

export const LandingPageRoutes: RouteObject[] = [
  {
    path: "",
    element: (
      <LandingWrapper>
        <Main />
      </LandingWrapper>
    ),
  },
  {
    path: "/:app/:slug",
    element: (
      <LandingWrapper>
        <WithParam />
      </LandingWrapper>
    ),
  },
  {
    path: "/:app/term/:slug",
    element: (
      <LandingWrapper>
        <WithParam />
      </LandingWrapper>
    ),
  },
];
