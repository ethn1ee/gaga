import { Search } from "@/components/search";
import { type ReactNode, Suspense } from "react";

export const experimental_ppr = true;

const HomeLayout = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <main className="space-y-6 md:space-y-10 pt-4">
      <Suspense>
        <Search />
      </Suspense>

      <section>
        <h1 className="mb-4">Welcome to EmoryLife!</h1>
        <p className="text-muted-foreground">
          A hub for the Korean community at Emory University.
          <br />
          Or at least a place to post campus squirrel pics.
        </p>
      </section>

      {children}
    </main>
  );
};

export default HomeLayout;
