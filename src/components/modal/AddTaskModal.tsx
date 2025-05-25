"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskForm } from "@/features/task/task.schema";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  categoryId: string;
  initialData?: {
    id: string;
    title: string;
    description?: string;
    priority: string;
    startTime?: string;
    endTime?: string;
    isComplete: boolean;
    categoryId: string;
  };
};

export default function AddTaskModal({
  open,
  onClose,
  onCreated,
  categoryId,
  initialData,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      startTime: "",
      endTime: "",
      isComplete: false,
      categoryId: categoryId,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description ?? "",
        priority: initialData.priority as "LOW" | "MEDIUM" | "HIGH" | "URGENT",
        startTime: initialData.startTime ?? "",
        endTime: initialData.endTime ?? "",
        isComplete: initialData.isComplete,
        categoryId: initialData.categoryId,
      });
    } else {
      reset({
        title: "",
        description: "",
        priority: "MEDIUM",
        startTime: "",
        endTime: "",
        isComplete: false,
        categoryId: categoryId,
      }); // for create mode
    }
  }, [initialData, reset]);

  const onSubmit = async (data: TaskForm) => {
    const isEdit = Boolean(initialData?.id);
    const url = isEdit ? `/api/task/${initialData!.id}` : `/api/task`;

    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer fortestapikey123",
      },
      body: JSON.stringify({ ...data, categoryId }),
    });

    if (res.ok) {
      toast.success(isEdit ? "Task updated!" : "Task created!");
      onCreated();
      reset();
      onClose();
    } else {
      const err = await res.json();
      toast.error(err.message ?? "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Task" : "Add Task"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="space-y-4">
          <TextField
            label="Title"
            fullWidth
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Priority"
                fullWidth
                value={field.value}
                onChange={field.onChange}
                error={!!errors.priority}
                helperText={errors.priority?.message}
              >
                {priorities.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <TextField
            label="Start Time"
            fullWidth
            type="time"
            {...register("startTime")}
            error={!!errors.startTime}
            helperText={errors.startTime?.message}
          />
          <TextField
            label="End Time"
            fullWidth
            type="time"
            {...register("endTime")}
            error={!!errors.endTime}
            helperText={errors.endTime?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
