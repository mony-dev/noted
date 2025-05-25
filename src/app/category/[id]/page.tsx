import { notFound } from "next/navigation";
import { categoryService } from "@/features/category/category.service";
import CategoryDetailServer from "@/components/category/Detail";
import { CategoryWithIdAndType } from "@/features/category/category.types";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: {  params: Promise<{ id: string }> }) {
  const { id } = await params

  if (!id) return notFound();

  const category = await categoryService.getCategoryById(id) as CategoryWithIdAndType;
  console.log("category", category);
  if (!category) return notFound();

  return (
    <CategoryDetailServer category={category} />
  );
}
