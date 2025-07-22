"use client";

import { Button } from "@/components/ui/button";
import { categories } from "@/site-config";
import { IconBrandGithub } from "@tabler/icons-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const { scrollYProgress } = useScroll();
  const [opacity, setOpacity] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (val) => {
    setOpacity(val / 2 + 0.5);
  });

  return (
    <footer
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="max-md:hidden h-[400px] relative"
    >
      <div className="relative h-[calc(100vh+400px)] -top-[100vh] bg-foreground">
        <motion.div
          animate={{ opacity }}
          transition={{ duration: 0.1 }}
          className="sticky h-[400px] top-[calc(100vh-400px)] bg-accent"
        >
          <div className="relative h-full container mx-auto flex flex-wrap gap-10 justify-between p-4 overflow-hidden">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={200}
              className="size-50 object-cover opacity-75"
            />

            <div className="h-full flex flex-wrap justify-between grow shrink">
              {categories.map((category, i) => (
                <div dir="rtl" key={i} className="basis-1/4 pr-4">
                  <Link
                    href={`/${category.slug}`}
                    className="font-semibold after:bg-foreground animate-underline"
                  >
                    {category.name}
                  </Link>
                  <ul dir="rtl" className="space-y-2 mt-2">
                    {category.subcategories.map((subcategory, j) => (
                      <li key={j} className="text-muted-foreground">
                        <Link
                          href={`/${category.slug}/${subcategory.slug}`}
                          className="after:bg-muted-foreground animate-underline"
                        >
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="absolute left-0 bottom-0 p-4 items-end w-full flex justify-between">
              <p className="leading-none text-sm text-muted-foreground">
                © EmoryLife {new Date().getFullYear()}. All rights reserved.
              </p>

              <Link href="https://github.com/ethn1ee/gaga">
                <Button size="icon">
                  <IconBrandGithub />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
