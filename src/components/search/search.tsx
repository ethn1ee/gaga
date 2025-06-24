"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Title from "../title";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [category, subcategory] = pathname.split("/").slice(1, 3);

  const [input, setInput] = useState(searchParams.get("q") ?? "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.length === 0) router.push("/");
    else router.push(`/search?q=${input}`);
  };

  return (
    <div>
      {category && (
        <Title
          primary={category}
          secondary={subcategory}
          withLink
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
