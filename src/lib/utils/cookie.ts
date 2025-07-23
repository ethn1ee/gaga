"use server";

import { cookies } from "next/headers";

type SetCookieProps = {
  key: string;
  value: string;
};

export const setCookie = async ({ key, value }: SetCookieProps) => {
  const cookieStore = await cookies();

  cookieStore.set(key, value);
};

export const getCookie = async (key: string) => {
  const cookieStore = await cookies();

  return cookieStore.get(key)?.value;
};
