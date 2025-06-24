"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Title from "../title";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const paths = pathname.split("/").slice(1);

  const [input, setInput] = useState("");

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
      {paths[0] && (
        <Title
          primary={paths[0]}
          secondary={paths[1]}
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
