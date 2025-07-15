import { type ReactNode, Suspense } from "react";
import Background from "./_components/background";

export const experimental_ppr = true;

const AuthLayout = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <main className="h-full min-h-one-page md:h-[calc(100svh-80px)] px-4 md:py-20 flex items-center gap-4 md:gap-10 relative overflow-visible">
      <Background />
      <div className="flex-1 relative flex justify-center">
        <Suspense>{children}</Suspense>
      </div>
    </main>
  );
};

export default AuthLayout;
