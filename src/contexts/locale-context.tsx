"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { createContext, type ReactNode } from "react";

export type Locale = "en" | "ko";

type LocaleContextType = {
  locale: Locale;
  toggleLocale: () => Promise<void>;
};

export const LocaleContext = createContext<LocaleContextType | undefined>(
  undefined,
);

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();

  const toggleLocale = async () => {
    let newLocale;
    if (locale === "en") newLocale = "ko";
    else newLocale = "en";

    try {
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      router.refresh();
    } catch (error) {
      console.error("Failed to set locale:", error);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale: locale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
