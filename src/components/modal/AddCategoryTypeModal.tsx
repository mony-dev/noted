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
  categoryTypeSchema,
  CategoryTypeForm,
} from "@/features/categoryType/categoryType.schema";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  initialData?: {
    id: string;
    name: string;
    emoji: string;
  };
};

const AddCategoryTypeModal = ({ open, onClose, onCreated, initialData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CategoryTypeForm>({
    resolver: zodResolver(categoryTypeSchema),
    defaultValues: {
      name: "",
      emoji: "",
    },
  });

  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        emoji: initialData.emoji,
      });
    } else {
      reset({ name: "", emoji: "" }); // for create mode
    }
  }, [initialData, reset]);

  const onSubmit = async (data: CategoryTypeForm) => {
    const isEdit = Boolean(initialData?.id);
    const url = isEdit
      ? `/api/category-type/${initialData!.id}`
      : `/api/category-type`;

    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer fortestapikey123",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      reset();
      onClose();
      onCreated();
      toast.success(isEdit ? "Group renamed!" : "Group created!");
    } else {
      const err = await res.json();
      toast.error(err.message ?? "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Rename Group" : "Add Group"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="space-y-4">
          <TextField
            label="Name"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <Controller
            control={control}
            name="emoji"
            render={({ field }) => (
              <div>
                <div className="flex items-center gap-2">
                  <TextField
                    label="Emoji"
                    fullWidth
                    value={field.value || ""}
                    onChange={field.onChange}
                    error={!!errors.emoji}
                    helperText={errors.emoji?.message}
                  />
                  <IconButton onClick={() => setShowPicker((prev) => !prev)}>
                    <InsertEmoticonIcon />
                  </IconButton>
                </div>
                {showPicker && (
                  <div className="mt-2 border rounded shadow">
                    <EmojiPicker
                      onEmojiClick={(emojiData) => {
                        field.onChange(emojiData.emoji);
                        setShowPicker(false);
                      }}
                      height={350}
                    />
                  </div>
                )}
              </div>
            )}
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

export default AddCategoryTypeModal;
