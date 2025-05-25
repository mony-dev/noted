import { NextRequest, NextResponse } from "next/server";
import { categoryTypeSchema } from "@/features/categoryType/categoryType.schema";
import { categoryTypeService } from "@/features/categoryType/categoryType.service";
import { withAuth } from "@/lib/auth/withAuth"; 

export async function POST(req: NextRequest) {
  return withAuth(req, async () => {
    const body = await req.json();
    const parsed = categoryTypeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    try {
      const created = await categoryTypeService.createCategoryType(parsed.data);
      return NextResponse.json(created, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  });
}

export async function GET(req: NextRequest) {
  return withAuth(req, async () => {
    try {
      const types = await categoryTypeService.getAllCategoryTypes();
      return NextResponse.json(types);
    } catch (error) {
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  });
}
