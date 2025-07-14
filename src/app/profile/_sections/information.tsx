"use client";

import { NameFormField } from "@/components/auth/form/fields";
import { InfoTable } from "@/components/profile";

const Information = () => {
  const fields = [
    {
      title: "Name",
      field: "name",
      editable: true,
    },
    { title: "Email", field: "email" },
  ];

  return (
    <InfoTable
      title="My Information"
      fields={fields}
      editFormFields={
        <>
          <NameFormField />
        </>
      }
    />
  );
};

export default Information;
