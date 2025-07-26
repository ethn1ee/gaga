"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BreadcrumbTitle from "../ui/title";

const Search = () => {
  const tSearch = useTranslations("search")("title");
  const tCategory = useTranslations("category");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [input, setInput] = useState("");

  const primary = pathname.split("/")[1]?.toLowerCase();
  const secondary = pathname.split("/")[2]?.toLowerCase();
  const linkPrimary = `/${primary}`;
  const linkSecondary = `/${primary}/${secondary}`;

  const tPrimary = primary
    ? primary === "search"
      ? tSearch
      : tCategory(`${primary}.title`)
    : undefined;

  const tSecondary = secondary
    ? tCategory(`${primary}.subcategories.${secondary}.title`)
    : undefined;

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setInput(q);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.length === 0) router.push("/");
    else router.push(`/search?q=${input}`);
  };

  return (
    <div>
      {tPrimary && (
        <BreadcrumbTitle
          primary={tPrimary}
          secondary={tSecondary}
          linkPrimary={linkPrimary}
          linkSecondary={linkSecondary}
          className="mb-4 max-md:hidden"
        />
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="grow flex items-center h-12 px-4 bg-accent rounded-full overflow-hidden">
          <SearchIcon size={20} className="text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search anything ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="grow h-full clear-input-style"
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
