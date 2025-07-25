"use client";

import { NameFormField } from "@/components/auth/form/fields";
import { InfoTable } from "@/components/profile";
import { useTranslations } from "next-intl";

const Information = () => {
  const t = useTranslations("auth.inputs");
  const tTitle = useTranslations("profile.sections.my-information")("title");

  const fields = [
    {
      title: t("name.label"),
      field: "name",
      editable: true,
    },
    { title: t("email.label", { isSignUp: "false" }), field: "email" },
  ];

  return (
    <InfoTable
      title={tTitle}
      fields={fields}
      editFormFields={<NameFormField />}
    />
  );
};

export default Information;
