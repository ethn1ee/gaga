"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categories } from "@/sitemap";
import { ChevronRightIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import UserButton from "./user-button";

const NavDesktop = ({
  className,
}: React.ComponentProps<typeof NavigationMenu>) => {
  return (
    <NavigationMenu viewport={false} className={className}>
      <NavigationMenuList className="w-screen flex justify-between items-center py-4 px-5 relative z-50">
        <div className="flex items-center max-w-[600px] justify-between flex-1">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className="size-10 bg-accent border rounded" />
            </NavigationMenuLink>
          </NavigationMenuItem>
          {categories.map((category, i) => (
            <NavigationMenuItem key={i}>
              <NavigationMenuTrigger>
                <category.icon
                  size={20}
                  className="text-muted-foreground mr-2"
                />
                <span>{category.name}</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                        href={`/${category.slug}`}
                      >
                        <div className="mt-4 mb-2 text-lg font-medium flex items-center gap-2">
                          {category.name}
                          <ChevronRightIcon size={20} />
                        </div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          {category.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {category.subcategories.map((subcategory, j) => (
                    <ListItem
                      key={j}
                      href={`/${category.slug}/${subcategory.slug}`}
                      title={subcategory.name}
                    >
                      {subcategory.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </div>

        <div className="flex">
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className="focus:bg-transparent hover:bg-trasparent"
            >
              <Link href="/new">
                <Button>
                  <PlusIcon className="text-primary-foreground" />
                  <span>New Post</span>
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink className="focus:bg-transparent hover:bg-trasparent">
              <UserButton />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavDesktop;

const ListItem = ({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) => {
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
};
