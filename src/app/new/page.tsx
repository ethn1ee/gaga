import { Suspense } from "react";
import Form from "./_form/form";

const New = async () => {
  return (
    <main>
      <Suspense>
        <Form />
      </Suspense>
    </main>
  );
};

export default New;
