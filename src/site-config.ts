import {
  GlobeIcon,
  GraduationCapIcon,
  ImageIcon,
  type LucideIcon,
  ShoppingBasketIcon,
} from "lucide-react";

const colorMap = {
  cyan: {
    bg: "bg-cyan-50",
    shadow: "shadow-cyan-100",
    icon: "text-cyan-200",
    title: "text-cyan-500",
  },
  lime: {
    bg: "bg-lime-50",
    shadow: "shadow-lime-100",
    icon: "text-lime-200",
    title: "text-lime-500",
  },
  emerald: {
    bg: "bg-emerald-50",
    shadow: "shadow-emerald-100",
    icon: "text-emerald-200",
    title: "text-emerald-500",
  },
  fuchsia: {
    bg: "bg-fuchsia-50",
    shadow: "shadow-fuchsia-100",
    icon: "text-fuchsia-200",
    title: "text-fuchsia-500",
  },
  slate: {
    bg: "bg-slate-50",
    shadow: "shadow-slate-100",
    icon: "text-slate-200",
    title: "text-slate-500",
  },
};

const categories = [
  {
    name: "General",
    description: "Essential information for navigating college life",
    icon: GlobeIcon,
    slug: "general",
    color: "cyan",
    subcategories: [
      {
        name: "Documents",
        description: "Academic calendar, exam schedules, and important dates",
        slug: "new-students",
      },
      {
        name: "New Students",
        description:
          "Resources and guides for first-year students and transfers",
        slug: "new-students",
      },
      {
        name: "International Students",
        description:
          "Support, visa information, and cultural adaptation resources",
        slug: "international-students",
      },
      {
        name: "Financial Aid",
        description:
          "Scholarships, grants, loans, and financial planning advice",
        slug: "financial-aid",
      },
    ],
  },
  {
    name: "Academics",
    description: "Programs, courses, and study resources for students",
    icon: GraduationCapIcon,
    slug: "academics",
    color: "lime",
    subcategories: [
      {
        name: "Pre-med",
        description:
          "Course requirements, MCAT prep, and medical school application tips",
        slug: "pre-med",
      },
      {
        name: "Pre-law",
        description:
          "Resources for LSAT preparation, law school admissions, and career pathways in law",
        slug: "pre-law",
      },
      {
        name: "Business",
        description:
          "Courses and guidance for business studies, including management, finance, and entrepreneurship",
        slug: "business",
      },
      {
        name: "Nursing",
        description:
          "Education pathways for aspiring nurses, including NCLEX prep and career advice",
        slug: "nursing",
      },
      {
        name: "Other",
        description:
          "Additional academic areas and interdisciplinary programs not covered by other subcategories",
        slug: "other",
      },
    ],
  },
  {
    name: "Living",
    description: "Resources for daily life on and off campus",
    icon: ShoppingBasketIcon,
    slug: "living",
    color: "emerald",
    subcategories: [
      {
        name: "Jobs",
        description:
          "On-campus employment, internships, and part-time opportunities",
        slug: "jobs",
      },
      {
        name: "Rents",
        description:
          "Off-campus housing options, finding roommates, and leasing advice",
        slug: "rents",
      },
      {
        name: "Marketplace",
        description:
          "Buy, sell, and trade textbooks, furniture, and other essentials",
        slug: "marketplace",
      },
    ],
  },
  {
    name: "Photos",
    description: "Visual galleries of campus life and facilities",
    icon: ImageIcon,
    slug: "photos",
    color: "fuchsia",
    subcategories: [
      {
        name: "Campus",
        description: "School buildings, landmarks, and campus events",
        slug: "campus",
      },
      {
        name: "Dorms",
        description: "Residence halls, room layouts, and living spaces",
        slug: "dorms",
      },
    ],
  },
] satisfies Category[];

type Category = {
  name: string;
  slug: string;
  description: string;
  subcategories: Subcategory[];
  icon: LucideIcon;
  color: keyof typeof colorMap;
};

type Subcategory = {
  name: string;
  slug: string;
  description: string;
};

export { categories, colorMap, type Category, type Subcategory };
