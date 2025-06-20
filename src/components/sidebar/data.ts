import {
  BedIcon,
  GalleryVerticalEnd,
  GlobeIcon,
  GraduationCapIcon,
  MapIcon,
  ShoppingBasketIcon,
  type LucideIcon,
} from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navForum: [
    {
      title: "General",
      icon: GlobeIcon,
      url: "/general",
      isActive: true,
      items: [
        {
          title: "New Students",
          url: "/general/new-students",
        },
        {
          title: "International Students",
          url: "/general/international-students",
        },
        {
          title: "Financial Aid",
          url: "/general/financial-aid",
        },
      ],
    },
    {
      title: "Academics",
      icon: GraduationCapIcon,
      url: "/academics",
      items: [
        {
          title: "Pre-med",
          url: "/academics/pre-med",
        },
      ],
    },
    {
      title: "Living",
      icon: ShoppingBasketIcon,
      url: "/living",
      items: [
        {
          title: "Jobs",
          url: "/living/jobs",
        },
        {
          title: "Rents",
          url: "/living/rents",
        },
        {
          title: "Marketplace",
          url: "/living/marketplace",
        },
      ],
    },
  ] satisfies NavItem[],
  navGallery: [
    {
      title: "Campus",
      url: "/gallery/campus",
      icon: MapIcon,
    },
    {
      title: "Dorms",
      url: "/gallery/dorms",
      icon: BedIcon,
    },
  ] satisfies NavItem[],
};

type NavItem = {
  title: string;
  icon: LucideIcon;
  url: string;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

export { data, type NavItem };
