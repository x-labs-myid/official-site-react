import { FaConnectdevelop, FaListOl, FaLockOpen } from "react-icons/fa";
import {
  FaBookOpenReader,
  FaBuilding,
  FaFireBurner,
  FaGlobe,
  FaLink,
  FaMobileScreen,
  FaPeopleGroup,
} from "react-icons/fa6";

export interface MenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export const menuConfig: MenuCategory[] = [
  {
    title: "General",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: FaFireBurner,
      },
    ],
  },
  {
    title: "Monitoring",
    items: [
      {
        label: "API Log",
        path: "/api-log",
        icon: FaConnectdevelop,
      },
      {
        label: "User Device",
        path: "/user-device",
        icon: FaMobileScreen,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        label: "Catalog",
        path: "/catalog",
        icon: FaListOl,
      },
      {
        label: "Static Token",
        path: "/static-token",
        icon: FaLockOpen,
      },
      {
        label: "Terms",
        path: "/term",
        icon: FaBookOpenReader,
      },
    ],
  },
  {
    title: "Organization",
    items: [
      {
        label: "Organization",
        path: "/organization",
        icon: FaBuilding,
      },
      {
        label: "Team",
        path: "/team",
        icon: FaPeopleGroup,
      },
    ],
  },
  {
    title: "Social",
    items: [
      {
        label: "Social Media",
        path: "/social-media",
        icon: FaGlobe,
      },
      {
        label: "Link Social Media",
        path: "/link-social-media",
        icon: FaLink,
      },
    ],
  },
];
