import { PostTable } from "@/components/post";
import { Suspense } from "react";
import Results from "./results";

export const dynamic = "force-dynamic";

const SearchPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50svh] flex flex-col mt-4">
          <PostTable data={[]} isLoading={true} />
        </div>
      }
    >
      <Results />
    </Suspense>
  );
};

export default SearchPage;
