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
import { categories, colorMap, type Category } from "@/site-config";
import { ChevronRightIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
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
              <Link
                href="/"
                className="size-10 overflow-hidden relative animate hover:bg-transparent focus:bg-transparent hover:scale-110"
              >
                <Image src="/logo.png" alt="Logo" fill />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {categories.map((category, i) => (
            <CategoryItem key={i} category={category} />
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

type CategoryItemProps = {
  category: Category;
};

const CategoryItem = ({ category }: CategoryItemProps) => {
  const colors = colorMap[category.color];

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <category.icon size={20} className="text-muted-foreground mr-2" />
        <span>{category.name}</span>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] lg:grid-rows-5">
          <li className={`${colors.bg} !hover:${colors.bg} row-span-5`}>
            <Link
              className="flex h-full w-full flex-col justify-end rounded-md p-6"
              href={`/${category.slug}`}
            >
              <div
                className={`${colors.title} mt-4 mb-2 text-lg font-medium flex items-center gap-2`}
              >
                {category.name}
                <ChevronRightIcon size={20} className={colors.title} />
              </div>
              <p className="text-muted-foreground text-sm leading-tight">
                {category.description}
              </p>
            </Link>
          </li>
          {category.subcategories.map((subcategory, j) => (
            <SubcategoryItem
              key={j}
              href={`/${category.slug}/${subcategory.slug}`}
              title={subcategory.name}
            >
              {subcategory.description}
            </SubcategoryItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const SubcategoryItem = ({
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
