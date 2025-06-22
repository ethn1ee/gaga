"use client";

import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { navGroups } from "./data";

const NavMobile = ({ className }: React.ComponentProps<"nav">) => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn(
        "w-full relative flex p-4 items-center border-b",
        className,
      )}
    >
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

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="absolute top-0 left-0 bg-background z-40 w-svw h-svh py-12 overflow-auto"
          >
            {navGroups.map((group, i) => (
              <li key={i} className="mb-2">
                <Link href={group.url} onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    className="py-3 !px-4 w-full h-fit justify-between text-xl font-semibold"
                  >
                    {group.title}
                    <ChevronRightIcon />
                  </Button>
                </Link>

                <ul className="border-l">
                  {group.items.map((item, j) => (
                    <li key={j}>
                      <Link href={item.url} onClick={() => setOpen(false)}>
                        <Button
                          variant="ghost"
                          className="py-3 px-4 pl-6 w-full h-fit justify-start text-lg font-normal"
                        >
                          {item.title}
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
