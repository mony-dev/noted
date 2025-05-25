"use client";

import { CategoryWithId } from "@/features/category/category.schema";
import { TaskWithId } from "@/features/task/task.schema";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import TaskBoard from "@/components/category/TaskBoard";

type Props = {
  category: CategoryWithId & {
    tasks: TaskWithId[];
    type: {
      id: string;
      name: string;
      categories: { id: string; name: string }[];
    };
  };
};

export default function CategoryDetailServer({ category }: Props) {
  const [activeId] = useState(category.id); 
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4 text-black">{category.name}</h1>

      {/* Tabs */}
      <div className="flex border-b mb-4 overflow-x-auto whitespace-nowrap text-mediumGray">
        {category.type.categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className={clsx(
              "px-4 py-2 text-sm",
              cat.id === activeId
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-mediumGray"
            )}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Task list */}
      <TaskBoard />
    </div>
  );
}
