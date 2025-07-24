"use client";

import { AffiliationForm } from "@/components/auth/form";
import InfoTable from "@/components/profile/info-table";
import { useTranslations } from "next-intl";

const EmoryAffiliation = () => {
  const t = useTranslations("auth.inputs");
  const tTitle = useTranslations("profile.sections.affiliation")("title");

  const fields = [
    {
      title: t("affiliation.label"),
      field: "affiliation",
      editable: true,
      translate: true,
    },
    { title: t("emory-email.label"), field: "emoryEmail", editable: true },
    { title: t("class.label"), field: "class", editable: true },
  ];

  return (
    <InfoTable
      title={tTitle}
      fields={fields}
      editFormFields={<AffiliationForm />}
    />
  );
};

export default EmoryAffiliation;
