import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { navGroups } from "./data";

const NavSheet = ({ className }: React.ComponentProps<"nav">) => {
  return (
    <nav className={cn("w-full py-4", className)}>
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="gap-0 h-svh overflow-auto pb-10">
          <SheetHeader className="sr-only">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <ul className="mt-16">
            {navGroups.map((group, i) => (
              <li key={i} className="mb-2">
                <SheetClose asChild>
                  <Link href={group.url}>
                    <Button
                      variant="ghost"
                      className="py-3 !px-4 w-full h-fit justify-between text-xl font-semibold"
                    >
                      {group.title}
                      <ChevronRightIcon />
                    </Button>
                  </Link>
                </SheetClose>
                <ul className="border-l">
                  {group.items.map((item, j) => (
                    <li key={j}>
                      <SheetClose asChild>
                        <Link href={item.url}>
                          <Button
                            variant="ghost"
                            className="py-3 px-4 pl-6 w-full h-fit justify-start text-lg font-normal"
                          >
                            {item.title}
                          </Button>
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default NavSheet;
