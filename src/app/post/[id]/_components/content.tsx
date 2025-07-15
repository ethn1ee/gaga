import { Loader2Icon } from "lucide-react";

type ContentProps = {
  content: string | undefined;
  isLoading: boolean;
};
const Content = ({ content, isLoading }: ContentProps) => {
  return (
    <div className="space-y-4">
      {isLoading || !content ? (
        <div className="h-180 flex items-center justify-center">
          <Loader2Icon className="animate-spin text-muted-foreground" />
        </div>
      ) : (
        content.split("\n").map((item, i) => <p key={i}>{item}</p>)
      )}
    </div>
  );
};

export default Content;
