"use client";

import { useLocale } from "@/hooks";
import { motion } from "motion/react";

const LocaleSwitch = () => {
  const { locale, toggleLocale } = useLocale();

  return (
    <div
      data-locale={locale}
      onClick={toggleLocale}
      className="group cursor-pointer border rounded-md relative h-9 px-1 flex items-center [&_span]:w-7 *:text-sm *:font-mono *:leading-none *:text-center *:text-muted-foreground"
    >
      <motion.div
        animate={{
          ...(locale === "ko" ? { x: 0 } : { x: 28 }),
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        className="absolute size-7 bg-muted -z-10 rounded-sm"
      />
      <span className="group-data-[locale=ko]:text-foreground">한</span>
      <span className="group-data-[locale=en]:text-foreground">A</span>
    </div>
  );
};

export default LocaleSwitch;
