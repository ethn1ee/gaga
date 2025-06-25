"use client";

import {
  ChevronRightIcon,
  GlobeIcon,
  GraduationCapIcon,
  ImageIcon,
  ShoppingBasketIcon,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

type CategoryThumbnailsProps = {
  stats: Record<string, { posts: number; comments: number }>;
};

const CategoryThumbnails = ({ stats }: CategoryThumbnailsProps) => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 h-50 gap-2 lg:gap-3">
      <Thumbnail
        category="General"
        stat={stats.general}
        icon={GlobeIcon}
        color="cyan"
      />
      <Thumbnail
        category="Academics"
        stat={stats.academics}
        icon={GraduationCapIcon}
        color="lime"
      />
      <Thumbnail
        category="Living"
        stat={stats.living}
        icon={ShoppingBasketIcon}
        color="emerald"
      />
      <Thumbnail
        category="Photos"
        stat={stats.photos}
        icon={ImageIcon}
        color="fuchsia"
      />
    </section>
  );
};

export default CategoryThumbnails;

type ThumbnailProps = {
  category: string;
  stat?: {
    posts: number;
    comments: number;
    // views: number;
  };
  icon: LucideIcon;
  color: keyof typeof colorMap;
};

const Thumbnail = ({
  category,
  stat = { posts: 0, comments: 0 },
  icon: Icon,
  color,
}: ThumbnailProps) => {
  const detailVariant = {
    default: {
      opacity: 0,
      height: 0,
    },
    hover: {
      opacity: 1,
      height: "auto",
    },
  };
  const chevronVariant = {
    default: {
      opacity: 0,
      x: 0,
    },
    hover: {
      opacity: 1,
      x: 4,
    },
  };

  const colors = colorMap[color];

  return (
    <motion.div
      whileHover="hover"
      initial="default"
      animate="default"
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${colors.bg} ${colors.shadow} border  transition-all hover:shadow-md rounded-md p-3 relative overflow-hidden cursor-pointer`}
    >
      <Link href={`/${category}`} className="size-full">
        <Icon
          className={`${colors.icon} absolute -right-5 md:-right-10 -top-5 md:-top-10 size-30 md:size-40 lg:size-50`}
        />

        <div className="absolute left-3 bottom-3">
          <span
            className={`${colors.title} text-xl md:text-2xl font-normal flex items-center`}
          >
            {category}
            <motion.span
              variants={chevronVariant}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="inline-block"
            >
              <ChevronRightIcon size={20} />
            </motion.span>
          </span>
          <motion.div
            variants={detailVariant}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-muted-foreground text-sm font-light space-x-2"
          >
            <span>{stat.posts} posts</span>
            <span className="text-border">|</span>
            <span>{stat.comments} comments</span>
            <span className="text-border">|</span>
            <span>{0} views</span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

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
