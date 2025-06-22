import { Suspense } from "react";
import Results from "./results";

export const dynamic = "force-dynamic";

const SearchPage = () => {
  return (
    <Suspense>
      <Results />
    </Suspense>
  );
};

export default SearchPage;
