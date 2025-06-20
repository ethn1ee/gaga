"use client";

import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import Search from "./search";

const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 grow">
        <SidebarTrigger className="-ml-1 text-foreground" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {/* <Breadcrumb /> */}
        <Search />
      </div>
    </header>
  );
};

export default Header;
