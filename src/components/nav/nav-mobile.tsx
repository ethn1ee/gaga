"use client";

import { Button } from "@/components/ui/button";
import { cn, isValidPath } from "@/lib/utils";
import { categories } from "@/site-config";
import { ChevronRightIcon, PlusIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Title from "../ui/title";
import LocaleSwitch from "./locale-switch";
import UserButton from "./user-button";

const NavMobile = ({ className }: React.ComponentProps<"nav">) => {
  const t = useTranslations();

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const parts = pathname.split("/").slice(1);
    if (isValidPath(parts)) {
      setPaths(parts);
    } else {
      setPaths([]);
    }
  }, [pathname]);

  return (
    <nav
      className={cn("flex justify-between px-4 py-2 items-center", className)}
    >
      <div className="flex gap-4 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="relative z-50 size-6"
        >
          <motion.div
            animate={{ rotate: open ? 45 : 0, top: open ? 12 : 6 }}
            transition={{ duration: 0.3, ease: "anticipate" }}
            className="h-0.5 w-6 bg-foreground absolute top-1.5"
          />
          <motion.div
            animate={{ rotate: open ? -45 : 0, bottom: open ? 10 : 6 }}
            transition={{ duration: 0.3, ease: "anticipate" }}
            className="h-0.5 w-6 bg-foreground absolute bottom-1.5"
          />
        </Button>
        <Title size="xs" primary={paths[0] ?? ""} secondary={paths[1]} />
      </div>

      <div className="flex gap-2.5">
        <LocaleSwitch />
        <UserButton />
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="fixed top-0 left-0 bg-background z-40 w-screen h-screen flex flex-col gap-1 pt-16 pb-20 overflow-y-scroll pointer-events-auto"
          >
            <li className="w-full px-4 flex flex-col gap-2 mb-2">
              <Link href="/new" onClick={() => setOpen(false)}>
                <Button className="w-full">
                  <PlusIcon className="text-primary-foreground" />
                  <span>{t("misc.new-post")}</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className="py-3 !px-4 w-full h-fit justify-between text-xl font-semibold"
                >
                  {t("misc.home")}
                  <ChevronRightIcon />
                </Button>
              </Link>
            </li>
            {categories.map((category, i) => (
              <li key={i}>
                <Link href={`/${category.slug}`} onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    className="py-3 !px-4 w-full h-fit justify-between text-xl font-semibold"
                  >
                    {t(`category.${category.slug}.title`)}
                    <ChevronRightIcon />
                  </Button>
                </Link>

                <ul className="border-l">
                  {category.subcategories.map((subcategory, j) => (
                    <li key={j}>
                      <Link
                        href={`/${category.slug}/${subcategory.slug}`}
                        onClick={() => setOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="py-3 px-4 pl-6 w-full h-fit justify-start text-lg font-normal"
                        >
                          {t(
                            `category.${category.slug}.subcategories.${subcategory.slug}.title`,
                          )}
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavMobile;
