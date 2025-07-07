import { PaginatedPostTable } from "@/components/post";

type SubcategoryProps = {
  params: Promise<{ category: string; subcategory: string }>;
};

const Subcategory = async ({ params }: SubcategoryProps) => {
  const { category, subcategory } = await params;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <PaginatedPostTable
        isLoading={!category || !subcategory}
        query={{
          category,
          subcategory,
        }}
        numRows={20}
      />
    </div>
  );
};

export default Subcategory;
