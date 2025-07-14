import { type ReactNode, Suspense } from "react";
import Background from "./_components/background";

export const experimental_ppr = true;

const PostsLayout = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <main className="h-one-page px-4 md:py-20 flex flex-col md:flex-row items-center gap-4 md:gap-10 relative overflow-visible">
      <Background />
      <div className="flex-1 flex items-center justify-center size-full relative">
        <Suspense>{children}</Suspense>
      </div>
    </main>
  );
};

export default PostsLayout;
