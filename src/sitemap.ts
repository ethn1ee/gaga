import {
  GlobeIcon,
  GraduationCapIcon,
  ImageIcon,
  type LucideIcon,
  ShoppingBasketIcon,
} from "lucide-react";

const categories = [
  {
    name: "General",
    description: "Essential information for navigating college life",
    icon: GlobeIcon,
    slug: "general",
    subcategories: [
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
    subcategories: [
      {
        name: "Pre-med",
        description:
          "Course requirements, MCAT prep, and medical school application tips",
        slug: "pre-med",
      },
      {
        name: "Pre-law",
        description: "",
        slug: "pre-law",
      },
      {
        name: "Business",
        description: "",
        slug: "business",
      },
      {
        name: "Nursing",
        description: "",
        slug: "nursing",
      },
      {
        name: "Other",
        description: "",
        slug: "other",
      },
    ],
  },
  {
    name: "Living",
    description: "Resources for daily life on and off campus",
    icon: ShoppingBasketIcon,
    slug: "living",
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
};

type Subcategory = {
  name: string;
  slug: string;
  description: string;
};

export { categories, type Category, type Subcategory };
