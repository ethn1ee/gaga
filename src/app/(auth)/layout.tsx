import { type ReactNode, Suspense } from "react";

export const experimental_ppr = true;

const PostsLayout = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <>
      <Suspense>{children}</Suspense>
    </>
  );
};

export default PostsLayout;
