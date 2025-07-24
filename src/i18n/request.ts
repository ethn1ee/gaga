"use server";

import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? "ko";

  return {
    locale,
    // eslint-disable-next-line
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
