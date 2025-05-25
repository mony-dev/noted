import { NextRequest, NextResponse } from "next/server";
import { taskSchema } from "@/features/task/task.schema";
import { withAuth } from "@/lib/auth/withAuth"; 
import { taskService } from "@/features/task/task.service";


export async function POST(req: NextRequest) {
  return withAuth(req, async () => {
    const body = await req.json();
    const parsed = taskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    try {
      const created = await taskService.createTask(parsed.data);
      return NextResponse.json(created, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  });
}

export async function GET(req: NextRequest) {
  return withAuth(req, async () => {
    const url = new URL(req.url);
    const categoryId = url.searchParams.get("categoryId");
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
    const isComplete = url.searchParams.get("isComplete") === "true";

    if (!categoryId) {
      return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
    }

    const tasks = await taskService.getTasksPaginated(categoryId, page, pageSize, isComplete);
    return NextResponse.json(tasks);
  });
}
