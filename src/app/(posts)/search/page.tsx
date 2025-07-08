import { Suspense } from "react";
import Results from "./results";

const SearchPage = () => {
  return (
    <Suspense>
      <Results />
    </Suspense>
  );
};

export default SearchPage;
