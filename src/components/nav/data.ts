import {
  GlobeIcon,
  GraduationCapIcon,
  ImageIcon,
  ShoppingBasketIcon,
  type LucideIcon,
} from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

const navGroups = [
  {
    title: "General",
    description: "Essential information for navigating college life",
    icon: GlobeIcon,
    url: "/general",
    items: [
      {
        title: "New Students",
        description:
          "Resources and guides for first-year students and transfers",
        url: "/general/new-students",
      },
      {
        title: "International Students",
        description:
          "Support, visa information, and cultural adaptation resources",
        url: "/general/international-students",
      },
      {
        title: "Financial Aid",
        description:
          "Scholarships, grants, loans, and financial planning advice",
        url: "/general/financial-aid",
      },
    ],
  },
  {
    title: "Academics",
    description: "Programs, courses, and study resources for students",
    icon: GraduationCapIcon,
    url: "/academics",
    items: [
      {
        title: "Pre-med",
        description:
          "Course requirements, MCAT prep, and medical school application tips",
        url: "/academics/pre-med",
      },
    ],
  },
  {
    title: "Living",
    description: "Resources for daily life on and off campus",
    icon: ShoppingBasketIcon,
    url: "/living",
    items: [
      {
        title: "Jobs",
        description:
          "On-campus employment, internships, and part-time opportunities",
        url: "/living/jobs",
      },
      {
        title: "Rents",
        description:
          "Off-campus housing options, finding roommates, and leasing advice",
        url: "/living/rents",
      },
      {
        title: "Marketplace",
        description:
          "Buy, sell, and trade textbooks, furniture, and other essentials",
        url: "/living/marketplace",
      },
    ],
  },
  {
    title: "Photos",
    description: "Visual galleries of campus life and facilities",
    icon: ImageIcon,
    url: "/photos",
    items: [
      {
        title: "Campus",
        description: "School buildings, landmarks, and campus events",
        url: "/photos/campus",
      },
      {
        title: "Dorms",
        description: "Residence halls, room layouts, and living spaces",
        url: "/photos/dorms",
      },
    ],
  },
] satisfies NavItem[];

type NavItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  url: string;
  items?: {
    title: string;
    description: string;
    url: string;
  }[];
};

export { data, navGroups, type NavItem };
