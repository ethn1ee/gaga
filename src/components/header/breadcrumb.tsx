"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").slice(1);

  return (
    <BreadcrumbComponent>
      <BreadcrumbList>
        {paths.map((item, i) => {
          const isLast = i === paths.length - 1;
          const link = "/" + paths.slice(0, i + 1).join("/");

          return (
            <Fragment key={i}>
              <BreadcrumbItem key={i} className="hidden md:block">
                {isLast ? (
                  <BreadcrumbPage>{item}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={link}>{item}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
};

export default Breadcrumb;
