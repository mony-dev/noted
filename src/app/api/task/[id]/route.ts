import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth/withAuth";
import { taskSchema } from "@/features/task/task.schema";
import { taskService } from "@/features/task/task.service";

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(req: NextRequest, { params }: Params) {
  return withAuth(req, async () => {
    try {
      const deleted = await taskService.deleteTask(params.id);
      return NextResponse.json(deleted, { status: 200 });
    } catch (error: any) {
      console.error("DELETE /api/task/[id] failed:", error);
      return NextResponse.json({ message: "Delete failed" }, { status: 500 });
    }
  });
}

export async function PUT(req: NextRequest, { params }: Params) {
  return withAuth(req, async () => {
    const body = await req.json();
    const parsed = taskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    try {
      const updated = await taskService.updateTask(params.id, parsed.data);
      return NextResponse.json(updated, { status: 200 });
    } catch (error: any) {
      console.error("PUT /api/task/[id] failed:", error);
      return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }
  });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  return withAuth(req, async () => {
    const { isComplete } = await req.json();

    if (typeof isComplete !== "boolean") {
      return NextResponse.json({ message: "isComplete must be boolean" }, { status: 400 });
    }

    try {
      const updated = await taskService.completeTask(params.id, { isComplete });
      return NextResponse.json(updated, { status: 200 });
    } catch (error: any) {
      console.error("PATCH /api/task/[id] failed:", error);
      return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }
  });
}