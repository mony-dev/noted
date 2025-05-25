import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/withAuth";
import { categorySchema } from "@/features/category/category.schema";
import { categoryService } from "@/features/category/category.service";

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(req: NextRequest, { params }: Params) {
  return withAuth(req, async () => {
    try {
      const deleted = await categoryService.deleteCategory(params.id);
      return NextResponse.json(deleted, { status: 200 });
    } catch (error: any) {
      console.error("DELETE /api/category/[id] failed:", error);
      return NextResponse.json({ message: "Delete failed" }, { status: 500 });
    }
  });
}

export async function PUT(req: NextRequest, { params }: Params) {
  return withAuth(req, async () => {
    const body = await req.json();
    const parsed = categorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    try {
      const updated = await categoryService.updateCategory(params.id, parsed.data);
      return NextResponse.json(updated, { status: 200 });
    } catch (error: any) {
      console.error("PUT /api/category/[id] failed:", error);
      return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }
  });
}
