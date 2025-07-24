"use client";

import { type SignUpInput } from "@/lib/schema";
import { useFormContext } from "react-hook-form";
import {
  AffiliationFormField,
  ClassFormField,
  EmoryEmailFormField,
} from "./fields";

const AffiliationForm = () => {
  const form = useFormContext<Pick<SignUpInput, "affiliation">>();

  return (
    <>
      <AffiliationFormField />
      {form.watch("affiliation") !== "none" && (
        <>
          <EmoryEmailFormField />
          <ClassFormField />
        </>
      )}
    </>
  );
};

export default AffiliationForm;
