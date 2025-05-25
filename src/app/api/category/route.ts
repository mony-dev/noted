import { NextRequest, NextResponse } from "next/server";
import { categorySchema } from "@/features/category/category.schema";
import { categoryService } from "@/features/category/category.service";
import { withAuth } from "@/lib/auth/withAuth"; 

export async function POST(req: NextRequest) {
  return withAuth(req, async () => {
    const body = await req.json();
    const parsed = categorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    try {
      const { name } = parsed.data;
      // If typeId is expected, extract it safely or set a default/fallback
      const typeId = (parsed.data as any).typeId;
      if (typeof typeId === "undefined") {
        return NextResponse.json({ errors: { typeId: ["typeId is required"] } }, { status: 400 });
      }
      console.log(typeId);
      const created = await categoryService.createCategory({ name, typeId });
      return NextResponse.json(created, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  });
}

export async function GET(req: NextRequest) {
  return withAuth(req, async () => {
    try {
      const types = await categoryService.getAllCategories();
      return NextResponse.json(types);
    } catch (error) {
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  });
}
