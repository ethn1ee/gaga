import { Skeleton } from "@/components/ui/skeleton";

type TitleProps = {
  title: string | undefined;
  isLoading: boolean;
};

const Title = ({ title, isLoading }: TitleProps) => {
  return (
    <div className="border-b mb-5 pb-2">
      {isLoading || !title ? (
        <Skeleton className="h-8 w-100 mt-2" />
      ) : (
        <h1 className="font-semibold text-3xl mt-1">{title}</h1>
      )}
    </div>
  );
};

export default Title;
