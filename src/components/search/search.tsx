"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [input, setInput] = useState(searchParams.get("q") ?? "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.length === 0) router.push("/");
    else router.push(`/search?q=${input}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="grow flex items-center h-12 px-4 bg-accent rounded-full border overflow-hidden">
        <SearchIcon size={20} className="text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search anything ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="grow h-full outline-none border-none shadow-none !bg-transparent focus-visible:ring-0"
        />
      </div>
      <Button
        size="icon"
        type="submit"
        variant="outline"
        className="w-12 h-12 rounded-full"
      >
        <ArrowRightIcon />
      </Button>
    </form>
  );
};

export default Search;
