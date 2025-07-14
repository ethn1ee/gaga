"use client";

import { AffiliationForm } from "@/components/auth/form";
import InfoTable from "@/components/profile/info-table";

const EmoryAffiliation = () => {
  const fields = [
    {
      title: "Affiliation",
      field: "affiliation",
      editable: true,
    },
    { title: "Emory Email", field: "emoryEmail", editable: true },
    { title: "Class", field: "class", editable: true },
  ];

  return (
    <InfoTable
      title="Emory Affiliation"
      fields={fields}
      editFormFields={<AffiliationForm />}
    />
  );
};

export default EmoryAffiliation;
