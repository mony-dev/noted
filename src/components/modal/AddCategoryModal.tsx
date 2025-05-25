"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-toastify";

import {
  categorySchema,
  CategoryForm,
} from "@/features/category/category.schema";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  initialData?: {
    id: string;
    name: string;
  };    
  typeId: string | null;
};

const AddCategoryModal = ({ open, onClose, onCreated, initialData, typeId }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
      });
    } else {
      reset({ name: "" }); // for create mode
    }
  }, [initialData, reset]);

  const onSubmit = async (data: CategoryForm) => {
    const isEdit = Boolean(initialData?.id);
    const url = isEdit
      ? `/api/category/${initialData!.id}`
      : `/api/category`;

    const method = isEdit ? "PUT" : "POST";
    console.log("typeId", typeId);
    const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fortestapikey123",
        },
        body: JSON.stringify({ ...data, typeId }),
      });

    if (res.ok) {
      reset();
      onClose();
      onCreated();
      toast.success(isEdit ? "Category renamed!" : "Category created!");
    } else {
      const err = await res.json();
      toast.error(err.message ?? "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Rename Category" : "Add Category"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="space-y-4">
          <TextField
            label="Name"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initialData ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCategoryModal;
