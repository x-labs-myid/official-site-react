import type { RouteObject } from "react-router-dom";
import XYZPanelWrapper from "@/components/layout/XYZPanelWrapper";
import App from "../App";
import Dashboard from "./modules/dashboard";
import Login from "./modules/login";
import ApiLog from "./modules/api-log";
import Catalog from "./modules/catalog";
import StaticToken from "./modules/static-token";
import UserDevice from "./modules/user-device";
import Term from "./modules/term";
import Organization from "./organization";
import LinkSocialMedia from "./modules/link-social-media";
import Team from "./modules/team";
import SocialMedia from "./modules/social-media";

export const XYZPanelRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <XYZPanelWrapper><Login /></XYZPanelWrapper>
    },
    {
        path: "/dashboard",
        element: <XYZPanelWrapper><App><Dashboard /></App></XYZPanelWrapper>,
    },
    {
        path: "/api-log",
        element: <XYZPanelWrapper><App><ApiLog /></App></XYZPanelWrapper>,
    },
    {
        path: "/catalog",
        element: <XYZPanelWrapper><App><Catalog /></App></XYZPanelWrapper>,
    },
    {
        path: "/static-token",
        element: <XYZPanelWrapper><App><StaticToken /></App></XYZPanelWrapper>,
    },
    {
        path: "/user-device",
        element: <XYZPanelWrapper><App><UserDevice /></App></XYZPanelWrapper>,
    },
    {
        path: "/term",
        element: <XYZPanelWrapper><App><Term /></App></XYZPanelWrapper>,
    },
    {
        path: "/organization",
        element: <XYZPanelWrapper><App><Organization /></App></XYZPanelWrapper>,
    },
    {
        path: "/team",
        element: <XYZPanelWrapper><App><Team /></App></XYZPanelWrapper>,
    },
    {
        path: "/social-media",
        element: <XYZPanelWrapper><App><SocialMedia /></App></XYZPanelWrapper>,
    },
    {
        path: "/link-social-media",
        element: <XYZPanelWrapper><App><LinkSocialMedia /></App></XYZPanelWrapper>,
    },
]