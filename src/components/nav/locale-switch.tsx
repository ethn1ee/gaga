import { useLocale } from "@/hooks";
import { motion } from "motion/react";

const LocaleSwitch = () => {
  const { locale, toggleLocale } = useLocale();

  return (
    <div
      data-locale={locale}
      onClick={toggleLocale}
      className="group cursor-pointer border rounded-sm relative size-fit px-1.5 py-1.5 flex items-center gap-2 *:text-sm *:font-mono *:leading-none *:text-center *:text-muted-foreground"
    >
      <motion.div
        animate={{
          ...(locale === "ko" ? { left: 2 } : { right: 2 }),
          transition: { duration: 0.3 },
        }}
        className="absolute h-6 w-7 bg-muted -z-10 rounded-sm"
      />
      <span className="group-data-[locale=ko]:text-foreground w-5">한</span>
      <span className="group-data-[locale=en]:text-foreground w-5">EN</span>
    </div>
  );
};

export default LocaleSwitch;
