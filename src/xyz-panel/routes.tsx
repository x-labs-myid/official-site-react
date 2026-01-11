import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import XYZPanelWrapper from "@/components/layout/XYZPanelWrapper";
import App from "../App";
import Loading from "@/components/ui/Loading";

const Dashboard = lazy(() => import("./modules/dashboard"));
const Login = lazy(() => import("./modules/login"));
const ApiLog = lazy(() => import("./modules/api-log"));
const Catalog = lazy(() => import("./modules/catalog"));
const StaticToken = lazy(() => import("./modules/static-token"));
const UserDevice = lazy(() => import("./modules/user-device"));
const Term = lazy(() => import("./modules/term"));
const Organization = lazy(() => import("./modules/organization"));
const LinkSocialMedia = lazy(() => import("./modules/link-social-media"));
const Team = lazy(() => import("./modules/team"));
const SocialMedia = lazy(() => import("./modules/social-media"));

const SuspenseApp = ({ children }: { children: React.ReactNode }) => (
  <App>
    <Suspense fallback={<Loading forceShow={true} />}>{children}</Suspense>
  </App>
);

export const XYZPanelRoutes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <XYZPanelWrapper>
        <Suspense fallback={<Loading forceShow={true} />}>
          <Login />
        </Suspense>
      </XYZPanelWrapper>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <XYZPanelWrapper>
        <SuspenseApp>
          <Dashboard />
        </SuspenseApp>
      </XYZPanelWrapper>
    ),
  },
  {
    path: "/api-log",
    element: (
      <XYZPanelWrapper>
        <SuspenseApp>
          <ApiLog />
        </SuspenseApp>
      </XYZPanelWrapper>
    ),
  },
  {
    path: "/catalog",
    element: (
      <XYZPanelWrapper>
        <SuspenseApp>
          <Catalog />
        </SuspenseApp>
      </XYZPanelWrapper>
    ),
  },
  {
    path: "/static-token",
    element: (
      <XYZPanelWrapper>
        <SuspenseApp>
          <StaticToken />
        </SuspenseApp>
      </XYZPanelWrapper>
    ),
  },
  {
    path: "/user-device",
    element: (
      <XYZPanelWrapper>
        <SuspenseApp>
          <UserDevice />
        </SuspenseApp>
      </XYZPanelWrapper>
    ),
  },
  {
    path: "/term",
    element: (
      <XYZPanelWrapper>
        <SuspenseApp>
          <Term />
        </SuspenseApp>
      </XYZPanelWrapper>
    ),
  },
  {
    path: "/organization",
    element: (
      <XYZPanelWrapper>
        <SuspenseApp>
          <Organization />
        </SuspenseApp>
      </XYZPanelWrapper>
    ),
  },
  {
    path: "/team",
    element: (
      <XYZPanelWrapper>
        <SuspenseApp>
          <Team />
        </SuspenseApp>
      </XYZPanelWrapper>
    ),
  },
  {
    path: "/social-media",
    element: (
      <XYZPanelWrapper>
        <SuspenseApp>
          <SocialMedia />
        </SuspenseApp>
      </XYZPanelWrapper>
    ),
  },
  {
    path: "/link-social-media",
    element: (
      <XYZPanelWrapper>
        <SuspenseApp>
          <LinkSocialMedia />
        </SuspenseApp>
      </XYZPanelWrapper>
    ),
  },
];
