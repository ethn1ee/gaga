"use client";

import { formatNumber } from "@/lib/utils";
import { categories, type Category, colorMap } from "@/site-config";
import { ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type CategoryThumbnailsProps = {
  stats: Record<string, { posts: number; comments: number; views: number }>;
};

const CategoryThumbnails = ({ stats }: CategoryThumbnailsProps) => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 h-50 gap-2 lg:gap-3">
      {categories.map((category, i) => (
        <Thumbnail key={i} category={category} stat={stats[category.slug]} />
      ))}
    </section>
  );
};

export default CategoryThumbnails;

type ThumbnailProps = {
  category: Category;
  stat?: {
    posts: number;
    comments: number;
    views: number;
  };
};

const Thumbnail = ({ category, stat }: ThumbnailProps) => {
  const t = useTranslations("category");

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

  const colors = colorMap[category.color];

  return (
    <motion.div
      whileHover="hover"
      initial="default"
      animate="default"
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${colors.bg} ${colors.shadow} border group transition-all hover:shadow-md rounded-md p-3 relative overflow-hidden cursor-pointer`}
    >
      <Link href={`/${category.slug}`} className="size-full">
        <category.icon
          className={`${colors.icon} absolute -right-5 md:-right-10 -top-5 md:-top-10 size-30 md:size-40 lg:size-50 transition-all duration-300 group-hover:opacity-50 group-hover:scale-103`}
        />

        <div className="absolute left-3 bottom-3">
          <span
            className={`${colors.title} text-xl md:text-2xl font-normal flex items-center`}
          >
            {t(`${category.slug}.title`)}
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
            className="text-muted-foreground text-sm font-light space-x-1"
          >
            <span>{formatNumber(stat?.posts ?? 0)} posts</span>
            <span className="text-border">|</span>
            <span>{formatNumber(stat?.comments ?? 0)} comments</span>
            <span className="text-border">|</span>
            <span>{formatNumber(stat?.views ?? 0)} views</span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};
