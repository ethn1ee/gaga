import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ChevronRightIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { navGroups } from "./data";

const Nav = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="w-screen flex justify-center items-center p-4 relative z-50">
        {navGroups.map((group, i) => (
          <NavigationMenuItem key={i}>
            <NavigationMenuTrigger>
              <group.icon size={20} className="text-muted-foreground mr-2" />
              <span>{group.title}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href={group.url}
                    >
                      <div className="mt-4 mb-2 text-lg font-medium flex items-center gap-2">
                        {group.title}
                        <ChevronRightIcon size={20} />
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        {group.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {group.items.map((item, j) => (
                  <ListItem key={j} href={item.url} title={item.title}>
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className="hover:bg-trasparent">
            <Link href="/new">
              <Button>
                <PlusIcon className="text-primary-foreground" />
                <span>New</span>
              </Button>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Nav;

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
