"use client";

import { Button } from "@/components/ui/button";
import { categories } from "@/sitemap";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="max-md:hidden h-[400px] relative"
    >
      <div className="relative h-[calc(100vh+400px)] -top-[100vh]">
        <div className="sticky h-[400px] top-[calc(100vh-400px)] bg-accent">
          <div className="relative h-full container mx-auto flex flex-wrap gap-10 justify-between p-4 overflow-hidden">
            <span className="grow-0 shrink-0 text-9xl font-thin tracking-tighter text-muted-foreground">
              EmoryLife
            </span>
            <div className="h-full flex flex-wrap justify-between grow shrink">
              {categories.map((category, i) => (
                <div dir="rtl" key={i} className="basis-1/4 pr-4">
                  <Link
                    href={`/${category.slug}`}
                    className="font-semibold group"
                  >
                    {category.name}
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-foreground/20" />
                  </Link>
                  <ul dir="rtl" className="space-y-2 mt-2">
                    {category.subcategories.map((subcategory, j) => (
                      <li key={j} className="text-muted-foreground">
                        <Link
                          href={`/${category.slug}/${subcategory.slug}`}
                          className="group"
                        >
                          {subcategory.name}
                          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-foreground/20" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="absolute left-0 bottom-0 p-4 items-end w-full flex justify-between">
              <Link
                href="https://github.com/ethn1ee"
                className="text-muted-foreground group leading-none text-sm"
              >
                Made by Taehoon Lee, Class of &apos;26
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-foreground/20" />
              </Link>
              <div>
                <Link href="https://github.com/ethn1ee/gaga">
                  <Button size="icon">
                    <IconBrandGithub />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
