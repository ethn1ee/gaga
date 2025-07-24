"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Nova_Mono } from "next/font/google";
import Link from "next/link";

const novaMono = Nova_Mono({ subsets: ["latin"], weight: "400" });

const Complete = () => {
  const t = useTranslations("auth.buttons");
  const { user } = useAuth();

  return (
    <section className="flex flex-col gap-6 w-full relative">
      <motion.div
        initial={{ top: 20, right: 40, opacity: 0 }}
        animate={{ top: -40, right: -20, opacity: 1 }}
        transition={{ duration: 1 }}
        className="rounded-full size-100 absolute bg-lime-200 blur-2xl"
      />
      <motion.div
        initial={{ bottom: 60, right: 60, opacity: 0 }}
        animate={{ bottom: 0, left: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="rounded-full size-70 absolute bottom-0 left-0 bg-cyan-100 blur-2xl"
      />
      <motion.div
        initial={{ top: 70, left: 70, opacity: 0 }}
        animate={{ top: 10, left: 10, opacity: 1 }}
        transition={{ duration: 1 }}
        className="rounded-full size-40 absolute top-0 left-0 bg-amber-200 blur-2xl"
      />
      {user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="rounded-xl border p-5 relative overflow-hidden h-100 flex flex-col justify-end cursor-pointer backdrop-blur-2xl"
        >
          <h3 className={`relative z-10 text-4xl`}>{user.name}</h3>

          <p className="text-sm text-muted-foreground relative z-10">
            {user.email}
          </p>

          <span
            className={`${novaMono.className} absolute top-5 right-5 text-muted-foreground text-xs`}
          >
            JUL 12, 2025
          </span>
        </motion.div>
      )}
      <Link href="/" className="w-full">
        <Button type="button" className="relative z-10 w-full">
          {t("start-exploring")}
        </Button>
      </Link>
    </section>
  );
};

export default Complete;
