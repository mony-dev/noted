import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/withAuth";
import { categoryTypeSchema } from "@/features/categoryType/categoryType.schema";
import { categoryTypeService } from "@/features/categoryType/categoryType.service";

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(req: NextRequest, { params }: Params) {
  return withAuth(req, async () => {
    try {
      const deleted = await categoryTypeService.deleteCategoryType(params.id);
      return NextResponse.json(deleted, { status: 200 });
    } catch (error: any) {
      console.error("DELETE /api/category-type/[id] failed:", error);
      return NextResponse.json({ message: "Delete failed" }, { status: 500 });
    }
  });
}

export async function PUT(req: NextRequest, { params }: Params) {
  return withAuth(req, async () => {
    const body = await req.json();
    const parsed = categoryTypeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    try {
      const updated = await categoryTypeService.updateCategoryType(params.id, parsed.data);
      return NextResponse.json(updated, { status: 200 });
    } catch (error: any) {
      console.error("PUT /api/category-type/[id] failed:", error);
      return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }
  });
}
