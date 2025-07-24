"use client";

import { LocaleContext } from "@/contexts/locale-context";
import { useContext } from "react";

const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};

export default useLocale;
